'use client';

import { getProduct } from '@/lib/shopify';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { SizingSection } from '@/components/shop/sizing-section';
import DOMPurify from 'isomorphic-dompurify';
import { ArrowLeft, Truck, Shield, Sparkles, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductPageClientProps {
    product: any;
}

export function ProductPageClient({ product }: ProductPageClientProps) {
    const { title, descriptionHtml, priceRange, featuredImage } = product;
    const price = priceRange?.minVariantPrice?.amount;
    const currencyCode = priceRange?.minVariantPrice?.currencyCode;
    const variantId = product.variants.edges[0]?.node.id;

    return (
        <div className="bg-[#FFFBFC] min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 text-[#D4847C] text-sm font-medium mb-8 hover:text-[#E8A0B0] transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Volver a la tienda
                    </Link>
                </motion.div>

                <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 lg:items-start">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#FDE8EE] to-[#E8F4F8] border border-[#F5B5C8]/30 mb-8 lg:mb-0 lg:sticky lg:top-32 shadow-xl"
                    >
                        {featuredImage && (
                            <Image
                                src={featuredImage.url}
                                alt={featuredImage.altText || title}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                                priority
                            />
                        )}
                        {/* Decorative badge */}
                        <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-[#D4847C]">
                                <Sparkles className="w-3 h-3" />
                                Diseño Exclusivo
                            </span>
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl md:text-4xl font-bold text-[#3D3D3D]"
                                style={{ fontFamily: 'var(--font-playfair), serif' }}
                            >
                                {title}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="mt-4 text-4xl font-bold bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] bg-clip-text text-transparent"
                            >
                                {currencyCode === 'PEN' ? 'S/' : currencyCode === 'USD' ? '$' : currencyCode}{' '}
                                {parseFloat(price).toFixed(2)}
                            </motion.p>
                        </div>

                        {/* Description */}
                        {descriptionHtml && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="prose prose-sm max-w-none text-[#6B6B6B]"
                            >
                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(descriptionHtml) }} />
                            </motion.div>
                        )}

                        {/* Benefits */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="grid grid-cols-3 gap-4 py-6 border-y border-[#F5B5C8]/30"
                        >
                            {[
                                { icon: Sparkles, label: 'Reutilizable' },
                                { icon: Truck, label: 'Envío Nacional' },
                                { icon: Shield, label: 'Kit Completo' },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    whileHover={{ y: -3 }}
                                    className="text-center group cursor-default"
                                >
                                    <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-[#FDE8EE] to-white flex items-center justify-center group-hover:from-[#F5B5C8]/30 transition-colors">
                                        <item.icon className="w-6 h-6 text-[#D4847C]" />
                                    </div>
                                    <p className="text-xs text-[#6B6B6B] font-medium">{item.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Sizing Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="bg-white rounded-2xl p-6 border border-[#F5B5C8]/30 shadow-lg"
                        >
                            <h3 className="text-xl font-bold text-[#3D3D3D] mb-2 flex items-center gap-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                                📸 Talla Personalizada
                            </h3>
                            <p className="text-[#6B6B6B] text-sm mb-6">
                                Para calcular tu talla exacta, sube una foto de tu mano con una moneda de referencia.
                            </p>
                            <SizingSection variantId={variantId} />
                        </motion.div>

                        {/* Info */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="bg-[#FDE8EE]/50 rounded-xl p-4 space-y-2"
                        >
                            {[
                                'Incluye pegamento, lima e instrucciones',
                                'Envío a todo el Perú',
                                'Soporte por WhatsApp',
                            ].map((text, index) => (
                                <p key={index} className="text-sm text-[#6B6B6B] flex items-center gap-2">
                                    <Check className="w-4 h-4 text-[#D4847C]" />
                                    {text}
                                </p>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
