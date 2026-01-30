import { getProduct } from '@/lib/shopify';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { SizingSection } from '@/components/shop/sizing-section';
import DOMPurify from 'isomorphic-dompurify';
import { ArrowLeft, Truck, Shield, Sparkles } from 'lucide-react';

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
    const { handle } = await params;
    const product = await getProduct(handle);

    if (!product) {
        return notFound();
    }

    const { title, descriptionHtml, priceRange, featuredImage } = product;
    const price = priceRange?.minVariantPrice?.amount;
    const currencyCode = priceRange?.minVariantPrice?.currencyCode;
    const variantId = product.variants.edges[0]?.node.id;

    return (
        <div className="bg-[#FFFBFC] min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
                {/* Back Link */}
                <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-[#D4847C] text-sm font-medium mb-8 hover:text-[#E8A0B0] transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver a la tienda
                </Link>

                <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 lg:items-start">
                    {/* Image */}
                    <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#FDE8EE] border border-[#F5B5C8]/30 mb-8 lg:mb-0 lg:sticky lg:top-32">
                        {featuredImage && (
                            <Image
                                src={featuredImage.url}
                                alt={featuredImage.altText || title}
                                fill
                                className="object-cover"
                                priority
                            />
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                                {title}
                            </h1>
                            <p className="mt-4 text-3xl font-bold text-[#D4847C]">
                                {currencyCode === 'PEN' ? 'S/' : currencyCode === 'USD' ? '$' : currencyCode}{' '}
                                {parseFloat(price).toFixed(2)}
                            </p>
                        </div>

                        {/* Description */}
                        {descriptionHtml && (
                            <div className="prose prose-sm max-w-none text-[#6B6B6B]">
                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(descriptionHtml) }} />
                            </div>
                        )}

                        {/* Benefits */}
                        <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#F5B5C8]/30">
                            <div className="text-center">
                                <Sparkles className="w-6 h-6 text-[#D4847C] mx-auto mb-2" />
                                <p className="text-xs text-[#6B6B6B]">Reutilizable</p>
                            </div>
                            <div className="text-center">
                                <Truck className="w-6 h-6 text-[#D4847C] mx-auto mb-2" />
                                <p className="text-xs text-[#6B6B6B]">Envío Nacional</p>
                            </div>
                            <div className="text-center">
                                <Shield className="w-6 h-6 text-[#D4847C] mx-auto mb-2" />
                                <p className="text-xs text-[#6B6B6B]">Kit Completo</p>
                            </div>
                        </div>

                        {/* Sizing Section */}
                        <div className="bg-white rounded-2xl p-6 border border-[#F5B5C8]/30">
                            <h3 className="text-xl font-bold text-[#3D3D3D] mb-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                                📸 Talla Personalizada
                            </h3>
                            <p className="text-[#6B6B6B] text-sm mb-6">
                                Para calcular tu talla exacta, sube una foto de tu mano con una moneda de referencia.
                            </p>
                            <SizingSection variantId={variantId} />
                        </div>

                        {/* Info */}
                        <div className="text-sm text-[#6B6B6B] space-y-2">
                            <p>✓ Incluye pegamento, lima e instrucciones</p>
                            <p>✓ Envío a todo el Perú</p>
                            <p>✓ Soporte por WhatsApp</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
