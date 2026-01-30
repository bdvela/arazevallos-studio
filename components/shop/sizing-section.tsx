'use client';

import { useState } from 'react';
import { SizingUploader } from '@/components/sizing/sizing-uploader';

import { addItem } from '@/lib/shopify/actions';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SizingSection({ variantId }: { variantId: string }) {
    const [sizingImage, setSizingImage] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const router = useRouter();

    const handleAddToCart = async () => {
        if (!sizingImage || !variantId) return;

        setIsAdding(true);

        try {
            const attributes = {
                "Sizing Photo": sizingImage
            };

            const result = await addItem(variantId, attributes);

            if (result?.message === 'Success') {
                router.refresh();
                alert('Added to bag!'); // Temporary: We will replace this with a Cart Drawer later
            } else {
                alert('Error adding to bag. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Error adding to bag.');
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="space-y-6">
            <SizingUploader
                onUploadComplete={(url) => setSizingImage(url)}
                className="max-w-none"
            />

            <button
                disabled={!sizingImage || isAdding}
                type="button"
                className="w-full flex items-center justify-center rounded-full bg-[#D4847C] px-8 py-4 text-base font-semibold text-white hover:bg-[#E8A0B0] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all gap-2"
                onClick={handleAddToCart}
            >
                {isAdding ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Agregando...
                    </>
                ) : (
                    'Agregar al Carrito'
                )}
            </button>
            {!sizingImage && (
                <p className="text-xs text-[#D4847C] text-center">
                    * Foto de referencia requerida
                </p>
            )}
        </div>
    );
}
