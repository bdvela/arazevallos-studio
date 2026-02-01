'use client';

import { motion } from "framer-motion";
import { Sparkles, Star, Heart, Palette } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const services = [
    {
        title: "Sistema de Uñas",
        description: "Diseños personalizados con acabado profesional y durabilidad excepcional.",
        icon: Sparkles,
    },
    {
        title: "Maquillaje",
        description: "Realza tu belleza para cualquier ocasión especial con técnicas profesionales.",
        icon: Star,
    },
    {
        title: "Pestañas",
        description: "Extensiones y lifting para una mirada más expresiva y cautivadora.",
        icon: Heart,
    },
    {
        title: "Cejas",
        description: "Diseño, depilación y laminado para enmarcar perfectamente tu rostro.",
        icon: Palette,
    },
];

export function HomeServices() {
    return (
        <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <FadeInUp className="text-center mb-16">
                    <span className="inline-block py-2 px-4 rounded-full bg-[#FDE8EE] text-[#D4847C] text-sm font-medium mb-4">
                        Nuestros Servicios
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                        Servicios para tu <span className="text-[#D4847C]">Bienestar</span>
                    </h2>
                </FadeInUp>

                <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <StaggerItem key={service.title}>
                            <motion.div
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group bg-gradient-to-br from-white to-[#FDE8EE]/30 p-6 rounded-2xl border border-[#F5B5C8]/30 hover:border-[#D4847C]/50 transition-all hover:shadow-xl cursor-pointer"
                            >
                                <motion.div
                                    whileHover={{ rotate: 12 }}
                                    className="w-14 h-14 bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-[#D4847C]/20"
                                >
                                    <service.icon className="w-7 h-7 text-white" />
                                </motion.div>
                                <h3 className="text-xl font-semibold text-[#3D3D3D] mb-2 group-hover:text-[#D4847C] transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-[#6B6B6B] text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                <FadeInUp delay={0.4} className="text-center mt-12">
                    <motion.a
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        href="https://wa.link/b5c2z6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Agenda tu Cita
                    </motion.a>
                </FadeInUp>
            </div>
        </section>
    );
}
