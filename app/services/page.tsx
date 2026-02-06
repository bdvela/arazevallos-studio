'use client';

import { Sparkles, Star, Palette, Eye, FootprintsIcon, EyeClosed } from "lucide-react";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { CTASection, ctaPresets } from "@/components/ui/cta-section";
import { GoogleMap } from "@/components/common/google-map";

const services = [
    {
        title: "Uñas Acrílicas",
        description: "Diseños personalizados con acabado profesional y durabilidad excepcional.",
        icon: Sparkles,
        features: ["Diseños personalizados", "Durabilidad 3-4 semanas", "Formas variadas"],
    },
    {
        title: "Uñas Rubber Gel",
        description: "Sistema flexible y resistente que cuida tus uñas naturales.",
        icon: Star,
        features: ["Flexible y resistente", "Cuida tus uñas", "Acabado natural"],
    },
    {
        title: "Maquillaje Profesional",
        description: "Realza tu belleza para eventos especiales o sesiones fotográficas.",
        icon: Palette,
        features: ["Eventos especiales", "Sesiones fotográficas", "Social y día a día"],
    },
    {
        title: "Extensiones de Pestañas",
        description: "Mirada más expresiva con extensiones pelo a pelo o efecto volumen.",
        icon: EyeClosed,
        features: ["Pelo a pelo", "Efecto volumen", "Lifting de pestañas"],
    },
    {
        title: "Diseño de Cejas",
        description: "Enmarca perfectamente tu rostro con técnicas de laminado.",
        icon: Eye,
        features: ["Diseño personalizado", "Depilación con hilo", "Laminado"],
    },
    {
        title: "Pedicure",
        description: "Cuidado completo para tus pies con hidratación profunda.",
        icon: FootprintsIcon,
        features: ["Spa para pies", "Hidratación profunda", "Diseños opcionales"],
    },
];

export default function ServicesPage() {
    return (
        <div className="bg-[#FFFBFC] overflow-x-hidden">
            {/* Hero */}
            <Section variant="pink" padding="hero">
                <div className="text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[#D4847C] text-xs sm:text-sm font-medium uppercase tracking-wider inline-block"
                    >
                        Nuestros Servicios
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-[#3D3D3D]"
                        style={{ fontFamily: 'var(--font-playfair), serif' }}
                    >
                        Experiencia <span className="text-[#D4847C] italic">Premium</span> en Belleza
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 sm:mt-6 text-base sm:text-lg text-[#6B6B6B] max-w-2xl mx-auto"
                    >
                        Realzamos tu belleza natural con técnicas profesionales y productos de alta calidad.
                    </motion.p>
                </div>
            </Section>

            {/* Services Grid */}
            <Section variant="default" padding="lg">
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {services.map((service) => (
                        <StaggerItem key={service.title}>
                            <motion.div
                                whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
                                className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#F5B5C8]/30 hover:border-[#D4847C]/50 transition-colors h-full"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#F5B5C8] to-[#FDE8EE] flex items-center justify-center mb-4 sm:mb-6"
                                >
                                    <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#D4847C]" />
                                </motion.div>

                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#3D3D3D] mb-2 sm:mb-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                                    {service.title}
                                </h3>

                                <p className="text-sm sm:text-base text-[#6B6B6B] mb-4 sm:mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                <ul className="space-y-1.5 sm:space-y-2">
                                    {service.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2 text-xs sm:text-sm text-[#6B6B6B]">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4847C] flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </Section>

            {/* Location Section */}
            <Section variant="white" padding="lg" container="lg">
                <SectionHeader
                    label="Visítanos"
                    title="Nuestro"
                    titleAccent="Studio"
                    description="Te esperamos en un espacio diseñado para tu comodidad y relajación."
                />
                <GoogleMap height={350} />
            </Section>

            {/* CTA */}
            <CTASection {...ctaPresets.booking} />
        </div>
    );
}
