import { getProducts } from '@/lib/shopify';
import { ProductCard } from '@/components/shop/product-card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function ShopPage() {
    let products: any[] = [];
    try {
        products = await getProducts({});
    } catch (error) {
        console.error("Error fetching products:", error);
    }

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
                        Diseños <span className="text-[#D4847C] italic">Disponibles</span>
                    </h1>
                    <p className="mt-4 text-lg text-[#6B6B6B] max-w-2xl">
                        Cada set es diseñado a mano con amor y cuidado. Encuentra tu match perfecto.
                    </p>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {products.length > 0 ? (
                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
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
        </div>
    );
}
