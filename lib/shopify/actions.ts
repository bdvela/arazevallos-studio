'use server';

import { addToCart, createCart, getCart, removeFromCart } from '@/lib/shopify';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

async function getOrCreateValidCart(): Promise<string> {
    const cookieStore = await cookies();
    let cartId = cookieStore.get('cartId')?.value;

    // If we have a cartId, verify it's still valid
    if (cartId) {
        try {
            const existingCart = await getCart(cartId);
            // If cart doesn't exist or is from a different store, it will be null/undefined
            if (existingCart && existingCart.id) {
                return cartId;
            }
        } catch (e) {
            // Cart is invalid (likely from old store), we'll create a new one
            console.log('Invalid cart detected, creating new one...');
        }
    }

    // Create a new cart
    const newCart = await createCart();
    const newCartId = newCart.id;

    cookieStore.set('cartId', newCartId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 días
    });

    return newCartId;
}

export async function addItem(variantId: string | undefined, attributes: Record<string, string> | undefined) {
    if (!variantId) {
        return { message: 'Missing variant ID' };
    }

    try {
        const cartId = await getOrCreateValidCart();

        const lines = [
            {
                merchandiseId: variantId,
                quantity: 1,
                attributes: attributes ? Object.entries(attributes).map(([key, value]) => ({ key, value })) : []
            }
        ];

        await addToCart(cartId, lines);
        revalidatePath('/cart');
        return { message: 'Success' };
    } catch (e) {
        console.error('Error adding to cart:', e);
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
