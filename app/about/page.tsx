'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Instagram, MessageCircle, MapPin, Heart, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import { FadeInUp, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { GallerySection } from "@/components/gallery";

const values = [
    {
        icon: Sparkles,
        title: "Creatividad",
        description: "Cada diseño es una obra de arte única, pensada especialmente para ti.",
    },
    {
        icon: Heart,
        title: "Pasión",
        description: "Amo lo que hago y eso se refleja en cada servicio que brindo.",
    },
    {
        icon: Star,
        title: "Calidad Premium",
        description: "Solo uso los mejores productos y técnicas profesionales.",
    },
];

export default function AboutPage() {
    return (
        <div className="bg-[#FFFBFC] overflow-x-hidden">
            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FDE8EE] via-[#FFFBFC] to-white" />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.3, 0.2]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-40 right-0 w-96 h-96 bg-[#7EC8E3]/20 rounded-full blur-3xl"
                />

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Image */}
                        <SlideInLeft className="relative order-2 lg:order-1">
                            <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-full">
                                <motion.div
                                    animate={{ rotate: [0, 1, 0, -1, 0] }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -inset-4 bg-gradient-to-br from-[#F5B5C8] to-[#7EC8E3] rounded-3xl opacity-30 blur-sm"
                                />
                                <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/images/ara/ara-about.jpg"
                                        alt="Araceli Zevallos"
                                        fill
                                        className="object-cover object-top"
                                        priority
                                    />
                                </div>
                            </div>
                        </SlideInLeft>

                        {/* Content */}
                        <SlideInRight className="space-y-6 order-1 lg:order-2">
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-[#D4847C] text-sm font-medium uppercase tracking-wider inline-block"
                            >
                                Mi Historia
                            </motion.span>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="text-4xl md:text-5xl font-bold text-[#3D3D3D]"
                                style={{ fontFamily: 'var(--font-playfair), serif' }}
                            >
                                Hola, soy{" "}
                                <span className="text-[#D4847C] italic">Araceli Zevallos</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg text-[#6B6B6B] leading-relaxed"
                            >
                                Fundadora de Ara Zevallos Studio, un espacio donde la belleza se encuentra con la creatividad
                                y cada cliente es tratado como alguien especial.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-[#6B6B6B] leading-relaxed"
                            >
                                Desde Huánuco, Perú, he construido este studio con la misión de realzar la belleza
                                de cada mujer con estilo y elegancia. Mi pasión por el arte del nail design,
                                el maquillaje y el cuidado de la belleza me impulsa a ofrecer siempre lo mejor.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="text-[#6B6B6B] leading-relaxed"
                            >
                                Cada servicio que brindo es una experiencia premium, porque creo que todas merecemos
                                sentirnos especiales y cuidadas.
                            </motion.p>

                            {/* Social Links */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="flex items-center gap-4 pt-4"
                            >
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="https://instagram.com/arazevallos.studio"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-[#D4847C] hover:text-[#E8A0B0] transition-colors"
                                >
                                    <Instagram className="w-5 h-5" />
                                    <span className="font-medium">@arazevallos.studio</span>
                                </motion.a>
                            </motion.div>
                        </SlideInRight>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <FadeInUp className="text-center mb-16">
                        <span className="text-[#D4847C] text-sm font-medium uppercase tracking-wider">
                            Mis Valores
                        </span>
                        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                            Lo que me define
                        </h2>
                    </FadeInUp>

                    <StaggerContainer className="grid md:grid-cols-3 gap-8">
                        {values.map((value) => (
                            <StaggerItem key={value.title}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="text-center p-8"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 10 }}
                                        className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F5B5C8] to-[#FDE8EE] flex items-center justify-center mx-auto mb-6"
                                    >
                                        <value.icon className="w-10 h-10 text-[#D4847C]" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-[#3D3D3D] mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                                        {value.title}
                                    </h3>
                                    <p className="text-[#6B6B6B]">{value.description}</p>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Studio */}
            <section className="py-24 bg-[#FFFBFC]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <SlideInLeft className="space-y-6">
                            <span className="text-[#D4847C] text-sm font-medium uppercase tracking-wider">
                                El Studio
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                                Un espacio pensado{" "}
                                <span className="text-[#D4847C]">para ti</span>
                            </h2>
                            <p className="text-lg text-[#6B6B6B] leading-relaxed">
                                Ara Zevallos Studio es más que un salón de belleza. Es un espacio acogedor donde
                                puedes relajarte mientras te consiento con servicios de calidad premium.
                            </p>
                            <p className="text-[#6B6B6B] leading-relaxed">
                                Ubicado en Huánuco, Perú, el studio está equipado con los mejores productos
                                y herramientas profesionales para garantizar resultados excepcionales.
                            </p>

                            <div className="flex items-center gap-2 text-[#6B6B6B]">
                                <MapPin className="w-5 h-5 text-[#D4847C]" />
                                <span>Huánuco, Perú</span>
                            </div>
                        </SlideInLeft>

                        <SlideInRight className="relative">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl"
                            >
                                <Image
                                    src="/images/ara/local_photo_2.png"
                                    alt="Ara Zevallos Studio"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </SlideInRight>
                    </div>
                </div>
            </section>

            {/* Gallery - Ara & Studio */}
            <GallerySection
                variant="about"
                title="Galería del"
                subtitle="Studio"
                description="Conoce nuestro espacio y el trabajo que realizamos con amor y dedicación"
            />

            {/* Location Section */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <FadeInUp className="text-center mb-12">
                        <span className="text-[#D4847C] text-sm font-medium uppercase tracking-wider">
                            Ubicación
                        </span>
                        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                            Visítanos en el Studio
                        </h2>
                        <p className="mt-4 text-[#6B6B6B] max-w-xl mx-auto">
                            Un espacio acogedor diseñado para que disfrutes de la experiencia completa.
                        </p>
                    </FadeInUp>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-3xl overflow-hidden shadow-xl border border-[#F5B5C8]/30"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3930.1545372234887!2d-76.2394521!3d-9.9210847!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a7c3003477179b%3A0xd38a3cbd81c15a86!2sAra%20Zevallos%20Studio!5e0!3m2!1sen!2spe!4v1769885790307!5m2!1sen!2spe"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <div className="flex items-center gap-2 text-[#6B6B6B]">
                            <MapPin className="w-5 h-5 text-[#D4847C]" />
                            <span>Huánuco, Perú</span>
                        </div>
                        <motion.a
                            whileHover={{ scale: 1.02 }}
                            href="https://maps.app.goo.gl/5tX6ttp5mhfp4GfH6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#D4847C] hover:text-[#c06b64] transition-colors font-medium"
                        >
                            Abrir en Google Maps →
                        </motion.a>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-[#D4847C] to-[#E8A0B0]">
                <FadeInUp className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                        ¿Lista para vivir la experiencia?
                    </h2>
                    <p className="text-white/90 text-lg mb-8">
                        Agenda tu cita o pide tus Press-On Nails con envío a todo el Perú
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            href="https://wa.link/b5c2z6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-white text-[#D4847C] px-8 py-4 rounded-full font-semibold hover:bg-[#FFFBFC] transition-colors"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Reservar Cita
                        </motion.a>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                href="/shop"
                                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors"
                            >
                                Comprar Press-On
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>
                </FadeInUp>
            </section>
        </div>
    );
}
