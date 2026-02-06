'use client';

import { useState } from 'react';
import { SizingUploader } from '@/components/sizing/sizing-uploader';

import { addItem } from '@/lib/shopify/actions';
import { Loader2, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SizingSectionProps {
    variantId: string;
    isCustomProduct?: boolean;
    productHandle?: string;
    isGiftCard?: boolean;
}

export function SizingSection({ variantId, isCustomProduct = false, productHandle, isGiftCard = false }: SizingSectionProps) {
    const [uploadedImages, setUploadedImages] = useState<{ hands: string[], design: string | null } | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const router = useRouter();

    // Detect if this is a custom product by handle name
    const showDesignUpload = isCustomProduct ||
        productHandle?.toLowerCase().includes('personalizado') ||
        productHandle?.toLowerCase().includes('custom');

    const handleUploadComplete = (images: { hands: string[], design: string | null }) => {
        setUploadedImages(images);
    };

    const handleAddToCart = async () => {
        // Validation skipped for Gift Cards
        if (!isGiftCard && (!uploadedImages || uploadedImages.hands.length < 4 || !variantId)) return;
        if (!variantId && !isGiftCard) return;

        setIsAdding(true);

        try {
            // Create attributes object with all photo URLs
            const attributes: Record<string, string> = {};

            if (!isGiftCard && uploadedImages) {
                // Add hand photos
                uploadedImages.hands.forEach((url, index) => {
                    attributes[`Foto Mano ${index + 1}`] = url;
                });

                // Add design reference if present
                if (uploadedImages.design) {
                    attributes["Diseño Referencia"] = uploadedImages.design;
                }
            }

            const result = await addItem(variantId, attributes);

            if (result?.message === 'Success') {
                const event = new CustomEvent('cart-updated', {
                    detail: {
                        title: '¡Agregado al carrito!',
                        message: isGiftCard ? 'Tarjeta de regalo agregada.' : 'Tu kit personalizado está listo.',
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

    const isReady = isGiftCard || (uploadedImages && uploadedImages.hands.length >= 4 &&
        uploadedImages.hands.every(url => url !== null));

    return (
        <div className="space-y-6">
            {!isGiftCard && (
                <>
                    <div className="bg-[#FDE8EE] rounded-xl p-4 text-center">
                        <h3 className="font-semibold text-[#3D3D3D] mb-1">
                            📸 Paso 1: Sube tus fotos
                        </h3>
                        <p className="text-sm text-[#6B6B6B]">
                            Necesitamos fotos de tus manos para crear tu talla perfecta
                        </p>
                    </div>

                    <SizingUploader
                        onUploadComplete={handleUploadComplete}
                        className="max-w-none"
                        showDesignUpload={showDesignUpload}
                    />

                    {isReady && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                            <div className="bg-green-500 text-white p-1 rounded-full">
                                <Check className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="font-medium text-green-700">¡Fotos listas!</p>
                                <p className="text-sm text-green-600">Ya puedes agregar al carrito</p>
                            </div>
                        </div>
                    )}
                </>
            )}

            <button
                disabled={!isReady || isAdding}
                type="button"
                className="w-full flex items-center justify-center rounded-full bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] px-8 py-4 text-base font-semibold text-white hover:shadow-lg hover:shadow-[#D4847C]/20 disabled:bg-gray-300 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all gap-2"
                onClick={handleAddToCart}
            >
                {isAdding ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Agregando...
                    </>
                ) : (
                    isGiftCard ? 'Agregar Gift Card 🎁' : 'Agregar al Carrito 🛒'
                )}
            </button>

            {!isReady && !isGiftCard && (
                <p className="text-xs text-[#D4847C] text-center">
                    * Sube las 4 fotos de tus manos para continuar
                </p>
            )}
        </div>
    );
}
