import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/shopify';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://arazevallos.studio';

    // 1. Static Routes
    const staticRoutes = [
        '',
        '/cart',
        '/press-on',
        '/services',
        '/about', // If it exists
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // 2. Dynamic Product Routes
    const products = await getProducts({});
    const productRoutes = products.map((product) => ({
        url: `${baseUrl}/shop/${product.handle}`,
        lastModified: new Date(product.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...productRoutes];
}
