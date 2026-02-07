'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalysisResult } from '@/lib/ai/analysis-service';
import NailAnalyzer from '@/components/ai/nail-analyzer';
import {
    Check, ChevronRight, ShoppingBag, Loader2, Sparkles,
    ArrowRight, ArrowLeft, Settings, CheckCircle2, Camera, AlertCircle
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

    // Auto-scroll to top of wizard on step change
    useEffect(() => {
        if (wizardRef.current) {
            const y = wizardRef.current.getBoundingClientRect().top + window.scrollY - 120; // 120px offset for header
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
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

                            {/* Analysis Summary Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gradient-to-r from-[#FDE8EE] to-white p-4 rounded-xl flex items-center justify-between border border-pink-200 shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-14 h-14 rounded-lg overflow-hidden border-2 border-white shadow-md">
                                        <img src={uploadedDesign || ''} alt="Diseño" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#D4847C] font-bold uppercase tracking-wider">{analysis.tier}</p>
                                        <p className="text-xl font-bold text-gray-800">S/ {analysis.price}.00</p>
                                    </div>
                                </div>
                                <div className="text-right hidden sm:block">
                                    <span className="text-xs text-gray-400 block">Cotización</span>
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

                            {/* Order Summary Card */}
                            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-4">
                                {/* Design Header */}
                                <div className="flex gap-4 pb-4 border-b border-gray-100">
                                    <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-100 shadow-sm flex-shrink-0">
                                        <img src={uploadedDesign || ''} className="w-full h-full object-cover" alt="Diseño personalizado" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-gray-800 text-lg mb-1">Kit Personalizado</h4>
                                        <p className="text-[#D4847C] font-semibold text-sm mb-2">{analysis.tier}</p>
                                        <div className="text-sm text-gray-500 space-y-1">
                                            <p>Forma: <span className="text-gray-800 font-medium">{selectedShape}</span></p>
                                            <p>Largo: <span className="text-gray-800 font-medium">{selectedSize}</span></p>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <span className="block text-2xl font-bold text-[#D4847C]">S/ {analysis.price}</span>
                                        <span className="text-xs text-gray-400">Soles</span>
                                    </div>
                                </div>

                                {/* Measurement Status */}
                                <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${sendPhotosLater
                                    ? 'bg-orange-50 border border-orange-200 text-orange-700'
                                    : 'bg-green-50 border border-green-200 text-green-700'
                                    }`}>
                                    {sendPhotosLater ? (
                                        <>
                                            <Camera className="w-4 h-4 flex-shrink-0" />
                                            <span className="text-xs">Medidas pendientes (enviar por WhatsApp)</span>
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                                            <span className="text-xs">{handPhotos.length} fotos de medidas adjuntas</span>
                                        </>
                                    )}
                                </div>

                                {/* Order Info */}
                                <div className="pt-4 border-t border-gray-100 text-sm text-gray-500 space-y-2">
                                    <div className="flex justify-between">
                                        <span>Tiempo estimado:</span>
                                        <span className="font-medium text-gray-800">3-5 días hábiles</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Incluye:</span>
                                        <span className="font-medium text-gray-800">Kit completo + pegamento</span>
                                    </div>
                                </div>
                            </div>

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
