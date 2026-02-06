'use client';

import { useState } from 'react';
import { addItem } from '@/lib/shopify/actions';
import {
    Loader2,
    Check,
    Zap,
    Infinity,
    Globe,
    Send,
    RefreshCw,
    ShieldCheck,
    ShoppingCart
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface GiftCardSectionProps {
    product: any;
}

export function GiftCardSection({ product }: GiftCardSectionProps) {
    const variants = product.variants.edges.map((edge: any) => edge.node);
    const [selectedVariant, setSelectedVariant] = useState(variants[0]);
    const [isAdding, setIsAdding] = useState(false);
    const router = useRouter();

    const handleAddToCart = async () => {
        if (!selectedVariant) return;

        setIsAdding(true);

        try {
            const result = await addItem(selectedVariant.id, {});

            if (result?.message === 'Success') {
                const event = new CustomEvent('cart-updated', {
                    detail: {
                        title: '¡Agregado al carrito!',
                        message: 'Tarjeta de regalo agregada.',
                        type: 'success'
                    }
                });
                window.dispatchEvent(event);
                router.refresh();
            } else {
                alert('Error al agregar. Por favor intenta de nuevo.');
            }
        } catch (error) {
            console.error(error);
            alert('Error al agregar al carrito.');
        } finally {
            setIsAdding(false);
        }
    };

    // Benefits data
    const benefits = [
        { icon: Zap, text: 'Entrega Instantánea', highlight: true },
        { icon: Infinity, text: 'Sin Expiración', highlight: true },
        { icon: Globe, text: 'Uso híbrido (Online/Local)', highlight: true },
    ];

    // Value icons data
    const valueIcons = [
        { icon: Send, label: 'Regalo Digital' },
        { icon: RefreshCw, label: 'Canje Inmediato' },
        { icon: ShieldCheck, label: 'Seguridad' },
    ];

    return (
        <div className="bg-white rounded-2xl p-8 border border-[#F5B5C8]/30 shadow-lg space-y-8">
            {/* Header */}
            <div>
                <h3
                    className="text-2xl font-bold text-[#3D3D3D] mb-2"
                    style={{ fontFamily: 'var(--font-playfair), serif' }}
                >
                    Regala Belleza ✨
                </h3>
                <p className="text-[#6B6B6B] text-sm">
                    El regalo perfecto para quien amas.
                </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-3">
                {benefits.map((benefit, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FDE8EE] to-[#F5B5C8]/30 flex items-center justify-center flex-shrink-0">
                            <benefit.icon className="w-4 h-4 text-[#D4847C]" />
                        </div>
                        <span className={`text-sm ${benefit.highlight ? 'font-bold text-[#3D3D3D]' : 'text-[#6B6B6B]'}`}>
                            {benefit.text}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Value Icons */}
            <div className="grid grid-cols-3 gap-4 py-5 border-y border-[#F5B5C8]/20">
                {valueIcons.map((item, index) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ y: -2 }}
                        className="text-center group cursor-default"
                    >
                        <div className="w-11 h-11 mx-auto mb-2 rounded-xl bg-gradient-to-br from-[#FDE8EE] to-white flex items-center justify-center group-hover:from-[#F5B5C8]/40 transition-colors shadow-sm">
                            <item.icon className="w-5 h-5 text-[#D4847C]" strokeWidth={1.5} />
                        </div>
                        <p className="text-xs text-[#6B6B6B] font-medium">{item.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Variant Selector */}
            <div className="space-y-4">
                <p className="text-sm font-semibold text-[#3D3D3D]">Selecciona el monto:</p>
                <div className="grid grid-cols-3 gap-3">
                    {variants.map((variant: any) => {
                        const price = parseFloat(variant.price.amount);
                        const isSelected = selectedVariant?.id === variant.id;

                        return (
                            <motion.button
                                key={variant.id}
                                onClick={() => setSelectedVariant(variant)}
                                className={`relative py-4 px-3 rounded-2xl border-2 transition-all text-center ${isSelected
                                    ? 'border-[#D4847C] bg-gradient-to-br from-[#FDE8EE] via-white to-[#F5B5C8]/10 shadow-lg shadow-[#D4847C]/10'
                                    : 'border-gray-200 bg-white hover:border-[#F5B5C8] hover:bg-[#FFFBFC]'
                                    }`}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                {isSelected && (
                                    <div className="absolute -top-1.5 -right-1.5">
                                        <div className="w-5 h-5 rounded-full bg-[#D4847C] flex items-center justify-center shadow-md">
                                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                        </div>
                                    </div>
                                )}
                                <span className={`text-xl font-bold ${isSelected ? 'text-[#D4847C]' : 'text-[#3D3D3D]'}`}>
                                    S/ {price.toFixed(0)}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
                disabled={!selectedVariant || isAdding}
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-[#D4847C] via-[#E8A0B0] to-[#D4847C] bg-[length:200%_100%] px-8 py-5 text-base font-bold text-white shadow-lg shadow-[#D4847C]/25 hover:shadow-xl hover:shadow-[#D4847C]/30 disabled:bg-gray-300 disabled:from-gray-300 disabled:to-gray-300 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300"
                whileHover={!isAdding ? { scale: 1.02, backgroundPosition: '100% 0' } : {}}
                whileTap={!isAdding ? { scale: 0.98 } : {}}
            >
                {isAdding ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Agregando...</span>
                    </>
                ) : (
                    <>
                        <ShoppingCart className="w-5 h-5" strokeWidth={2} />
                        <span>Agregar Gift Card</span>
                    </>
                )}
            </motion.button>
        </div>
    );
}
