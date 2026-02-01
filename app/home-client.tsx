'use client';

import { HomeHero, HomeServices, HomePressOn, HomeProducts } from "@/components/home";
import { TestimonialsSection } from "@/components/testimonials";
import { GallerySection } from "@/components/gallery";
import type { ShopifyProductCard } from "@/types/shopify";

interface HomeClientProps {
    products: ShopifyProductCard[];
}

/**
 * HomeClient Component
 * 
 * Página de inicio compuesta por secciones modulares.
 * Cada sección está en su propio archivo en components/home/
 */
export function HomeClient({ products }: HomeClientProps) {
    return (
        <div className="bg-[#FFFBFC] overflow-x-hidden">
            {/* Hero Principal */}
            <HomeHero />

            {/* Servicios del Studio */}
            <HomeServices />

            {/* Press-On Nails Feature */}
            <HomePressOn />

            {/* Galería de Trabajos */}
            <GallerySection
                variant="home"
                title="Galería de"
                subtitle="Trabajos"
                description="Cada diseño es único, hecho con amor y atención al detalle"
            />

            {/* Testimonios */}
            <TestimonialsSection />

            {/* Productos Destacados */}
            <HomeProducts products={products} />
        </div>
    );
}
