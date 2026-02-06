'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingBag, X, Trash2, Sparkles, AlertCircle, PartyPopper } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Notification types with specific styling and behavior
type NotificationType = 'success' | 'delete' | 'error' | 'info';

interface NotificationConfig {
    icon: React.ReactNode;
    bgColor: string;
    iconBg: string;
    iconColor: string;
    accentColor: string;
}

const notificationConfigs: Record<NotificationType, NotificationConfig> = {
    success: {
        icon: <Sparkles size={20} />,
        bgColor: 'bg-gradient-to-r from-white to-[#FFFBFC]',
        iconBg: 'bg-gradient-to-br from-[#D4847C] to-[#E8A0B0]',
        iconColor: 'text-white',
        accentColor: 'from-[#D4847C] to-[#E8A0B0]',
    },
    delete: {
        icon: <Trash2 size={18} />,
        bgColor: 'bg-white',
        iconBg: 'bg-gray-100',
        iconColor: 'text-gray-500',
        accentColor: 'from-gray-400 to-gray-500',
    },
    error: {
        icon: <AlertCircle size={20} />,
        bgColor: 'bg-white',
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        accentColor: 'from-red-500 to-red-600',
    },
    info: {
        icon: <ShoppingBag size={20} />,
        bgColor: 'bg-white',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        accentColor: 'from-blue-500 to-blue-600',
    },
};

export function CartNotification() {
    const [isVisible, setIsVisible] = useState(false);
    const [notification, setNotification] = useState({
        title: '¡Agregado al carrito!',
        message: 'Tu diseño personalizado está listo.',
        type: 'success' as NotificationType
    });
    const pathname = usePathname();
    const isOnCartPage = pathname === '/cart';

    useEffect(() => {
        const handleCartUpdate = (event: Event) => {
            const customEvent = event as CustomEvent;
            if (customEvent.detail) {
                setNotification({
                    title: customEvent.detail.title || '¡Agregado al carrito!',
                    message: customEvent.detail.message || 'Tu diseño personalizado está listo.',
                    type: (customEvent.detail.type as NotificationType) || 'success'
                });
            } else {
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

    const config = notificationConfigs[notification.type];
    const showCartButton = notification.type === 'success' && !isOnCartPage;
    const showContinueButton = notification.type !== 'delete' || !isOnCartPage;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed top-24 left-4 right-4 md:left-auto md:right-4 z-50 w-auto md:w-full md:max-w-sm"
                >
                    <div className={`${config.bgColor} backdrop-blur-xl border border-[#F5B5C8]/30 p-4 rounded-2xl shadow-2xl shadow-pink-100/30 flex items-start gap-4 overflow-hidden relative`}>
                        {/* Decorative gradient line at top */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.accentColor}`} />

                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                            className={`p-2.5 rounded-xl shrink-0 ${config.iconBg} ${config.iconColor} shadow-sm`}
                        >
                            {config.icon}
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 pt-0.5">
                            <motion.h4
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 }}
                                className="text-sm font-bold text-[#3D3D3D]"
                            >
                                {notification.title}
                            </motion.h4>
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xs text-[#6B6B6B] mt-1 leading-relaxed"
                            >
                                {notification.message}
                            </motion.p>

                            {/* Action buttons - contextual */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 }}
                                className="mt-3 flex gap-3"
                            >
                                {showCartButton && (
                                    <Link
                                        href="/cart"
                                        onClick={() => setIsVisible(false)}
                                        className="text-xs font-semibold bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-pink-200/50 transition-all duration-300"
                                    >
                                        Ver Carrito ✨
                                    </Link>
                                )}
                                {showContinueButton && (
                                    <button
                                        onClick={() => setIsVisible(false)}
                                        className="text-xs font-medium text-[#6B6B6B] hover:text-[#D4847C] transition-colors"
                                    >
                                        {notification.type === 'success' ? 'Seguir comprando' : 'Cerrar'}
                                    </button>
                                )}
                            </motion.div>
                        </div>

                        {/* Close button */}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-gray-300 hover:text-[#D4847C] transition-colors p-1 rounded-full hover:bg-[#FDE8EE]"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
