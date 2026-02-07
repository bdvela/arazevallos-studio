const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = '2024-01';

type ShopifyFetchProps = {
    cache?: RequestCache;
    headers?: HeadersInit;
    query: string;
    tags?: string[];
    variables?: Record<string, unknown>;
};

export async function shopifyFetch<T>({
    cache = 'force-cache',
    headers,
    query,
    tags,
    variables
}: ShopifyFetchProps): Promise<T> {
    const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;
    const key = storefrontAccessToken;

    try {
        const result = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': key!,
                ...headers
            },
            body: JSON.stringify({
                ...(query && { query }),
                ...(variables && { variables })
            }),
            cache,
            ...(tags && { next: { tags } })
        });

        const body = await result.json();

        if (body.errors) {
            throw body.errors[0];
        }

        return body.data;
    } catch (e: any) {
        console.error("Shopify Fetch Logic Error:", e);
        if (e instanceof Error) {
            throw e;
        } else if (e.message) {
            throw new Error(e.message);
        } else {
            throw new Error(JSON.stringify(e));
        }
    }
}

import { getProductsQuery } from './queries';

export async function getProducts({
    query,
    reverse,
    sortKey
}: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
}): Promise<any[]> {
    const res = await shopifyFetch<any>({
        query: getProductsQuery,
        tags: ['products'],
        variables: {
            query,
            reverse,
            sortKey
        }
    });

    return res.products.edges.map((edge: any) => edge.node);
}

import { getProductQuery } from './queries';

export async function getProduct(handle: string): Promise<any | undefined> {
    const res = await shopifyFetch<any>({
        query: getProductQuery,
        tags: ['products'],
        variables: {
            handle
        }
    });

    return res.product;
}

import { createCartMutation, addToCartMutation, removeFromCartMutation } from './mutations';

export async function createCart(): Promise<any> {
    const res = await shopifyFetch<any>({
        query: createCartMutation,
        cache: 'no-store'
    });
    return res.cartCreate.cart;
}

export async function addToCart(cartId: string, lines: any[]): Promise<any> {
    const res = await shopifyFetch<any>({
        query: addToCartMutation,
        variables: {
            cartId,
            lines
        },
        cache: 'no-store'
    });
    return res.cartLinesAdd.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<any> {
    const res = await shopifyFetch<any>({
        query: removeFromCartMutation,
        variables: {
            cartId,
            lineIds
        },
        cache: 'no-store'
    });
    return res.cartLinesRemove.cart;
}

import { getCartQuery } from './queries';

export async function getCart(cartId: string): Promise<any | undefined> {
    const res = await shopifyFetch<any>({
        query: getCartQuery,
        variables: { cartId },
        tags: ['cart'],
        cache: 'no-store'
    });

    return res.cart;
}


import { getCollectionsQuery, getCollectionQuery, getProductsWithCollectionsQuery, getPoliciesQuery } from './queries';

export async function getPolicies(): Promise<any[]> {
    const res = await shopifyFetch<any>({
        query: getPoliciesQuery,
        tags: ['policies']
    });

    const shop = res.shop;
    return [
        { ...shop.privacyPolicy, handle: 'privacy-policy' },
        { ...shop.termsOfService, handle: 'terms-of-service' },
        { ...shop.refundPolicy, handle: 'refund-policy' },
        { ...shop.shippingPolicy, handle: 'shipping-policy' }
    ].filter(p => p.body);
}


export async function getCollections(): Promise<any[]> {
    const res = await shopifyFetch<any>({
        query: getCollectionsQuery,
        tags: ['collections']
    });

    return res.collections.edges.map((edge: any) => edge.node);
}

export async function getCollection(handle: string): Promise<any | undefined> {
    const res = await shopifyFetch<any>({
        query: getCollectionQuery,
        tags: ['collections'],
        variables: { handle }
    });

    return res.collection;
}

export async function getProductsWithCollections({
    query,
    reverse,
    sortKey
}: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
}): Promise<any[]> {
    const res = await shopifyFetch<any>({
        query: getProductsWithCollectionsQuery,
        tags: ['products'],
        variables: {
            query,
            reverse,
            sortKey
        }
    });

    return res.products.edges.map((edge: any) => ({
        ...edge.node,
        collections: edge.node.collections.edges.map((c: any) => c.node)
    }));
}
