'use client';

import { useState } from 'react';
import { addItem } from '@/lib/shopify/actions';
import { Loader2, ShoppingCart, Check, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface StandardProductSectionProps {
    product: any;
}

export function StandardProductSection({ product }: StandardProductSectionProps) {
    const variants = product.variants.edges.map((edge: any) => edge.node);
    const hasMultipleVariants = variants.length > 1;

    const [selectedVariant, setSelectedVariant] = useState(variants[0]);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const router = useRouter();

    const handleAddToCart = async () => {
        if (!selectedVariant) return;

        setIsAdding(true);

        try {
            // Add items based on quantity
            for (let i = 0; i < quantity; i++) {
                const result = await addItem(selectedVariant.id, {});
                if (result?.message !== 'Success') {
                    throw new Error('Error adding to cart');
                }
            }

            const event = new CustomEvent('cart-updated', {
                detail: {
                    title: '✨ ¡Agregado!',
                    message: `${product.title} añadido al carrito.`,
                    type: 'success'
                }
            });
            window.dispatchEvent(event);
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Error al agregar al carrito.');
        } finally {
            setIsAdding(false);
        }
    };

    const price = parseFloat(selectedVariant?.price?.amount || 0);
    const currencySymbol = selectedVariant?.price?.currencyCode === 'PEN' ? 'S/' : '$';

    return (
        <div className="bg-white rounded-2xl p-6 border border-[#F5B5C8]/30 shadow-lg space-y-6">
            {/* Variant Selector (if multiple variants) */}
            {hasMultipleVariants && (
                <div className="space-y-3">
                    <p className="text-sm font-semibold text-[#3D3D3D]">Selecciona una opción:</p>
                    <div className="flex flex-wrap gap-2">
                        {variants.map((variant: any) => {
                            const isSelected = selectedVariant?.id === variant.id;
                            const isAvailable = variant.availableForSale;

                            return (
                                <motion.button
                                    key={variant.id}
                                    onClick={() => isAvailable && setSelectedVariant(variant)}
                                    disabled={!isAvailable}
                                    className={`relative px-4 py-2 rounded-xl border-2 transition-all text-sm font-medium ${isSelected
                                            ? 'border-[#D4847C] bg-gradient-to-br from-[#FDE8EE] to-white text-[#D4847C] shadow-md'
                                            : isAvailable
                                                ? 'border-gray-200 bg-white text-gray-700 hover:border-[#F5B5C8] hover:bg-[#FFFBFC]'
                                                : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed line-through'
                                        }`}
                                    whileHover={isAvailable ? { scale: 1.02 } : {}}
                                    whileTap={isAvailable ? { scale: 0.98 } : {}}
                                >
                                    {variant.title}
                                    {isSelected && (
                                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4847C] rounded-full flex items-center justify-center">
                                            <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                                        </span>
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Price Display */}
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#D4847C]">
                    {currencySymbol} {price.toFixed(2)}
                </span>
                {!selectedVariant?.availableForSale && (
                    <span className="text-sm text-red-500 font-medium">Agotado</span>
                )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-[#6B6B6B]">Cantidad:</span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-gray-50 transition-colors"
                        disabled={quantity <= 1}
                    >
                        <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="px-4 py-2 font-semibold text-[#3D3D3D] min-w-[3rem] text-center">
                        {quantity}
                    </span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:bg-gray-50 transition-colors"
                    >
                        <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
                disabled={!selectedVariant?.availableForSale || isAdding}
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#D4847C] via-[#E8A0B0] to-[#D4847C] bg-[length:200%_100%] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#D4847C]/25 hover:shadow-xl hover:shadow-[#D4847C]/30 disabled:bg-gray-300 disabled:from-gray-300 disabled:to-gray-300 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300"
                whileHover={!isAdding && selectedVariant?.availableForSale ? { scale: 1.02, backgroundPosition: '100% 0' } : {}}
                whileTap={!isAdding && selectedVariant?.availableForSale ? { scale: 0.98 } : {}}
            >
                {isAdding ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Agregando...</span>
                    </>
                ) : (
                    <>
                        <ShoppingCart className="w-5 h-5" strokeWidth={2} />
                        <span>Agregar al Carrito</span>
                    </>
                )}
            </motion.button>

            {/* Availability Note */}
            {selectedVariant?.availableForSale && (
                <p className="text-xs text-center text-[#6B6B6B]">
                    ✓ Disponible para envío inmediato
                </p>
            )}
        </div>
    );
}
