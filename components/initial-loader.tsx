'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export function InitialLoader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[100] bg-gradient-to-br from-[#FFFBFC] via-white to-[#FDE8EE] flex items-center justify-center"
                >
                    {/* Decorative blobs */}
                    <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#F5B5C8]/30 rounded-full blur-3xl animate-pulse pointer-events-none" />
                    <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-[#7EC8E3]/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

                    {/* Content - simple centered box */}
                    <div className="relative z-10 w-full max-w-sm px-8 flex flex-col items-center">
                        {/* Logo */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <Image
                                    src="/images/logo.png"
                                    alt="Ara Zevallos Studio"
                                    width={600}
                                    height={200}
                                    className="w-auto h-auto"
                                    priority
                                />
                            </motion.div>
                        </motion.div>

                        {/* Loading bar */}
                        <div className="mt-4 w-48 h-1 bg-[#FDE8EE] rounded-full overflow-hidden">
                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                                className="h-full w-1/2 bg-gradient-to-r from-transparent via-[#D4847C] to-transparent"
                            />
                        </div>

                        {/* Loading text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="mt-6 text-sm text-[#6B6B6B] text-center"
                        >
                            Preparando tu experiencia...
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
