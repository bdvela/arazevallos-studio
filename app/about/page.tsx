'use client';

import Image from "next/image";
import { Instagram, MapPin, Heart, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import { FadeInUp, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { GallerySection } from "@/components/gallery";
import { Section, SectionHeader } from "@/components/ui/section";
import { CTASection, ctaPresets } from "@/components/ui/cta-section";
import { GoogleMap } from "@/components/common/google-map";

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
            <Section variant="white" padding="lg" container="lg">
                <SectionHeader
                    label="Ubicación"
                    title="Visítanos en el"
                    titleAccent="Studio"
                    description="Un espacio acogedor diseñado para que disfrutes de la experiencia completa."
                />
                <GoogleMap height={400} />
            </Section>

            {/* CTA */}
            <CTASection {...ctaPresets.fullExperience} />
        </div>
    );
}
