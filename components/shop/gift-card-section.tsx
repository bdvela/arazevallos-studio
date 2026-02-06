'use client';

import { useState } from 'react';
import { addItem } from '@/lib/shopify/actions';
import { Loader2, Gift, Check } from 'lucide-react';
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

    return (
        <div className="bg-white rounded-2xl p-6 border border-[#F5B5C8]/30 shadow-lg space-y-5">
            <h3 className="text-xl font-bold text-[#3D3D3D] flex items-center gap-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                🎁 Regala Belleza
            </h3>
            <p className="text-[#6B6B6B] text-sm">
                La tarjeta de regalo se envía por correo electrónico con instrucciones para canjearla.
            </p>

            {/* Variant Selector */}
            <div className="space-y-3">
                <p className="text-sm font-medium text-[#3D3D3D]">Selecciona el monto:</p>
                <div className="grid grid-cols-2 gap-3">
                    {variants.map((variant: any) => {
                        const price = parseFloat(variant.price.amount);
                        const isSelected = selectedVariant?.id === variant.id;

                        return (
                            <motion.button
                                key={variant.id}
                                onClick={() => setSelectedVariant(variant)}
                                className={`relative p-4 rounded-xl border-2 transition-all text-center ${isSelected
                                        ? 'border-[#D4847C] bg-gradient-to-br from-[#FDE8EE] to-white shadow-md'
                                        : 'border-gray-200 bg-white hover:border-[#F5B5C8] hover:bg-[#FFFBFC]'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSelected && (
                                    <div className="absolute top-2 right-2">
                                        <Check className="w-4 h-4 text-[#D4847C]" />
                                    </div>
                                )}
                                <Gift className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-[#D4847C]' : 'text-gray-400'}`} />
                                <span className={`text-lg font-bold ${isSelected ? 'text-[#D4847C]' : 'text-[#3D3D3D]'}`}>
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
                className="w-full flex items-center justify-center rounded-full bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] px-8 py-4 text-base font-semibold text-white hover:shadow-lg hover:shadow-[#D4847C]/20 disabled:bg-gray-300 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all gap-2"
                whileHover={!isAdding ? { scale: 1.02 } : {}}
                whileTap={!isAdding ? { scale: 0.98 } : {}}
            >
                {isAdding ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Agregando...
                    </>
                ) : (
                    <>
                        Agregar Gift Card 🎁
                    </>
                )}
            </motion.button>
        </div>
    );
}
