'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalysisResult } from '@/lib/ai/analysis-service';
import NailAnalyzer from '@/components/ai/nail-analyzer';
import {
    Check, ChevronRight, ShoppingBag, Loader2, Sparkles,
    ArrowRight, ArrowLeft, Settings, CheckCircle2, Camera, AlertCircle,
    Clock, Package, MessageCircle
} from 'lucide-react';
import { addItem } from '@/lib/shopify/actions';
import { SizingUploader } from '../sizing/sizing-uploader';
import type { Product } from '@/types/shopify';

interface CustomKitWizardProps {
    product: Product;
}

// Wizard state machine
type WizardStep = 'analyze' | 'customize' | 'review';

const STEPS = [
    { id: 'analyze' as const, label: 'Diseño & Análisis', icon: Sparkles },
    { id: 'customize' as const, label: 'Personalización', icon: Settings },
    { id: 'review' as const, label: 'Confirmar', icon: Check }
];

const SHAPES = [
    {
        id: 'almond',
        label: 'Almendrada',
        path: 'M12 2C12 2 5 12 5 22C5 27.5228 9.47715 32 15 32C20.5228 32 25 27.5228 25 22C25 12 18 2 18 2L12 2Z',
        description: 'Elegante y alargada'
    },
    {
        id: 'coffin',
        label: 'Coffin',
        path: 'M8 2L5 32H25L22 2H8Z',
        description: 'Moderna y audaz'
    },
    {
        id: 'stiletto',
        label: 'Stiletto',
        path: 'M15 32C15 32 5 20 5 10C5 4 8 2 15 2C22 2 25 4 25 10C25 20 15 32 15 32Z',
        description: 'Dramática y puntiaguda'
    }
] as const;

const SIZES = [
    { id: 'S', label: 'S', description: 'Corto (Natural)', recommended: false },
    { id: 'M', label: 'M', description: 'Medio (Estándar)', recommended: true },
    { id: 'L', label: 'L', description: 'Largo (Glam)', recommended: false }
] as const;

// Storage key for localStorage persistence
const STORAGE_KEY = 'custom-kit-wizard-state';

interface WizardStorageState {
    step: WizardStep;
    selectedShape: string;
    selectedSize: string;
    sendPhotosLater: boolean;
    analysis: AnalysisResult | null;
    uploadedDesign: string | null;
}

export function CustomKitWizard({ product }: CustomKitWizardProps) {
    // Initialize state from localStorage if available
    const getInitialState = <T,>(key: keyof WizardStorageState, defaultValue: T): T => {
        if (typeof window === 'undefined') return defaultValue;
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as WizardStorageState;
                return (parsed[key] as T) ?? defaultValue;
            }
        } catch {
            // Ignore parse errors
        }
        return defaultValue;
    };

    // Core state with localStorage initialization
    const [step, setStep] = useState<WizardStep>(() => getInitialState('step', 'analyze'));
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(() => getInitialState('analysis', null));
    const [uploadedDesign, setUploadedDesign] = useState<string | null>(() => getInitialState('uploadedDesign', null));

    // Configuration state with localStorage initialization
    const [selectedShape, setSelectedShape] = useState<string>(() => getInitialState('selectedShape', ''));
    const [selectedSize, setSelectedSize] = useState<string>(() => getInitialState('selectedSize', ''));

    // Measurements state
    const [handPhotos, setHandPhotos] = useState<string[]>([]);
    const [sendPhotosLater, setSendPhotosLater] = useState(() => getInitialState('sendPhotosLater', false));

    // UI state
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Ref for auto-scrolling
    const wizardRef = useRef<HTMLDivElement>(null);
    // Track the previous step to detect real changes (not initial render)
    const previousStepRef = useRef<WizardStep | null>(null);
    // Track if component has hydrated (mounted on client)
    const isHydrated = useRef(false);

    // Auto-scroll to top of wizard on step change (only after real user interaction)
    useEffect(() => {
        // Skip during hydration / first render
        if (!isHydrated.current) {
            isHydrated.current = true;
            previousStepRef.current = step;
            return;
        }

        // Only scroll if step actually changed from a previous value
        if (previousStepRef.current !== null && previousStepRef.current !== step) {
            if (wizardRef.current) {
                const y = wizardRef.current.getBoundingClientRect().top + window.scrollY - 120;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }

        previousStepRef.current = step;
    }, [step]);

    // Persist state to localStorage
    useEffect(() => {
        const stateToSave: WizardStorageState = {
            step,
            selectedShape,
            selectedSize,
            sendPhotosLater,
            analysis,
            uploadedDesign,
        };
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
        } catch {
            // Ignore storage errors (quota exceeded, etc.)
        }
    }, [step, selectedShape, selectedSize, sendPhotosLater, analysis, uploadedDesign]);

    // Clear storage on successful cart addition
    const clearWizardStorage = () => {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch {
            // Ignore
        }
    };

    // Computed values using useMemo for performance
    const currentStepIndex = useMemo(() =>
        STEPS.findIndex(s => s.id === step),
        [step]
    );

    const canProceedToReview = useMemo(() =>
        Boolean(selectedShape && selectedSize && (sendPhotosLater || handPhotos.length >= 4)),
        [selectedShape, selectedSize, sendPhotosLater, handPhotos.length]
    );

    const canAddToCart = useMemo(() =>
        Boolean(analysis?.variantId && selectedShape && selectedSize),
        [analysis?.variantId, selectedShape, selectedSize]
    );

    // Handlers with guard clauses
    const handleAnalysisComplete = (result: AnalysisResult, imageUrl: string) => {
        if (!result || !imageUrl) {
            setError('Error al procesar el análisis');
            return;
        }

        setAnalysis(result);
        setUploadedDesign(imageUrl);
        setError(null);

        // Auto-advance with visual feedback
        setTimeout(() => setStep('customize'), 600);
    };

    const handleAddToCart = async () => {
        // Guard clauses for validation
        if (!analysis?.variantId) {
            setError('Falta información del análisis');
            return;
        }

        if (!selectedShape || !selectedSize) {
            setError('Por favor completa tu configuración');
            return;
        }

        if (!sendPhotosLater && handPhotos.length < 4) {
            setError('Por favor sube las 4 fotos de medidas');
            return;
        }

        setIsAddingToCart(true);
        setError(null);

        try {
            const attributes: Record<string, string> = {
                'Design Reference': uploadedDesign || '',
                'AI Analysis Category': analysis.tier,
                'AI Reasoning': analysis.reason,
                'Nail Shape': selectedShape,
                'Size': selectedSize,
            };

            if (sendPhotosLater) {
                attributes['Estado Medidas'] = 'Pendiente por WhatsApp';
            } else {
                attributes['Estado Medidas'] = 'Adjuntas en Pedido';
                handPhotos.forEach((url, index) => {
                    attributes[`Foto Mano ${index + 1}`] = url;
                });
            }

            const result = await addItem(analysis.variantId, attributes);

            if (result?.message === 'Success') {
                // Clear wizard storage on success
                clearWizardStorage();

                // Dispatch success event (shows notification toast)
                const event = new CustomEvent('cart-updated', {
                    detail: {
                        title: '¡Diseño Reservado!',
                        message: 'Tu kit personalizado ha sido agregado al carrito.',
                        type: 'success'
                    }
                });
                window.dispatchEvent(event);

                // Reset wizard to initial state instead of redirecting
                setStep('analyze');
                setAnalysis(null);
                setUploadedDesign(null);
                setSelectedShape('');
                setSelectedSize('');
                setHandPhotos([]);
                setSendPhotosLater(false);
            } else {
                throw new Error('Error al agregar al carrito');
            }
        } catch (err) {
            console.error('Cart error:', err);
            setError('No se pudo agregar al carrito. Inténtalo de nuevo.');
        } finally {
            setIsAddingToCart(false);
        }
    };

    const handleGoBack = () => {
        setError(null);
        switch (step) {
            case 'customize':
                setStep('analyze');
                break;
            case 'review':
                setStep('customize');
                break;
        }
    };

    // Sub-components for better organization
    const ProgressStepper = () => (
        <div className="mb-8">
            <div className="flex items-center justify-between relative">
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-100 -z-10" />
                <motion.div
                    className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] -z-10"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(currentStepIndex / (STEPS.length - 1)) * 100}%` }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                />
                {STEPS.map((s, index) => {
                    const isActive = index === currentStepIndex;
                    const isCompleted = index < currentStepIndex;
                    const Icon = s.icon;

                    return (
                        <div key={s.id} className="flex flex-col items-center relative z-10 w-24">
                            <motion.div
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isCompleted
                                    ? 'bg-gradient-to-br from-[#D4847C] to-[#E8A0B0] text-white shadow-md'
                                    : isActive
                                        ? 'bg-white border-2 border-[#D4847C] text-[#D4847C] shadow-md'
                                        : 'bg-gray-100 text-gray-400'
                                    }`}
                                initial={false}
                                animate={{
                                    scale: isActive ? 1 : 1,
                                }}
                                whileHover={isActive ? { scale: 1.05 } : {}}
                            >
                                {isCompleted ? <Check className="w-5 h-5" strokeWidth={2.5} /> : <Icon className="w-4 h-4" />}
                            </motion.div>
                            <span className={`text-xs mt-2 font-medium transition-colors text-center ${isActive ? 'text-[#D4847C]' : isCompleted ? 'text-gray-600' : 'text-gray-400'
                                }`}>
                                {s.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    const BackButton = () => step !== 'analyze' && (
        <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium mb-6 group"
        >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Volver
        </button>
    );

    const ErrorAlert = () => error && (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm"
        >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
        </motion.div>
    );

    return (
        <div ref={wizardRef} className="bg-white rounded-3xl border border-pink-100 shadow-xl overflow-hidden min-h-[600px] flex flex-col">
            <div className="p-4 md:p-6 flex-1">
                <ProgressStepper />
                <AnimatePresence>
                    <ErrorAlert />
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    {/* STEP 1: ANALYZE */}
                    {step === 'analyze' && (
                        <motion.div
                            key="analyze"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >

                            <NailAnalyzer
                                mode="wizard"
                                onAnalysisComplete={handleAnalysisComplete}
                            />
                        </motion.div>
                    )}

                    {/* STEP 2: CUSTOMIZE */}
                    {step === 'customize' && analysis && (
                        <motion.div
                            key="customize"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <BackButton />

                            {/* ✨ Premium Quote Card - Luxury Design */}
                            <motion.div
                                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="relative overflow-hidden"
                            >
                                {/* Card with white background */}
                                <div className="relative bg-gradient-to-b from-[#FDE8EE] to-white p-6 rounded-3xl border border-[#F5B5C8]/20 shadow-lg shadow-pink-100/20">

                                    {/* Content wrapper */}
                                    <div className="relative z-10">
                                        {/* Header with IA badge */}
                                        <div className="flex items-center justify-between mb-4">
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="flex items-center gap-2"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] animate-pulse" />
                                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#6B6B6B] font-medium">
                                                    Cotización Inteligente
                                                </span>
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.3, type: "spring" }}
                                                className="flex items-center gap-1.5 bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] text-white px-3 py-1 rounded-full shadow-lg shadow-pink-200/50"
                                            >
                                                <Sparkles className="w-3 h-3" />
                                                <span className="text-[10px] font-bold tracking-wide">Powered by IA</span>
                                            </motion.div>
                                        </div>

                                        {/* Main content - Image + Price */}
                                        <div className="flex gap-5 items-center">
                                            {/* Design preview with glow effect */}
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.15 }}
                                                className="relative group"
                                            >
                                                {/* Glow effect */}
                                                <div className="absolute -inset-1 bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] rounded-2xl opacity-30 blur-md group-hover:opacity-50 transition-opacity" />

                                                <div className="relative w-24 h-24 rounded-2xl overflow-hidden ring-2 ring-white shadow-lg">
                                                    <img
                                                        src={uploadedDesign || ''}
                                                        alt="Tu diseño"
                                                        className="w-full h-full object-cover"
                                                    />
                                                    {/* Overlay with tier */}
                                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-2">
                                                        <span className="text-[9px] font-bold text-white uppercase tracking-wider drop-shadow-lg">
                                                            {analysis.tier}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Price section - Hero style */}
                                            <motion.div
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.25 }}
                                                className="flex-1"
                                            >
                                                <p className="text-xs text-[#6B6B6B] mb-1">Tu precio personalizado</p>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-base text-[#D4847C] font-semibold">S/</span>
                                                    <span
                                                        className="text-5xl font-bold text-[#D4847C]"
                                                        style={{ fontFamily: 'var(--font-playfair), serif' }}
                                                    >
                                                        {analysis.price}
                                                    </span>
                                                    <span className="text-xl text-[#D4847C] font-medium">.00</span>
                                                </div>
                                                {/* Small trust indicator */}
                                                <div className="flex items-center gap-1.5 mt-2">
                                                    <div className="w-4 h-4 rounded-full bg-[#FDE8EE] flex items-center justify-center">
                                                        <Check className="w-2.5 h-2.5 text-[#D4847C]" />
                                                    </div>
                                                    <span className="text-[10px] text-[#6B6B6B]">Precio calculado por IA</span>
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* AI Analysis reason - Premium quote style */}
                                        {analysis.reason && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 }}
                                                className="mt-5 pt-4 border-t border-[#F5B5C8]/30"
                                            >
                                                <div className="flex gap-3">
                                                    <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#FDE8EE] to-white flex items-center justify-center shadow-sm">
                                                        <Sparkles className="w-4 h-4 text-[#D4847C]" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-[10px] uppercase tracking-wider text-[#D4847C] font-semibold mb-1">
                                                            Análisis de complejidad
                                                        </p>
                                                        <p className="text-xs text-[#6B6B6B] leading-relaxed">
                                                            {analysis.reason}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Shape Selection */}
                            <section>
                                <div className="flex items-baseline justify-between mb-3">
                                    <h3 className="text-lg font-bold text-gray-800">
                                        1. Elige tu Forma
                                    </h3>
                                    {!selectedShape && (
                                        <span className="text-xs text-gray-400">Requerido</span>
                                    )}
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {SHAPES.map((shape) => (
                                        <motion.button
                                            key={shape.id}
                                            onClick={() => setSelectedShape(shape.label)}
                                            className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${selectedShape === shape.label
                                                ? 'border-[#D4847C] bg-pink-50 shadow-sm'
                                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                }`}
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="h-12 w-9 relative">
                                                <svg viewBox="0 0 30 34" fill="none" className="w-full h-full">
                                                    <path
                                                        d={shape.path}
                                                        fill={selectedShape === shape.label ? '#D4847C' : '#E5E7EB'}
                                                        className="transition-colors duration-200"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="text-xs font-medium text-gray-700">{shape.label}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </section>

                            {/* Size Selection */}
                            <section>
                                <div className="flex items-baseline justify-between mb-3">
                                    <h3 className="text-lg font-bold text-gray-800">
                                        2. Elige el Largo
                                    </h3>
                                    {!selectedSize && (
                                        <span className="text-xs text-gray-400">Requerido</span>
                                    )}
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {SIZES.map((size) => (
                                        <motion.button
                                            key={size.id}
                                            onClick={() => setSelectedSize(size.id)}
                                            className={`p-4 rounded-xl border-2 transition-all text-center relative ${selectedSize === size.id
                                                ? 'border-[#D4847C] bg-pink-50 shadow-sm'
                                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                }`}
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {size.recommended && (
                                                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#D4847C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                                                    Popular
                                                </span>
                                            )}
                                            <span className={`block text-2xl font-bold transition-colors ${selectedSize === size.id ? 'text-[#D4847C]' : 'text-gray-800'
                                                }`}>
                                                {size.label}
                                            </span>
                                            <span className="text-[10px] text-gray-500 block mt-1">{size.description}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </section>

                            {/* Measurements Section */}
                            <section className="pt-6 border-t border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-gray-800">
                                        3. Fotos de Medidas
                                    </h3>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={sendPhotosLater}
                                            onChange={(e) => setSendPhotosLater(e.target.checked)}
                                            className="w-4 h-4 text-[#D4847C] rounded border-gray-300 focus:ring-2 focus:ring-[#D4847C] focus:ring-offset-0 transition-all"
                                        />
                                        <span className="text-sm text-gray-600 select-none group-hover:text-gray-800 transition-colors">
                                            Enviar después
                                        </span>
                                    </label>
                                </div>

                                <AnimatePresence mode="wait">
                                    {!sendPhotosLater ? (
                                        <motion.div
                                            key="uploader"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="bg-blue-50 border border-blue-200 text-blue-700 text-xs p-3 rounded-lg mb-4 flex items-center gap-2">
                                                <Camera className="w-4 h-4 shrink-0" />
                                                <span>Sube 4 fotos: ambas manos (palma y dorso) con una moneda de referencia</span>
                                            </div>
                                            <SizingUploader
                                                onUploadComplete={(images: { hands: string[], design: string | null }) => setHandPhotos(images.hands)}
                                                className="w-full"
                                                showDesignUpload={false}
                                                initialPhotos={handPhotos}
                                            />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="later"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-sm flex items-start gap-3 overflow-hidden"
                                        >
                                            <div className="bg-white p-2 rounded-full shadow-sm">
                                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold mb-1">¡Perfecto!</p>
                                                <p className="text-xs leading-relaxed">Podrás completar tu pedido ahora y enviarnos las fotos por WhatsApp después.</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </section>

                            {/* CTA */}
                            <motion.button
                                disabled={!canProceedToReview}
                                onClick={() => setStep('review')}
                                className="w-full bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] text-white py-4 rounded-full font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
                                whileHover={canProceedToReview ? { scale: 1.01, boxShadow: '0 20px 40px rgba(212, 132, 124, 0.3)' } : {}}
                                whileTap={canProceedToReview ? { scale: 0.99 } : {}}
                            >
                                Revisar Pedido <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </motion.div>
                    )}

                    {/* STEP 3: REVIEW */}
                    {step === 'review' && analysis && (
                        <motion.div
                            key="review"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <BackButton />

                            <div className="text-center mb-4">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-800" style={{ fontFamily: 'var(--font-playfair)' }}>
                                    Resumen del Pedido
                                </h3>
                            </div>

                            {/* ✨ Premium Order Summary Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="bg-[#FFFBFC] border border-[#F5B5C8]/20 rounded-3xl shadow-lg shadow-pink-100/20 p-6 space-y-5"
                            >
                                {/* Product Header with Glow Image */}
                                <div className="flex gap-5 items-start">
                                    {/* Design preview with glow */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className="relative group shrink-0"
                                    >
                                        <div className="absolute -inset-1 bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] rounded-2xl opacity-30 blur-md" />
                                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden ring-2 ring-white shadow-lg">
                                            <img src={uploadedDesign || ''} className="w-full h-full object-cover" alt="Tu diseño" />
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                                                <span className="text-[9px] font-bold text-white uppercase tracking-wider">{analysis.tier}</span>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Product Info */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="flex-1 min-w-0"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h4 className="font-bold text-gray-800 text-lg mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                                                    Kit Personalizado
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="inline-flex items-center gap-1 bg-white border border-[#F5B5C8]/30 text-[#6B6B6B] px-2.5 py-1 rounded-full text-xs font-medium shadow-sm">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4847C]" />
                                                        {selectedShape}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1 bg-white border border-[#F5B5C8]/30 text-[#6B6B6B] px-2.5 py-1 rounded-full text-xs font-medium shadow-sm">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8A0B0]" />
                                                        Largo {selectedSize}
                                                    </span>
                                                </div>
                                            </div>
                                            {/* Hero Price */}
                                            <div className="text-right">
                                                <p className="text-xs text-[#6B6B6B] mb-0.5">Total</p>
                                                <p className="text-3xl font-bold text-[#D4847C]" style={{ fontFamily: 'var(--font-playfair)' }}>
                                                    S/{analysis.price}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-gradient-to-r from-transparent via-[#F5B5C8]/40 to-transparent" />

                                {/* Measurement Status - Premium Style */}
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className={`rounded-2xl border ${sendPhotosLater
                                        ? 'bg-[#FFF8F0] border-[#F5B5C8]/30 p-4'
                                        : 'bg-white border-[#F5B5C8]/20 p-3.5 flex items-center gap-3'
                                        }`}
                                >
                                    {sendPhotosLater ? (
                                        <div className="w-full space-y-3">
                                            <div className="flex items-center gap-2 text-orange-800/90">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E8A0B0] to-[#D4847C] flex items-center justify-center shadow-sm">
                                                    <Camera className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="font-semibold text-sm">Medidas pendientes</span>
                                            </div>

                                            <div className="bg-white/80 rounded-xl p-3 text-xs text-gray-600 space-y-2 border border-orange-100 shadow-sm">
                                                <p className="font-medium text-[#D4847C] flex items-center gap-1.5">
                                                    <AlertCircle className="w-3.5 h-3.5" />
                                                    Instrucciones post-compra:
                                                </p>
                                                <ul className="list-disc pl-4 space-y-1.5 leading-relaxed marker:text-[#D4847C]">
                                                    <li>Finaliza tu compra.</li>
                                                    <li>Busca el número que empieza con <strong>#</strong> en tu confirmación (ej: #1024).</li>
                                                    <li>Envíanos ese número junto con las fotos de tus medidas.</li>
                                                </ul>
                                                <div className="pt-2">
                                                    <a
                                                        href="https://wa.me/51950009664?text=Hola%20Ara%2C%20quisiera%20enviar%20mis%20medidas%20para%20mi%20pedido.%20Mi%20n%C3%BAmero%20de%20pedido%20es%3A%20"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-center gap-2 text-white font-bold bg-[#25D366] px-4 py-2.5 rounded-xl hover:bg-[#20bd5a] transition-colors w-full shadow-sm hover:shadow-md"
                                                    >
                                                        <MessageCircle className="w-4 h-4" />
                                                        Contactar por WhatsApp
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4847C] to-[#E8A0B0] flex items-center justify-center shadow-sm shrink-0">
                                                <CheckCircle2 className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-800">
                                                    {handPhotos.length} fotos adjuntadas
                                                </p>
                                                <p className="text-[11px] text-[#6B6B6B]">
                                                    Listas para fabricación
                                                </p>
                                            </div>
                                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                                <Check className="w-3 h-3 text-green-600" />
                                            </div>
                                        </>
                                    )}
                                </motion.div>

                                {/* Order Details Grid */}
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="grid grid-cols-2 gap-3"
                                >
                                    <div className="bg-white border border-[#F5B5C8]/20 rounded-xl p-3.5 shadow-sm">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <div className="w-6 h-6 rounded-full bg-[#FDE8EE] flex items-center justify-center">
                                                <Clock className="w-3 h-3 text-[#D4847C]" />
                                            </div>
                                            <span className="text-[10px] uppercase tracking-wider text-[#6B6B6B] font-medium">Entrega</span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-800">3-5 días</p>
                                    </div>
                                    <div className="bg-white border border-[#F5B5C8]/20 rounded-xl p-3.5 shadow-sm">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <div className="w-6 h-6 rounded-full bg-[#FDE8EE] flex items-center justify-center">
                                                <Package className="w-3 h-3 text-[#D4847C]" />
                                            </div>
                                            <span className="text-[10px] uppercase tracking-wider text-[#6B6B6B] font-medium">Incluye</span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-800">Kit completo</p>
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* Final CTA */}
                            <motion.button
                                onClick={handleAddToCart}
                                disabled={isAddingToCart || !canAddToCart}
                                className="w-full bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] text-white py-4 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={!isAddingToCart && canAddToCart ? { scale: 1.01, y: -1 } : {}}
                                whileTap={!isAddingToCart && canAddToCart ? { scale: 0.99 } : {}}
                            >
                                {isAddingToCart ? (
                                    <><Loader2 className="animate-spin w-5 h-5" /> Procesando...</>
                                ) : (
                                    <><ShoppingBag className="w-5 h-5" /> Agregar al Carrito</>
                                )}
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
