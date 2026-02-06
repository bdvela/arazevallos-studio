'use server';

import { addToCart, createCart, getCart, removeFromCart } from '@/lib/shopify';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function addItem(variantId: string | undefined, attributes: Record<string, string> | undefined) {
    if (!variantId) {
        return { message: 'Missing variant ID' };
    }

    let cartId = (await cookies()).get('cartId')?.value;
    let cart;

    if (!cartId) {
        cart = await createCart();
        cartId = cart.id;
        (await cookies()).set('cartId', cartId!, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 7 días
        });
    }

    const lines = [
        {
            merchandiseId: variantId,
            quantity: 1,
            attributes: attributes ? Object.entries(attributes).map(([key, value]) => ({ key, value })) : []
        }
    ];

    try {
        await addToCart(cartId!, lines);
        return { message: 'Success' };
    } catch (e) {
        return { message: 'Error adding to cart' };
    }
}

export async function getCartTotalQuantity() {
    const cartId = (await cookies()).get('cartId')?.value;
    if (!cartId) return 0;

    try {
        const cart = await getCart(cartId);
        return cart?.totalQuantity || 0;
    } catch (e) {
        return 0;
    }
}

export async function removeItem(lineId: string) {
    const cartId = (await cookies()).get('cartId')?.value;
    if (!cartId) return { message: 'Missing cart ID' };

    try {
        await removeFromCart(cartId, [lineId]);
        revalidatePath('/cart');
        return { message: 'Success' };
    } catch (e) {
        return { message: 'Error deleting item' };
    }
}
