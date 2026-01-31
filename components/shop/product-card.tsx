'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProductCardProps {
    product: any;
    collectionConfig?: Record<string, { icon: string; color: string; gradient: string }>;
}

export function ProductCard({ product, collectionConfig }: ProductCardProps) {
    const { handle, title, featuredImage, priceRange, collections } = product;
    const price = priceRange?.minVariantPrice?.amount;
    const currencyCode = priceRange?.minVariantPrice?.currencyCode;

    // Get the first non-home-page collection for badge
    const primaryCollection = collections?.find((c: any) =>
        c.handle !== 'home-page' && c.handle !== 'hydrogen' && c.handle !== 'automated-collection'
    );

    const collectionBadge = primaryCollection && collectionConfig?.[primaryCollection.handle];

    // Check if it's a custom/personalized product
    const isCustom = handle?.toLowerCase().includes('personalizado') || handle?.toLowerCase().includes('custom');

    return (
        <Link href={`/shop/${handle}`} className="group block">
            <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
            >
                <div className="aspect-square relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FDE8EE] to-[#E8F4F8] border border-[#F5B5C8]/30 group-hover:border-[#D4847C]/50 transition-all shadow-sm group-hover:shadow-xl">
                    {featuredImage && (
                        <Image
                            src={featuredImage.url}
                            alt={featuredImage.altText || title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                        />
                    )}

                    {/* Collection Badge - only show if NOT a custom product */}
                    {collectionBadge && !isCustom && (
                        <div className="absolute top-3 left-3">
                            <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold text-white bg-gradient-to-r ${collectionBadge.gradient}`}
                                style={{ boxShadow: `0 2px 8px 0 ${collectionBadge.color}40` }}
                            >
                                {collectionBadge.icon} {primaryCollection.title.split(' – ')[0].replace('Colección ', '')}
                            </span>
                        </div>
                    )}

                    {/* Custom badge - show for personalized products */}
                    {isCustom && (
                        <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold text-white bg-gradient-to-r from-[#7EC8E3] to-[#5BB5D5] animate-pulse">
                                ✨ Personalizable
                            </span>
                        </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3D3D3D]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="inline-block bg-white text-[#D4847C] text-xs font-medium px-4 py-2 rounded-full shadow-lg">
                            Ver detalles →
                        </span>
                    </div>
                </div>

                <div className="mt-4 space-y-1">
                    <h3 className="text-[#3D3D3D] font-medium group-hover:text-[#D4847C] transition-colors line-clamp-1">
                        {title}
                    </h3>
                    <p className="text-lg font-bold bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] bg-clip-text text-transparent">
                        {currencyCode === 'PEN' ? 'S/' : currencyCode === 'USD' ? '$' : currencyCode}{' '}
                        {parseFloat(price).toFixed(2)}
                    </p>
                </div>
            </motion.div>
        </Link>
    );
}
