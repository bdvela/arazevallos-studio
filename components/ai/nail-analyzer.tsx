'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Loader2, Sparkles, Check, AlertCircle, ShoppingBag } from 'lucide-react';
import { getDesignUploadSignature } from '@/lib/cloudinary/actions';
import { addItem } from '@/lib/shopify/actions';
import { DesignTier, AnalysisResult } from '@/lib/ai/analysis-service';

interface NailAnalyzerProps {
    mode?: 'default' | 'wizard';
    onAnalysisComplete?: (result: AnalysisResult, imageUrl: string) => void;
}

export default function NailAnalyzer({ mode = 'default', onAnalysisComplete }: NailAnalyzerProps) {
    const [image, setImage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const SIZES = ['XS', 'S', 'M', 'L'];

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            setError(null);
            setResult(null);

            // 1. Get Signature
            const { timestamp, signature, folder, cloudName, apiKey } = await getDesignUploadSignature();

            // 2. Upload to Cloudinary
            const formData = new FormData();
            formData.append('file', file);
            formData.append('api_key', apiKey!);
            formData.append('timestamp', timestamp.toString());
            formData.append('signature', signature);
            formData.append('folder', folder);

            const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: formData
            });

            if (!uploadRes.ok) throw new Error('Upload failed');
            const data = await uploadRes.json();
            const secureUrl = data.secure_url;

            setImage(secureUrl);
            setIsUploading(false);

            // 3. Auto-start Analysis
            analyzeImage(secureUrl);

        } catch (err) {
            console.error(err);
            setError('Hubo un problema subiendo tu imagen. Intenta de nuevo.');
            setIsUploading(false);
        }
    };

    const analyzeImage = async (url: string) => {
        setIsAnalyzing(true);
        try {
            const res = await fetch('/api/analyze-design', {
                method: 'POST',
                body: JSON.stringify({ imageUrl: url }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!res.ok) throw new Error('Analysis failed');
            const data: AnalysisResult = await res.json();

            if (mode === 'wizard' && onAnalysisComplete) {
                // Short delay to show the scanning animation for effect
                setTimeout(() => {
                    onAnalysisComplete(data, url);
                }, 1500);
            } else {
                setResult(data);
            }

        } catch (err) {
            console.error(err);
            setError('No pudimos analizar el diseño. Intenta con otra foto más clara.');
        } finally {
            if (mode !== 'wizard') {
                setIsAnalyzing(false);
            }
        }
    };

    const handleAddToCart = async () => {
        if (!result || !result.variantId) {
            setError('Configuración incompleta: No se encontró el ID del producto.');
            return;
        }

        if (!selectedSize) {
            setError('Por favor selecciona tu talla antes de continuar.');
            return;
        }

        setIsAddingToCart(true);
        try {
            const res = await addItem(result.variantId, {
                'Design Reference': image || '',
                'AI Analysis Category': result.tier,
                'AI Reasoning': result.reason,
                'Size': selectedSize
            });

            if (res?.message === 'Success') {
                // Could trigger a cart drawer open here if a context function was available
                window.dispatchEvent(new Event('cart-updated'));
            } else {
                throw new Error(res?.message);
            }
        } catch (err) {
            console.error(err);
            setError('Error al agregar al carrito.');
        } finally {
            setIsAddingToCart(false);
        }
    };

    const reset = () => {
        setImage(null);
        setResult(null);
        setError(null);
        setSelectedSize('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="w-full max-w-xl mx-auto p-4 sm:p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-light text-primary mb-2">Escanea tu Vibe ✨</h2>
                <p className="text-gray-500 font-light">Sube tu inspiración y nuestra IA te cotizará el diseño al instante.</p>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 min-h-[250px] sm:min-h-[300px] flex flex-col items-center justify-center transition-colors hover:bg-gray-100">

                {/* Initial State */}
                {!image && !isUploading && (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-pointer flex flex-col items-center gap-4 p-8 w-full h-full"
                    >
                        <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 mb-2">
                            <Upload size={24} />
                        </div>
                        <p className="text-gray-400 font-medium">Toca para subir foto</p>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">JPG, PNG, WEBP</p>
                    </div>
                )}

                {/* Loading State */}
                {isUploading && (
                    <div className="absolute inset-0 z-10 bg-white/80 flex flex-col items-center justify-center">
                        <Loader2 className="animate-spin text-pink-500 mb-2" size={32} />
                        <p className="text-sm font-medium text-gray-500">Subiendo...</p>
                    </div>
                )}

                {/* Preview Image */}
                {image && (
                    <img src={image} alt="Design Preview" className="absolute inset-0 w-full h-full object-cover" />
                )}

                {/* Scanning Overlay */}
                {isAnalyzing && (
                    <div className="absolute inset-0 z-20 bg-black/20 backdrop-blur-[2px] flex flex-col items-center justify-center">
                        <motion.div
                            initial={{ top: 0 }}
                            animate={{ top: '100%' }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent shadow-[0_0_15px_rgba(236,72,153,0.8)]"
                        />
                        <div className="bg-black/70 text-white px-6 py-2 rounded-full backdrop-blur-md flex items-center gap-2">
                            <Sparkles size={16} className="text-yellow-300" />
                            <span className="text-sm font-medium tracking-wide">Analizando complejidad...</span>
                        </div>
                    </div>
                )}
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
            />

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl flex items-start gap-3 text-sm"
                    >
                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                        <span>{error}</span>
                        <button onClick={reset} className="ml-auto font-bold hover:underline">Reintentar</button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Results Card - Only show in default mode */}
            <AnimatePresence>
                {mode === 'default' && result && !isAnalyzing && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 bg-white border border-pink-100 rounded-2xl p-6 shadow-xl shadow-pink-100/50"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Resultado del Análisis</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-serif font-bold text-gray-900">{result.tier}</span>
                                    {result.tier === 'PRO' && <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full">PREMIUM</span>}
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block text-sm text-gray-400 line-through">S/ {result.price + 20}</span>
                                <span className="block text-2xl font-bold text-pink-600">S/ {result.price}</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 mb-6">
                            <p className="text-sm text-gray-600 leading-relaxed flex gap-2 mb-4">
                                <Sparkles size={16} className="text-pink-400 shrink-0 mt-0.5" />
                                {result.reason}
                            </p>

                            <div className="border-t border-gray-200 pt-4">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Selecciona tu Talla</span>
                                <div className="flex gap-2">
                                    {SIZES.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${selectedSize === size
                                                ? 'bg-black text-white shadow-lg'
                                                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={reset}
                                className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                            >
                                Probar otra
                            </button>
                            <button
                                onClick={handleAddToCart}
                                disabled={isAddingToCart || !result.variantId}
                                className="flex-1 bg-black text-white rounded-xl py-3 font-medium flex items-center justify-center gap-2 hover:bg-gray-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                            >
                                {isAddingToCart ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        <span>Reservar Diseño</span>
                                        <ShoppingBag size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
