'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, ShoppingBag, Sparkles } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#FFFBFC] flex items-center justify-center relative overflow-hidden px-4">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FDE8EE] via-[#FFFBFC] to-white" />
            <div className="absolute top-20 left-20 w-72 h-72 bg-[#D4847C]/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#E8A0B0]/5 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="relative z-10 max-w-2xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 relative inline-block"
                >
                    <span className="text-[150px] md:text-[200px] font-bold text-[#FDE8EE] leading-none select-none" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                        404
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <span className="text-6xl">💅</span>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-[#3D3D3D] mb-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                        Oops! Esta uña se rompió
                    </h1>
                    <p className="text-[#6B6B6B] text-lg mb-10 max-w-md mx-auto">
                        No pudimos encontrar la página que buscas. Tal vez fue un diseño de temporada pasada.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-white border border-[#F5B5C8]/50 text-[#6B6B6B] hover:text-[#D4847C] hover:border-[#D4847C] shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span>Volver al Inicio</span>
                        </Link>

                        <Link
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] text-white shadow-lg shadow-[#D4847C]/20 hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                        >
                            <span>Ir a la Tienda</span>
                            <ShoppingBag className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-16 flex items-center justify-center gap-2 text-sm text-[#D4847C]/60"
                >
                    <Sparkles className="w-4 h-4" />
                    <span>Ara Zevallos Studio</span>
                </motion.div>
            </div>
        </div>
    );
}
