'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface Collection {
    handle: string;
    title: string;
}

interface ShopFiltersProps {
    collections: Collection[];
    selectedCollection?: string;
    collectionConfig: Record<string, { icon: string; color: string; gradient: string }>;
}

export function ShopFilters({ collections, selectedCollection, collectionConfig }: ShopFiltersProps) {
    return (
        <div className="flex flex-wrap gap-3 items-center">
            {/* All filter */}
            <Link href="/shop" scroll={false}>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedCollection
                            ? 'bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] text-white shadow-lg shadow-[#D4847C]/20'
                            : 'bg-white text-[#6B6B6B] border border-[#F5B5C8]/50 hover:border-[#D4847C]/50'
                        }`}
                >
                    ✨ Todos
                </motion.button>
            </Link>

            {/* Collection filters */}
            {collections.map((collection) => {
                const config = collectionConfig[collection.handle] || { icon: '💅', color: '#D4847C', gradient: 'from-[#D4847C] to-[#E8A0B0]' };
                const isActive = selectedCollection === collection.handle;

                return (
                    <Link
                        key={collection.handle}
                        href={`/shop?collection=${collection.handle}`}
                        scroll={false}
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive
                                    ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg`
                                    : 'bg-white text-[#6B6B6B] border border-[#F5B5C8]/50 hover:border-[#D4847C]/50'
                                }`}
                            style={isActive ? { boxShadow: `0 4px 14px 0 ${config.color}30` } : {}}
                        >
                            {config.icon} {collection.title.split(' – ')[0]}
                        </motion.button>
                    </Link>
                );
            })}
        </div>
    );
}
