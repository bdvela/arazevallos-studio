'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeInUp, HeroText, HeroImage } from "@/components/ui/motion";
import { Sparkles, Heart, Star, Truck } from "lucide-react";

export function HomeHero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FDE8EE] via-[#FFFBFC] to-[#E8F4F8]" />

            {/* Decorative Elements - Animated */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.4, 0.3]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-10 w-72 h-72 bg-[#F5B5C8]/30 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 left-10 w-96 h-96 bg-[#7EC8E3]/20 rounded-full blur-3xl"
            />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <HeroText className="text-center lg:text-left space-y-8">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-block py-2 px-4 rounded-full bg-white/80 border border-[#F5B5C8] text-[#D4847C] text-sm font-medium"
                        >
                            ✨ Experiencia Premium en Huánuco
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3D3D3D] leading-tight"
                            style={{ fontFamily: 'var(--font-playfair), serif' }}
                        >
                            Realzamos tu belleza con{" "}
                            <span className="text-[#D4847C] italic">estilo y elegancia</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="text-lg text-[#6B6B6B] max-w-xl mx-auto lg:mx-0 leading-relaxed"
                        >
                            Uñas, maquillaje, pestañas y cejas. Cada detalle cuenta para hacerte brillar.
                            Ahora con <strong>Press-On Nails</strong> con envío a todo el Perú.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <motion.a
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                href="https://wa.link/b5c2z6"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary inline-flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Reservar Cita
                            </motion.a>
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                <Link href="/press-on" className="btn-secondary inline-flex items-center justify-center gap-2">
                                    Ver Press-On Nails
                                    <span className="text-xs bg-[#D4847C] text-white px-1.5 py-0.5 rounded-full">NEW</span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </HeroText>

                    {/* Image */}
                    <HeroImage className="relative h-[500px] lg:h-[700px]">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="relative h-full w-full"
                        >
                            <Image
                                src="/images/ara/ara-hero.png"
                                alt="Ara Zevallos Studio"
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 rounded-2xl" />
                        </motion.div>

                        {/* Floating Stats Cards */}
                        {/* <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="absolute -left-4 md:-left-8 top-1/4 backdrop-blur-lg bg-white/90 p-4 rounded-2xl shadow-xl border border-[#F5B5C8]/30"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] rounded-xl flex items-center justify-center">
                                    <span className="text-xl">⭐</span>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-[#3D3D3D]">+500</p>
                                    <p className="text-xs text-[#6B6B6B]">Clientes felices</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="absolute -right-4 md:-right-8 bottom-1/4 backdrop-blur-lg bg-white/90 p-4 rounded-2xl shadow-xl border border-[#F5B5C8]/30"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-[#7EC8E3] to-[#A8D8EA] rounded-xl flex items-center justify-center">
                                    <span className="text-xl">🚚</span>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-[#3D3D3D]">Envío</p>
                                    <p className="text-xs text-[#6B6B6B]">A nivel nacional</p>
                                </div>
                            </div>
                        </motion.div> */}
                    </HeroImage>
                </div>
                <FadeInUp delay={0.6}>
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-white/50">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                            {[
                                { icon: Sparkles, title: "Relajación", desc: "Cuida tu cuerpo y mente", gradient: "from-[#F5B5C8] to-[#FDE8EE]", color: "#D4847C" },
                                { icon: Heart, title: "Satisfacción", desc: "Alcanza tu máxima belleza", gradient: "from-[#E8D8F0] to-[#F5D0C5]", color: "#B47C9B" },
                                { icon: Star, title: "Calidad", desc: "Productos premium", gradient: "from-[#7EC8E3]/30 to-[#A8DCF0]", color: "#5BA8C8" },
                                { icon: Truck, title: "Envío", desc: "Press-On a todo Perú", gradient: "from-[#F5D0C5] to-[#FDE8EE]", color: "#D4847C" },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                                    whileHover={{ y: -3 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                                        <item.icon className="w-6 h-6" style={{ color: item.color }} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#3D3D3D] text-sm">{item.title}</h4>
                                        <p className="text-xs text-[#6B6B6B] mt-0.5">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </FadeInUp>
            </div>
        </section>
    );
}
