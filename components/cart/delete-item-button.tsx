'use client';

import { removeItem } from '@/lib/shopify/actions';
import { Trash2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function DeleteItemButton({ lineId }: { lineId: string }) {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsPending(true);
        try {
            const result = await removeItem(lineId);
            if (result.message === 'Success') {
                const event = new CustomEvent('cart-updated', {
                    detail: {
                        title: 'Producto eliminado',
                        message: 'El producto ha sido removido del carrito.',
                        type: 'delete'
                    }
                });
                window.dispatchEvent(event);
                router.refresh();
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            aria-label="Eliminar producto"
        >
            {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                <Trash2 className="w-5 h-5" />
            )}
        </button>
    );
}
