'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingBag, X } from 'lucide-react';
import Link from 'next/link';

export function CartNotification() {
    const [isVisible, setIsVisible] = useState(false);
    const [notification, setNotification] = useState({
        title: '¡Agregado al carrito!',
        message: 'Tu diseño personalizado está listo.',
        type: 'success'
    });

    useEffect(() => {
        const handleCartUpdate = (event: Event) => {
            const customEvent = event as CustomEvent;
            if (customEvent.detail) {
                setNotification({
                    title: customEvent.detail.title || '¡Agregado al carrito!',
                    message: customEvent.detail.message || 'Tu diseño personalizado está listo.',
                    type: customEvent.detail.type || 'success'
                });
            } else {
                // Default fallback for simple events
                setNotification({
                    title: '¡Agregado al carrito!',
                    message: 'Tu diseño personalizado está listo.',
                    type: 'success'
                });
            }

            setIsVisible(true);
            const timer = setTimeout(() => setIsVisible(false), 4000);
            return () => clearTimeout(timer);
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: 'backOut' }}
                    className="fixed top-24 right-4 z-50 w-full max-w-sm"
                >
                    <div className="bg-white/90 backdrop-blur-xl border border-[#F5B5C8]/50 p-4 rounded-2xl shadow-xl shadow-pink-100/50 flex items-start gap-4">
                        <div className={`p-2 rounded-full shrink-0 ${notification.type === 'delete' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                            {notification.type === 'delete' ? <X size={20} /> : <Check size={20} />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-gray-900">{notification.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                            <div className="mt-3 flex gap-3">
                                <Link
                                    href="/cart"
                                    onClick={() => setIsVisible(false)}
                                    className="text-xs font-medium bg-black text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    Ver Carrito
                                </Link>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="text-xs font-medium text-gray-500 hover:text-gray-700 hover:underline"
                                >
                                    Seguir comprando
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
