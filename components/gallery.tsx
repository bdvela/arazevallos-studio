'use client';

import Image from 'next/image';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, Heart, Star, Palette, Eye, Footprints, Hand, Brush, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeInUp } from '@/components/ui/motion';

interface GalleryItem {
    id: string;
    src: string;
    alt: string;
    category: string;
    span?: 'tall' | 'wide' | 'normal';
    featured?: boolean;
}

interface CategoryConfig {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    featured?: boolean;
}

// ============================================
// GALLERY DATA FOR HOME (Services)
// ============================================
const homeGalleryItems: GalleryItem[] = [
    // Sistema de Uñas
    { id: 'h1', src: '/images/ara/ara-products.jpg', alt: 'Sistema de uñas', category: 'Sistema de Uñas', span: 'tall' },
    // Pedicura
    { id: 'h2', src: '/images/ara/tools.jpg', alt: 'Pedicura profesional', category: 'Pedicura', span: 'normal' },
    // Maquillaje
    { id: 'h3', src: '/images/ara/ara-studio.jpg', alt: 'Maquillaje profesional', category: 'Maquillaje', span: 'wide' },
    // Press-On (featured)
    { id: 'h6', src: '/images/ara/press-on.png', alt: 'Press-On Nails', category: 'Press-On', span: 'tall', featured: true },
    { id: 'h7', src: '/images/ara/kit-press-on.png', alt: 'Kit Press-On completo', category: 'Press-On', span: 'wide', featured: true },
];

const homeCategories: CategoryConfig[] = [
    { name: 'Todos', icon: Sparkles },
    { name: 'Sistema de Uñas', icon: Hand },
    { name: 'Pedicura', icon: Footprints },
    { name: 'Maquillaje', icon: Brush },
    { name: 'Pestañas', icon: Eye },
    { name: 'Cejas', icon: Eye },
    { name: 'Press-On', icon: Zap, featured: true },
];

// ============================================
// GALLERY DATA FOR ABOUT (Ara & Studio)
// ============================================
const aboutGalleryItems: GalleryItem[] = [
    // Sobre Ara
    { id: 'a1', src: '/images/ara/ara-about.jpg', alt: 'Ara Zevallos', category: 'Sobre Ara', span: 'tall' },
    { id: 'a2', src: '/images/ara/ara-studio.jpg', alt: 'Ara trabajando', category: 'Sobre Ara', span: 'wide' },
    { id: 'a3', src: '/images/ara/ara-products.jpg', alt: 'Ara con sus productos', category: 'Sobre Ara', span: 'normal' },
    { id: 'a4', src: '/images/ara/ara-1.jpeg', alt: 'Ara con sus productos', category: 'Sobre Ara', span: 'tall' },
    { id: 'a5', src: '/images/ara/ara-2.jpeg', alt: 'Ara con sus productos', category: 'Sobre Ara', span: 'tall' },
    // Studio
    { id: 'a6', src: '/images/ara/local_photo_1.png', alt: 'Interior del studio', category: 'Studio', span: 'tall' },
    { id: 'a7', src: '/images/ara/local_photo_2.png', alt: 'Espacio de trabajo', category: 'Studio', span: 'normal' },
    { id: 'a8', src: '/images/ara/tools.jpg', alt: 'Herramientas profesionales', category: 'Studio', span: 'wide' },
    { id: 'a9', src: '/images/ara/ara-productos.jpeg', alt: 'Herramientas profesionales', category: 'Studio', span: 'wide' },

];

const aboutCategories: CategoryConfig[] = [
    { name: 'Todos', icon: Sparkles },
    { name: 'Sobre Ara', icon: Heart },
    { name: 'Studio', icon: Star },
];

// ============================================
// GALLERY COMPONENT
// ============================================
interface GallerySectionProps {
    variant?: 'home' | 'about';
    title?: string;
    subtitle?: string;
    description?: string;
}

export function GallerySection({
    variant = 'home',
    title = 'Galería de',
    subtitle = 'Trabajos',
    description = 'Cada diseño es una obra de arte única, creada con amor y dedicación',
}: GallerySectionProps) {
    const items = variant === 'home' ? homeGalleryItems : aboutGalleryItems;
    const categories = variant === 'home' ? homeCategories : aboutCategories;

    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

    const filteredItems = selectedCategory === 'Todos'
        ? items
        : items.filter(item => item.category === selectedCategory);

    const currentIndex = selectedImage ? filteredItems.findIndex(item => item.id === selectedImage.id) : -1;

    const goToNext = () => {
        if (currentIndex < filteredItems.length - 1) {
            setSelectedImage(filteredItems[currentIndex + 1]);
        }
    };

    const goToPrev = () => {
        if (currentIndex > 0) {
            setSelectedImage(filteredItems[currentIndex - 1]);
        }
    };

    return (
        <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <FadeInUp className="text-center mb-12">
                    <span className="text-[#D4847C] text-sm font-medium uppercase tracking-wider">
                        {variant === 'home' ? 'Nuestro Trabajo' : 'Conócenos'}
                    </span>
                    <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                        {title}{' '}
                        <span className="text-[#D4847C] italic">{subtitle}</span>
                    </h2>
                    <p className="mt-4 text-[#6B6B6B] max-w-2xl mx-auto">
                        {description}
                    </p>
                </FadeInUp>

                {/* Category Filter */}
                <FadeInUp delay={0.1} className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <motion.button
                            key={category.name}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCategory(category.name)}
                            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${selectedCategory === category.name
                                ? 'bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] text-white shadow-lg'
                                : 'bg-[#FDE8EE] text-[#6B6B6B] hover:bg-[#F5B5C8]/30'
                                }`}
                        >
                            <category.icon className="w-4 h-4" />
                            {category.name}
                            {/* Featured Badge */}
                            {category.featured && (
                                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-[#D4847C] text-white text-[10px] font-bold rounded-full animate-pulse">
                                    ✨ NEW
                                </span>
                            )}
                        </motion.button>
                    ))}
                </FadeInUp>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileHover={{ y: -5 }}
                                className={`relative cursor-pointer group overflow-hidden rounded-2xl ${item.span === 'tall'
                                    ? 'row-span-2 aspect-[3/4]'
                                    : item.span === 'wide'
                                        ? 'col-span-2 aspect-[16/9]'
                                        : 'aspect-square'
                                    }`}
                                onClick={() => setSelectedImage(item)}
                            >
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Featured Badge on Image */}
                                {item.featured && (
                                    <div className="absolute top-3 left-3 z-10">
                                        <span className="px-3 py-1 bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] text-white text-xs font-bold rounded-full shadow-lg">
                                            ⭐ Destacado
                                        </span>
                                    </div>
                                )}
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-[#D4847C] text-xs font-medium rounded-full">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* View More CTA */}
                <FadeInUp delay={0.3} className="text-center mt-12">
                    <motion.a
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        href="https://instagram.com/arazevallos.studio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary inline-flex items-center gap-2"
                    >
                        Ver más en Instagram
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </motion.a>
                </FadeInUp>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-8 h-8" />
                        </motion.button>

                        {/* Navigation Arrows */}
                        {currentIndex > 0 && (
                            <motion.button
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="absolute left-4 p-2 text-white/80 hover:text-white transition-colors"
                                onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                            >
                                <ChevronLeft className="w-10 h-10" />
                            </motion.button>
                        )}
                        {currentIndex < filteredItems.length - 1 && (
                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="absolute right-4 p-2 text-white/80 hover:text-white transition-colors"
                                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                            >
                                <ChevronRight className="w-10 h-10" />
                            </motion.button>
                        )}

                        {/* Image */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative max-w-5xl max-h-[85vh] w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                width={1200}
                                height={800}
                                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                            />
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                                <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm text-[#3D3D3D] text-sm font-medium rounded-full">
                                    {selectedImage.category}
                                </span>
                            </div>
                        </motion.div>

                        {/* Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm hidden md:block">
                            {currentIndex + 1} / {filteredItems.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
