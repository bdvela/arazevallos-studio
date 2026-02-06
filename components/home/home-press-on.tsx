'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Clock, Heart, Truck } from "lucide-react";
import {
    FadeInUp,
    ScaleIn,
    StaggerContainer,
    StaggerItem,
    SlideInLeft,
    SlideInRight
} from "@/components/ui/motion";

const benefits = [
    { icon: Sparkles, title: "Diseños Únicos", desc: "Personalizables" },
    { icon: Clock, title: "Aplicación Fácil", desc: "En minutos" },
    { icon: Heart, title: "Reutilizables", desc: "+15 usos" },
    { icon: Truck, title: "Envío Nacional", desc: "A todo el Perú" },
];

export function HomePressOn() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FDE8EE] via-white to-[#E8F4F8]" />
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-10 right-0 w-[600px] h-[600px] bg-[#D4847C]/5 rounded-full blur-3xl"
            />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Images Grid */}
                    <SlideInLeft className="order-2 lg:order-1">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <ScaleIn className="aspect-square rounded-2xl overflow-hidden bg-[#F5B5C8]/20">
                                    <Image
                                        src="/images/ara/press-on.png"
                                        alt="Productos Ara Zevallos"
                                        width={300}
                                        height={300}
                                        className="w-full h-full object-cover"
                                    />
                                </ScaleIn>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] p-4 rounded-2xl text-white text-center shadow-lg"
                                >
                                    <p className="text-2xl font-bold">+100</p>
                                    <p className="text-sm opacity-90">Diseños disponibles</p>
                                </motion.div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white p-4 rounded-2xl border border-[#F5B5C8]/30 shadow-lg"
                                >
                                    <p className="text-[#D4847C] font-bold text-lg">Desde S/35</p>
                                    <p className="text-sm text-[#6B6B6B]">Set completo</p>
                                </motion.div>
                                <ScaleIn delay={0.4} className="aspect-square rounded-2xl overflow-hidden bg-[#F5B5C8]/20">
                                    <Image
                                        src="/images/ara/kit-press-on.png"
                                        alt="Ara en su studio"
                                        width={300}
                                        height={300}
                                        className="w-full h-full object-cover"
                                    />
                                </ScaleIn>
                            </div>
                        </div>
                    </SlideInLeft>

                    {/* Content */}
                    <SlideInRight className="order-1 lg:order-2 space-y-8">
                        <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-[#D4847C]/10 text-[#D4847C] text-sm font-medium">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4847C] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4847C]"></span>
                            </span>
                            Nuevo: Tienda Online
                        </span>

                        <h2 className="text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                            Press-On Nails: Look de salón {" "}
                            <span className="text-[#D4847C]">sin salir de casa</span>
                        </h2>

                        <p className="text-lg text-[#6B6B6B] leading-relaxed">
                            Uñas postizas premium diseñadas a mano con los mejores materiales.
                            Fáciles de aplicar, reutilizables y con envío a todo el Perú.
                        </p>

                        {/* Benefits */}
                        <StaggerContainer className="grid grid-cols-2 gap-4">
                            {benefits.map((benefit) => (
                                <StaggerItem key={benefit.title}>
                                    <motion.div
                                        whileHover={{ scale: 1.03 }}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#F5B5C8]/30 hover:border-[#D4847C]/50 transition-all"
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-r from-[#D4847C]/10 to-[#E8A0B0]/10 rounded-lg flex items-center justify-center">
                                            <benefit.icon className="w-5 h-5 text-[#D4847C]" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-[#3D3D3D] text-sm">{benefit.title}</p>
                                            <p className="text-xs text-[#6B6B6B]">{benefit.desc}</p>
                                        </div>
                                    </motion.div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>

                        <motion.div whileHover={{ x: 5 }}>
                            <Link
                                href="/shop"
                                className="btn-primary inline-flex items-center gap-2 group"
                            >
                                Explorar Productos
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </SlideInRight>
                </div>
            </div>
        </section>
    );
}
