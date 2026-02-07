import { getProduct } from '@/lib/shopify';
import { notFound } from 'next/navigation';
import { ProductPageClient } from './product-client';

import type { Metadata } from 'next';

type Props = {
    params: Promise<{ handle: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { handle } = await params;
    const product = await getProduct(handle);

    if (!product) {
        return {
            title: 'Producto no encontrado | Ara Zevallos Studio',
            description: 'El producto que buscas no está disponible.'
        };
    }

    const { url, altText } = product.featuredImage || {};
    const price = product.priceRange.minVariantPrice.amount;
    const currency = product.priceRange.minVariantPrice.currencyCode;

    return {
        title: `${product.title} | Ara Zevallos Studio`,
        description: product.description.substring(0, 160).replace(/<[^>]*>?/gm, ''), // Strip HTML tags
        openGraph: {
            title: product.title,
            description: product.description.substring(0, 160).replace(/<[^>]*>?/gm, ''),
            url: `https://arazevallos.studio/shop/${handle}`,
            images: [
                {
                    url: url || '/opengraph-image.png',
                    width: 800,
                    height: 600,
                    alt: altText || product.title,
                }
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: product.title,
            description: product.description.substring(0, 160).replace(/<[^>]*>?/gm, ''),
            images: [url || '/opengraph-image.png'],
        }
    };
}

export default async function ProductPage({ params }: Props) {
    const { handle } = await params;
    const product = await getProduct(handle);

    if (!product) {
        return notFound();
    }

    return <ProductPageClient product={product} />;
}
