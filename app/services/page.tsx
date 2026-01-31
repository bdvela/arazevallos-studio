'use client';

import { Sparkles, Star, Heart, Palette, Eye, Scissors, MessageCircle, FootprintsIcon, EyeClosed } from "lucide-react";
import { motion } from "framer-motion";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const services = [
    {
        title: "Uñas Acrílicas",
        description: "Diseños personalizados con acabado profesional y durabilidad excepcional. Técnica de esculpido que permite crear la forma y largo que desees.",
        icon: Sparkles,
        features: ["Diseños personalizados", "Durabilidad 3-4 semanas", "Formas variadas"],
    },
    {
        title: "Uñas Rubber Gel",
        description: "Sistema flexible y resistente que cuida tus uñas naturales. Ideal para quienes buscan una opción más gentil con acabado natural.",
        icon: Star,
        features: ["Flexible y resistente", "Cuida tus uñas", "Acabado natural"],
    },
    {
        title: "Maquillaje Profesional",
        description: "Realza tu belleza para eventos especiales, sesiones fotográficas o el día a día. Técnicas profesionales con productos de alta calidad.",
        icon: Palette,
        features: ["Eventos especiales", "Sesiones fotográficas", "Social y día a día"],
    },
    {
        title: "Extensiones de Pestañas",
        description: "Mirada más expresiva y cautivadora con extensiones pelo a pelo o efecto volumen. Resultados naturales y duraderos.",
        icon: EyeClosed,
        features: ["Pelo a pelo", "Efecto volumen", "Lifting de pestañas"],
    },
    {
        title: "Diseño de Cejas",
        description: "Enmarca perfectamente tu rostro con diseño, depilación y técnicas de laminado para cejas perfectas.",
        icon: Eye,
        features: ["Diseño personalizado", "Depilación con hilo", "Laminado"],
    },
    {
        title: "Pedicure",
        description: "Cuidado completo para tus pies con hidratación profunda y diseños opcionales. Relájate mientras te consentimos.",
        icon: FootprintsIcon,
        features: ["Spa para pies", "Hidratación profunda", "Diseños opcionales"],
    },
];

export default function ServicesPage() {
    return (
        <div className="bg-[#FFFBFC] overflow-x-hidden">
            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-[#FDE8EE] via-[#FFFBFC] to-white overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-[#D4847C] text-sm font-medium uppercase tracking-wider inline-block"
                    >
                        Nuestros Servicios
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mt-4 text-4xl md:text-5xl font-bold text-[#3D3D3D]"
                        style={{ fontFamily: 'var(--font-playfair), serif' }}
                    >
                        Experiencia{" "}
                        <span className="text-[#D4847C] italic">Premium</span>{" "}
                        en Belleza
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 text-lg text-[#6B6B6B] max-w-2xl mx-auto"
                    >
                        Cada servicio está diseñado para realzar tu belleza natural con técnicas profesionales y productos de alta calidad.
                    </motion.p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <StaggerItem key={service.title}>
                                <motion.div
                                    whileHover={{
                                        y: -8,
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="group bg-white rounded-3xl p-8 border border-[#F5B5C8]/30 hover:border-[#D4847C]/50 transition-colors h-full"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5B5C8] to-[#FDE8EE] flex items-center justify-center mb-6"
                                    >
                                        <service.icon className="w-8 h-8 text-[#D4847C]" />
                                    </motion.div>

                                    <h3 className="text-2xl font-bold text-[#3D3D3D] mb-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                                        {service.title}
                                    </h3>

                                    <p className="text-[#6B6B6B] mb-6 leading-relaxed">
                                        {service.description}
                                    </p>

                                    <ul className="space-y-2">
                                        {service.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#D4847C]" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-[#D4847C] to-[#E8A0B0]">
                <FadeInUp className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                        ¿Lista para tu cita?
                    </h2>
                    <p className="text-white/90 text-lg mb-8">
                        Agenda tu cita por WhatsApp y vive la experiencia Ara Zevallos Studio
                    </p>
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        href="https://wa.link/b5c2z6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-white text-[#D4847C] px-8 py-4 rounded-full font-semibold hover:bg-[#FFFBFC] transition-colors text-lg"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Reservar por WhatsApp
                    </motion.a>
                </FadeInUp>
            </section>
        </div>
    );
}
