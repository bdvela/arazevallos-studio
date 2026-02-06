'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalysisResult } from '@/lib/ai/analysis-service';
import NailAnalyzer from '@/components/ai/nail-analyzer';
import {
    Check, ChevronRight, ShoppingBag, Loader2, Sparkles, Ruler,
    ArrowRight, RefreshCcw, ArrowLeft, Tag, Settings, CheckCircle2,
    Star, Shield, Clock
} from 'lucide-react';
import { addItem } from '@/lib/shopify/actions';
import { useRouter } from 'next/navigation';
import { SizingUploader } from '@/components/sizing/sizing-uploader';

interface CustomKitWizardProps {
    product: any;
}

type WizardStep = 'intro' | 'analyze' | 'quote' | 'configuration' | 'measurements' | 'review';

// Step configuration for progress bar
const STEPS = [
    { id: 'analyze', label: 'Diseño', icon: Sparkles },
    { id: 'quote', label: 'Cotización', icon: Tag },
    { id: 'configuration', label: 'Personaliza', icon: Settings },
    { id: 'measurements', label: 'Medidas', icon: Ruler },
    { id: 'review', label: 'Confirmar', icon: Check }
];

export function CustomKitWizard({ product }: CustomKitWizardProps) {
    const [step, setStep] = useState<WizardStep>('intro');
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [uploadedDesign, setUploadedDesign] = useState<string | null>(null);

    // Configuration State
    const [selectedShape, setSelectedShape] = useState<string>('');
    const [selectedSize, setSelectedSize] = useState<string>('');

    // Measurements State
    const [handPhotos, setHandPhotos] = useState<string[]>([]);

    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const router = useRouter();

    const shapes = [
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
    ];

    const sizes = [
        { id: 'S', label: 'S', description: 'Largo Corto (Natural)' },
        { id: 'M', label: 'M', description: 'Largo Medio (Estándar)', recommended: true },
        { id: 'L', label: 'L', description: 'Largo Extendido (Glam)' }
    ];

    // Get current step index for progress bar
    const getCurrentStepIndex = () => {
        const stepIds = STEPS.map(s => s.id);
        return stepIds.indexOf(step);
    };

    const handleAnalysisComplete = (result: AnalysisResult, imageUrl: string) => {
        setAnalysis(result);
        setUploadedDesign(imageUrl);
        setStep('quote');
    };

    const handleAddToCart = async () => {
        if (!analysis?.variantId) return;

        setIsAddingToCart(true);
        try {
            const attributes: Record<string, string> = {
                'Design Reference': uploadedDesign || '',
                'AI Analysis Category': analysis.tier,
                'AI Reasoning': analysis.reason,
                'Nail Shape': selectedShape,
                'Size': selectedSize,
            };

            handPhotos.forEach((url, index) => {
                attributes[`Foto Mano ${index + 1}`] = url;
            });

            const result = await addItem(analysis.variantId, attributes);

            if (result?.message === 'Success') {
                const event = new CustomEvent('cart-updated', {
                    detail: {
                        title: '¡Diseño Reservado!',
                        message: 'Tu kit personalizado ha sido agregado al carrito.',
                        type: 'success'
                    }
                });
                window.dispatchEvent(event);
                router.push('/cart');
            }
        } catch (error) {
            console.error(error);
            alert('Error al agregar al carrito.');
        } finally {
            setIsAddingToCart(false);
        }
    };

    // Progress Stepper Component
    const ProgressStepper = () => {
        const currentIndex = getCurrentStepIndex();
        if (step === 'intro') return null;

        return (
            <div className="mb-8">
                <div className="flex items-center justify-between relative">
                    {/* Progress Line */}
                    <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-100 -z-10" />
                    <motion.div
                        className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] -z-10"
                        initial={{ width: '0%' }}
                        animate={{ width: `${(currentIndex / (STEPS.length - 1)) * 100}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    />

                    {STEPS.map((s, index) => {
                        const isActive = index === currentIndex;
                        const isCompleted = index < currentIndex;
                        const Icon = s.icon;

                        return (
                            <div key={s.id} className="flex flex-col items-center relative z-10">
                                <motion.div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isCompleted
                                        ? 'bg-gradient-to-br from-[#D4847C] to-[#E8A0B0] text-white shadow-lg shadow-[#D4847C]/30'
                                        : isActive
                                            ? 'bg-white border-2 border-[#D4847C] text-[#D4847C] shadow-lg'
                                            : 'bg-gray-100 text-gray-400'
                                        }`}
                                    whileHover={isActive ? { scale: 1.1 } : {}}
                                >
                                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                                </motion.div>
                                <span className={`text-xs mt-2 font-medium transition-colors hidden md:block ${isActive ? 'text-[#D4847C]' : isCompleted ? 'text-gray-600' : 'text-gray-400'
                                    }`}>
                                    {s.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    // Back Button Component
    const BackButton = ({ onClick }: { onClick: () => void }) => (
        <button
            onClick={onClick}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium mb-6"
        >
            <ArrowLeft className="w-4 h-4" />
            Volver
        </button>
    );

    return (
        <div className="bg-white rounded-3xl border border-pink-100 shadow-xl overflow-hidden min-h-[500px] md:min-h-[600px] flex flex-col">
            <div className="p-4 md:p-6 flex-1">
                {/* Progress Stepper */}
                <ProgressStepper />

                <AnimatePresence mode="wait">
                    {/* INTRO STEP */}
                    {step === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
                        >
                            <motion.div
                                className="w-24 h-24 bg-gradient-to-br from-[#FDE8EE] to-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-pink-100"
                                animate={{
                                    boxShadow: ['0 10px 40px rgba(212, 132, 124, 0.2)', '0 10px 60px rgba(212, 132, 124, 0.4)', '0 10px 40px rgba(212, 132, 124, 0.2)']
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Sparkles className="w-12 h-12 text-[#D4847C]" />
                            </motion.div>
                            <h2 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'var(--font-playfair)' }}>
                                Diseña tus Uñas Soñadas
                            </h2>
                            <p className="text-gray-500 max-w-md leading-relaxed">
                                Nuestra IA analizará tu diseño, elegirás tu forma y talla preferidas, y recibirás un kit personalizado perfecto para ti.
                            </p>

                            {/* Benefits mini */}
                            <div className="flex gap-6 text-xs text-gray-400 pt-4">
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 3-5 días</span>
                                <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Garantía</span>
                                <span className="flex items-center gap-1"><Star className="w-3 h-3" /> Hecho a mano</span>
                            </div>

                            <motion.button
                                onClick={() => setStep('analyze')}
                                className="w-full sm:w-auto bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-[#D4847C]/30 hover:shadow-2xl hover:shadow-[#D4847C]/40 transition-all flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Comenzar <ChevronRight className="w-5 h-5" />
                            </motion.button>
                        </motion.div>
                    )}

                    {/* ANALYZE STEP */}
                    {step === 'analyze' && (
                        <motion.div
                            key="analyze"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <BackButton onClick={() => setStep('intro')} />
                            <NailAnalyzer
                                mode="wizard"
                                onAnalysisComplete={handleAnalysisComplete}
                            />
                        </motion.div>
                    )}

                    {/* QUOTE STEP */}
                    {step === 'quote' && analysis && (
                        <motion.div
                            key="quote"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <BackButton onClick={() => setStep('analyze')} />

                            <div className="text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', delay: 0.2 }}
                                    className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4"
                                >
                                    <CheckCircle2 className="w-4 h-4" />
                                    Análisis completado
                                </motion.div>
                                <h3 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'var(--font-playfair)' }}>
                                    Tu Cotización Personalizada
                                </h3>
                            </div>

                            <motion.div
                                className="bg-gradient-to-br from-[#FDE8EE]/50 to-white border border-[#F5B5C8]/50 rounded-2xl p-6 relative overflow-hidden"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {/* Tier Badge */}
                                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" />
                                    {analysis.tier}
                                </div>

                                <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
                                    {uploadedDesign && (
                                        <motion.div
                                            className="w-36 h-36 shrink-0 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-gray-100"
                                            whileHover={{ scale: 1.05, rotate: 2 }}
                                        >
                                            <img src={uploadedDesign} alt="Tu diseño" className="w-full h-full object-cover" />
                                        </motion.div>
                                    )}

                                    <div className="flex-1 text-center md:text-left">
                                        <motion.span
                                            className="block text-5xl font-bold text-[#D4847C] mb-2"
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.5, type: 'spring' }}
                                        >
                                            S/ {analysis.price}.00
                                        </motion.span>
                                        <span className="text-sm text-gray-400 uppercase tracking-widest">Precio Final</span>
                                    </div>
                                </div>

                                <div className="bg-white/80 rounded-xl p-4 text-sm text-gray-600 leading-relaxed border border-[#F5B5C8]/30">
                                    <p className="flex gap-3">
                                        <Sparkles className="w-5 h-5 text-[#D4847C] shrink-0 mt-0.5" />
                                        <span>{analysis.reason}</span>
                                    </p>
                                </div>

                                {/* What's included */}
                                <div className="mt-4 pt-4 border-t border-[#F5B5C8]/30 grid grid-cols-3 gap-2 text-xs text-gray-500">
                                    <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> Kit completo</span>
                                    <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> Pegamento</span>
                                    <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> Envío gratis</span>
                                </div>
                            </motion.div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                <button
                                    onClick={() => setStep('analyze')}
                                    className="px-6 py-3 rounded-xl border border-gray-200 text-gray-500 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                >
                                    <RefreshCcw className="w-4 h-4" /> Otro diseño
                                </button>
                                <motion.button
                                    onClick={() => setStep('configuration')}
                                    className="flex-1 bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#D4847C]/20 hover:shadow-xl transition-all"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Me encanta <ArrowRight className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* CONFIGURATION STEP */}
                    {step === 'configuration' && (
                        <motion.div
                            key="configuration"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <BackButton onClick={() => setStep('quote')} />

                            {/* Shape Selection */}
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800">Elige tu Forma</h3>
                                <p className="text-sm text-gray-500 mb-4">Selecciona el estilo que más te guste</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {shapes.map((s) => (
                                        <motion.button
                                            key={s.id}
                                            onClick={() => setSelectedShape(s.label)}
                                            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 relative overflow-hidden ${selectedShape === s.label
                                                ? 'border-[#D4847C] bg-gradient-to-br from-[#FDE8EE] to-white shadow-lg'
                                                : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                                                }`}
                                            whileHover={{ y: -3 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {selectedShape === s.label && (
                                                <motion.div
                                                    className="absolute top-2 right-2 bg-[#D4847C] text-white p-1 rounded-full"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                >
                                                    <Check className="w-3 h-3" />
                                                </motion.div>
                                            )}
                                            <div className="h-14 w-10 relative">
                                                <svg viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                                    <path
                                                        d={s.path}
                                                        fill={selectedShape === s.label ? '#D4847C' : '#E5E7EB'}
                                                        stroke={selectedShape === s.label ? '#D4847C' : '#D1D5DB'}
                                                        strokeWidth="1.5"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="text-center">
                                                <span className="font-semibold text-sm text-gray-800 block">{s.label}</span>
                                                <span className="text-xs text-gray-400">{s.description}</span>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800">Elige tu Talla</h3>
                                <p className="text-sm text-gray-500 mb-4">Basado en el tamaño de tus manos</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {sizes.map((s) => (
                                        <motion.button
                                            key={s.id}
                                            onClick={() => setSelectedSize(s.id)}
                                            className={`py-4 px-3 rounded-2xl border-2 transition-all relative ${selectedSize === s.id
                                                ? 'border-[#D4847C] bg-gradient-to-br from-[#FDE8EE] to-white shadow-lg'
                                                : 'border-gray-100 hover:border-gray-200'
                                                }`}
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {s.recommended && (
                                                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#D4847C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                    Popular
                                                </span>
                                            )}
                                            {selectedShape === s.id && (
                                                <motion.div
                                                    className="absolute top-2 right-2 bg-[#D4847C] text-white p-1 rounded-full"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                >
                                                    <Check className="w-3 h-3" />
                                                </motion.div>
                                            )}
                                            <span className={`block text-2xl font-bold mb-1 ${selectedSize === s.id ? 'text-[#D4847C]' : 'text-gray-800'}`}>
                                                {s.label}
                                            </span>
                                            <span className="text-xs text-gray-400">{s.description}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <motion.button
                                    disabled={!selectedShape || !selectedSize}
                                    onClick={() => setStep('measurements')}
                                    className="w-full sm:w-auto bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] text-white px-8 py-3 rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#D4847C]/20 flex items-center justify-center gap-2"
                                    whileHover={selectedShape && selectedSize ? { scale: 1.02 } : {}}
                                    whileTap={selectedShape && selectedSize ? { scale: 0.98 } : {}}
                                >
                                    Siguiente <ArrowRight className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* MEASUREMENTS STEP */}
                    {step === 'measurements' && (
                        <motion.div
                            key="measurements"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <BackButton onClick={() => setStep('configuration')} />

                            <h3 className="text-xl font-bold mb-2 text-gray-800">Fotos de tus Manos</h3>
                            <p className="text-sm text-gray-500 mb-6">
                                Necesitamos 4 fotos para crear uñas con el ajuste perfecto
                            </p>

                            {/* Video Tutorial Placeholder */}
                            <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mb-6 flex items-center justify-center border-2 border-dashed border-gray-200 relative overflow-hidden">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                                        <Ruler className="w-8 h-8 text-[#D4847C]" />
                                    </div>
                                    <p className="text-gray-500 font-medium">Video Tutorial</p>
                                    <p className="text-xs text-gray-400">Próximamente</p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-[#FDE8EE] to-[#E8F4F8] rounded-xl p-4 text-center mb-6">
                                <p className="text-sm text-[#3D3D3D] font-medium mb-1">
                                    📸 Sube las 4 fotos requeridas
                                </p>
                                <p className="text-xs text-[#6B6B6B]">
                                    Mano Izquierda y Derecha (dorso y palma) con una moneda de referencia
                                </p>
                            </div>

                            <div className="min-h-[200px]">
                                <SizingUploader
                                    onUploadComplete={(images) => setHandPhotos(images.hands)}
                                    className="w-full"
                                    showDesignUpload={false}
                                    initialPhotos={handPhotos}
                                />
                            </div>

                            <div className="flex justify-between items-center pt-8">
                                <button
                                    onClick={() => setStep('configuration')}
                                    className="text-gray-400 font-medium hover:text-gray-600 flex items-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Volver
                                </button>
                                <motion.button
                                    disabled={handPhotos.length < 4}
                                    onClick={() => setStep('review')}
                                    className="bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] text-white px-8 py-3 rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#D4847C]/20 flex items-center gap-2"
                                    whileHover={handPhotos.length >= 4 ? { scale: 1.02 } : {}}
                                >
                                    Revisar Pedido <ArrowRight className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* REVIEW STEP */}
                    {step === 'review' && analysis && (
                        <motion.div
                            key="review"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <BackButton onClick={() => setStep('measurements')} />

                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'var(--font-playfair)' }}>
                                    Revisa tu Pedido
                                </h3>
                                <p className="text-gray-500 text-sm">Confirma que todo esté correcto antes de agregar al carrito</p>
                            </div>

                            {/* Summary Card */}
                            <div className="bg-gradient-to-br from-[#FFFBFC] to-white border border-[#F5B5C8]/30 rounded-2xl p-6 space-y-4">

                                {/* Design + Price Row */}
                                <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                                    {uploadedDesign && (
                                        <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-white shadow-md">
                                            <img src={uploadedDesign} alt="Diseño" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-400 uppercase tracking-wide">Kit Personalizado</span>
                                            <button
                                                onClick={() => setStep('analyze')}
                                                className="text-xs text-[#D4847C] hover:text-[#E8A0B0] font-medium hover:underline"
                                            >
                                                Cambiar diseño
                                            </button>
                                        </div>
                                        <span className="block text-2xl font-bold text-[#D4847C]">S/ {analysis.price}.00</span>
                                    </div>
                                    <span className="bg-[#FDE8EE] text-[#D4847C] text-xs font-bold px-3 py-1 rounded-full">
                                        {analysis.tier}
                                    </span>
                                </div>

                                {/* Details Grid - With Edit Button */}
                                <div className="py-2">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs text-gray-400 uppercase tracking-wide">Personalización</span>
                                        <button
                                            onClick={() => setStep('configuration')}
                                            className="text-xs text-[#D4847C] hover:text-[#E8A0B0] font-medium hover:underline"
                                        >
                                            Editar
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <span className="text-xs text-gray-400 block">Forma</span>
                                            <span className="font-semibold text-gray-800">{selectedShape}</span>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <span className="text-xs text-gray-400 block">Talla</span>
                                            <span className="font-semibold text-gray-800">{selectedSize}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Hand Photos - With Edit Button */}
                                <div className="pt-4 border-t border-gray-100">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs text-gray-400 uppercase tracking-wide">Fotos de Medidas ({handPhotos.length}/4)</span>
                                        <button
                                            onClick={() => setStep('measurements')}
                                            className="text-xs text-[#D4847C] hover:text-[#E8A0B0] font-medium hover:underline"
                                        >
                                            Cambiar fotos
                                        </button>
                                    </div>
                                    <div className="flex gap-2">
                                        {handPhotos.slice(0, 4).map((url, i) => (
                                            <div key={i} className="w-14 h-14 rounded-lg overflow-hidden border border-gray-200">
                                                <img src={url} alt={`Mano ${i + 1}`} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Included */}
                                <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                                    <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full flex items-center gap-1">
                                        <Check className="w-3 h-3" /> Kit completo
                                    </span>
                                    <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full flex items-center gap-1">
                                        <Check className="w-3 h-3" /> Pegamento incluido
                                    </span>
                                    <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full flex items-center gap-1">
                                        <Check className="w-3 h-3" /> Envío gratis
                                    </span>
                                </div>
                            </div>

                            {/* Final CTA */}
                            <motion.button
                                onClick={handleAddToCart}
                                disabled={isAddingToCart}
                                className="w-full bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-[#D4847C]/30 disabled:opacity-70 flex items-center justify-center gap-3"
                                whileHover={!isAddingToCart ? { scale: 1.02, y: -2 } : {}}
                                whileTap={!isAddingToCart ? { scale: 0.98 } : {}}
                            >
                                {isAddingToCart ? (
                                    <><Loader2 className="animate-spin w-5 h-5" /> Procesando...</>
                                ) : (
                                    <><ShoppingBag className="w-5 h-5" /> Confirmar y Agregar al Carrito</>
                                )}
                            </motion.button>

                            <p className="text-center text-xs text-gray-400">
                                Al confirmar, aceptas nuestros términos y condiciones
                            </p>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
