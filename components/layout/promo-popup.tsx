'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Copy, Check, ArrowRight, Gift } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function PromoPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Show popup after 3.5 seconds
        const timer = setTimeout(() => {
            const hasSeenPromo = sessionStorage.getItem('promo-dismissed');
            if (!hasSeenPromo) {
                setIsVisible(true);
            }
        }, 3500);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem('promo-dismissed', 'true');
    };

    const copyCode = () => {
        navigator.clipboard.writeText('FEBRERO');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-4xl px-4 md:px-0"
                    >
                        <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[85vh] md:max-h-[600px]">

                            {/* Left Side - Image (Hidden on mobile, visible on tablet+) */}
                            <div className="hidden md:block w-2/5 relative">
                                <Image
                                    src="/images/ara/kit-press-on.png"
                                    alt="Kit Press-On Custom"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <p className="font-medium text-sm mb-1 uppercase tracking-wider opacity-90">Edición Limitada</p>
                                    <p className="font-playfair text-2xl font-bold">Ara Zevallos Studio</p>
                                </div>
                            </div>

                            {/* Right Side - Content */}
                            <div className="relative w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center items-center text-center bg-gradient-to-br from-[#FFFBFC] to-white">

                                {/* Background Decorations */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5B5C8]/10 rounded-full blur-3xl pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#D4847C]/5 rounded-full blur-3xl pointer-events-none" />

                                <button
                                    onClick={handleClose}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-[#D4847C] hover:bg-[#FDE8EE] p-2 rounded-full transition-all z-10"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Tag */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-2 px-3 py-1 bg-[#FDE8EE] rounded-full text-[#D4847C] text-xs font-bold uppercase tracking-wider mb-6"
                                >
                                    <Sparkles className="w-3 h-3" />
                                    Lanzamiento Oficial
                                </motion.div>

                                {/* Title */}
                                <motion.h3
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-3xl md:text-5xl font-bold text-[#3D3D3D] mb-4 leading-tight"
                                    style={{ fontFamily: 'var(--font-playfair)' }}
                                >
                                    Celebra <span className="text-[#D4847C] italic">con nosotros</span>
                                </motion.h3>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-[#6B6B6B] text-lg mb-8 max-w-sm"
                                >
                                    Sé una de las primeras 10 personas en comprar y obtén un precio especial en tu diseño soñado.
                                </motion.p>

                                {/* Code Box */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="w-full max-w-sm bg-white rounded-2xl p-2 border border-[#F5B5C8]/30 shadow-lg mb-8 flex items-center justify-between pl-6 pr-2 py-2"
                                >
                                    <div className="flex flex-col items-start">
                                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Tu código</span>
                                        <span className="text-2xl font-bold text-[#3D3D3D] tracking-wider">FEBRERO</span>
                                    </div>
                                    <button
                                        onClick={copyCode}
                                        className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${copied
                                                ? 'bg-green-50 text-green-600'
                                                : 'bg-[#D4847C] text-white hover:bg-[#E8A0B0] hover:shadow-md'
                                            }`}
                                    >
                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        {copied ? '¡Listo!' : 'Copiar'}
                                    </button>
                                </motion.div>

                                {/* CTA */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="w-full max-w-sm"
                                >
                                    <Link
                                        href="/shop"
                                        onClick={handleClose}
                                        className="group w-full flex items-center justify-center gap-2 text-[#3D3D3D] font-bold py-4 rounded-xl border-2 border-[#D4847C]/20 hover:border-[#D4847C] hover:bg-[#FDE8EE] transition-all"
                                    >
                                        Ir a la Tienda
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </motion.div>

                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
