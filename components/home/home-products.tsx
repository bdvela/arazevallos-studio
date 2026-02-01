'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { ProductCard } from "@/components/shop/product-card";
import { collectionConfig } from "@/lib/collections-config";
import type { ShopifyProductCard } from "@/types/shopify";

interface HomeProductsProps {
    products: ShopifyProductCard[];
}

export function HomeProducts({ products }: HomeProductsProps) {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-[#FFFBFC]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <FadeInUp className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
                    <div>
                        <span className="inline-block py-2 px-4 rounded-full bg-[#FDE8EE] text-[#D4847C] text-sm font-medium mb-4">
                            Tienda Online
                        </span>
                        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                            Adquiere tus uñas press-on
                        </h2>
                    </div>
                    <motion.div whileHover={{ x: 5 }}>
                        <Link
                            href="/shop"
                            className="text-[#D4847C] font-medium inline-flex items-center gap-2 group hover:text-[#E8A0B0]"
                        >
                            Ver todo el catálogo
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </FadeInUp>

                {products.length > 0 ? (
                    <StaggerContainer className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
                        {products.slice(0, 4).map((product) => (
                            <StaggerItem key={product.id}>
                                <ProductCard
                                    product={product}
                                    collectionConfig={collectionConfig}
                                />
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                ) : (
                    <FadeInUp className="text-center py-16 bg-white rounded-3xl border border-[#F5B5C8]/30">
                        <p className="text-[#6B6B6B] text-lg mb-4">Próximamente disponibles 💅</p>
                        <p className="text-[#6B6B6B]">Síguenos en Instagram para enterarte primero</p>
                        <a
                            href="https://instagram.com/arazevallos.studio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-4 text-[#D4847C] font-medium hover:text-[#E8A0B0]"
                        >
                            @arazevallos.studio
                        </a>
                    </FadeInUp>
                )}
            </div>
        </section>
    );
}
