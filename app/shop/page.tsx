import { getProductsWithCollections, getCollections } from '@/lib/shopify';
import { ProductCard } from '@/components/shop/product-card';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Crown, Heart, Palette } from 'lucide-react';
import { ShopFilters } from '@/components/shop/shop-filters';
import { collectionConfig } from '@/lib/collections-config';

// Force dynamic rendering to get fresh searchParams
export const dynamic = 'force-dynamic';

export default async function ShopPage({
    searchParams
}: {
    searchParams: Promise<{ collection?: string }>
}) {
    // Await searchParams for Next.js 14+
    const params = await searchParams;

    let products: any[] = [];
    let collections: any[] = [];

    try {
        [products, collections] = await Promise.all([
            getProductsWithCollections({}),
            getCollections()
        ]);
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    // Filter out system collections
    const displayCollections = collections.filter(
        c => !['hydrogen', 'automated-collection'].includes(c.handle)
    );

    // Filter products by selected collection
    const selectedCollection = params.collection;
    const filteredProducts = selectedCollection
        ? products.filter(p =>
            p.collections.some((c: any) => c.handle === selectedCollection)
        )
        : products;

    return (
        <div className="bg-[#FFFBFC] min-h-screen">
            {/* Hero */}
            <section className="pt-32 pb-12 bg-gradient-to-br from-[#FDE8EE] via-[#FFFBFC] to-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/press-on"
                        className="inline-flex items-center gap-2 text-[#D4847C] text-sm font-medium mb-6 hover:text-[#E8A0B0] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver a Press-On
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                        Tienda <span className="text-[#D4847C] italic">Press-On</span>
                    </h1>
                    <p className="mt-4 text-lg text-[#6B6B6B] max-w-2xl">
                        Diseños exclusivos hechos a mano con amor. Encuentra tu match perfecto.
                    </p>
                </div>
            </section>

            {/* Collection Filters */}
            <section className="py-6 bg-white border-b border-[#F5B5C8]/30 sticky top-20 z-40">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <ShopFilters
                        collections={displayCollections}
                        selectedCollection={selectedCollection}
                        collectionConfig={collectionConfig}
                    />
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Results count */}
                    <div className="mb-6 flex items-center justify-between">
                        <p className="text-sm text-[#6B6B6B]">
                            {filteredProducts.length} {filteredProducts.length === 1 ? 'diseño' : 'diseños'}
                            {selectedCollection && (
                                <span className="ml-1">
                                    en <span className="font-medium text-[#D4847C]">
                                        {displayCollections.find(c => c.handle === selectedCollection)?.title || selectedCollection}
                                    </span>
                                </span>
                            )}
                        </p>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    collectionConfig={collectionConfig}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-[#F5B5C8]/30">
                            <p className="text-[#6B6B6B] text-lg mb-4">
                                {selectedCollection
                                    ? 'No hay diseños en esta colección todavía 💅'
                                    : 'Próximamente nuevos diseños 💅'
                                }
                            </p>
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
        </div>
    );
}
