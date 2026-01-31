import { getCollection, getCollections } from '@/lib/shopify';
import { ProductCard } from '@/components/shop/product-card';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { collectionConfig, getCollectionConfig } from '@/lib/collections-config';

// Force dynamic rendering - collections are fetched on demand
export const dynamic = 'force-dynamic';

export default async function CollectionPage({
    params
}: {
    params: Promise<{ handle: string }>
}) {
    const { handle } = await params;
    const collection = await getCollection(handle);

    if (!collection) {
        notFound();
    }

    const config = getCollectionConfig(handle);

    const products = collection.products.edges.map((edge: any) => ({
        ...edge.node,
        collections: [{ handle: handle, title: collection.title }]
    }));

    return (
        <div className="bg-[#FFFBFC] min-h-screen">
            {/* Hero */}
            <section
                className="pt-32 pb-16 relative overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${config.color}15 0%, #FFFBFC 50%, white 100%)`
                }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 text-[#D4847C] text-sm font-medium mb-6 hover:text-[#E8A0B0] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver a la tienda
                    </Link>

                    <div className="flex items-center gap-4 mb-4">
                        <span
                            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${config.gradient} text-3xl shadow-lg`}
                            style={{ boxShadow: `0 8px 24px 0 ${config.color}30` }}
                        >
                            {config.icon}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                        {collection.title.split(' – ')[0]}
                    </h1>
                    <p className="mt-2 text-lg text-[#D4847C] font-medium italic">
                        {collection.title.split(' – ')[1] || ''}
                    </p>
                    <p className="mt-4 text-lg text-[#6B6B6B] max-w-2xl">
                        {collection.description || config.description}
                    </p>
                    <p className="mt-4 text-sm text-[#6B6B6B]">
                        {products.length} {products.length === 1 ? 'diseño' : 'diseños'}
                    </p>
                </div>

                {/* Decorative circles */}
                <div
                    className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl"
                    style={{ backgroundColor: config.color }}
                />
                <div
                    className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-10 blur-2xl"
                    style={{ backgroundColor: config.color }}
                />
            </section>

            {/* Products Grid */}
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {products.length > 0 ? (
                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
                            {products.map((product: any) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    collectionConfig={collectionConfig}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-[#F5B5C8]/30">
                            <p className="text-[#6B6B6B] text-lg mb-4">Próximamente nuevos diseños 💅</p>
                            <p className="text-[#6B6B6B]">Síguenos en Instagram para enterarte primero</p>
                            <a
                                href="https://instagram.com/arazevallos.studio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-4 text-[#D4847C] font-medium hover:text-[#E8A0B0]"
                            >
                                @arazevallos.studio
                            </a>
                        </div>
                    )}
                </div>
            </section>

            {/* Back to shop CTA */}
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 btn-secondary"
                    >
                        <Sparkles className="w-4 h-4" />
                        Ver todas las colecciones
                    </Link>
                </div>
            </section>
        </div>
    );
}
