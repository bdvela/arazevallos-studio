'use client';

import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/shop/product-card";
import { ArrowRight, Sparkles, Clock, Heart, Truck, Palette, Star } from "lucide-react";
import { motion } from "framer-motion";
import {
    FadeInUp,
    ScaleIn,
    StaggerContainer,
    StaggerItem,
    HeroText,
    HeroImage,
    SlideInLeft,
    SlideInRight
} from "@/components/ui/motion";
import { TestimonialsSection } from "@/components/testimonials";
import { GallerySection } from "@/components/gallery";

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

interface HomeClientProps {
    products: any[];
}

export function HomeClient({ products }: HomeClientProps) {
    return (
        <div className="bg-[#FFFBFC] overflow-x-hidden">
            {/* Hero Section */}
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
                                    className="btn-primary inline-flex items-center justify-center gap-2 text-base"
                                >
                                    Reservar Cita
                                    <ArrowRight className="w-4 h-4" />
                                </motion.a>
                                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                    <Link
                                        href="/press-on"
                                        className="btn-secondary inline-flex items-center justify-center gap-2 text-base"
                                    >
                                        Conoce las Press-On
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </HeroText>

                        {/* Hero Image */}
                        <HeroImage className="relative">
                            <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-full">
                                {/* Pink border decoration */}
                                <motion.div
                                    animate={{ rotate: [0, 2, 0, -2, 0] }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -inset-4 bg-gradient-to-br from-[#F5B5C8] to-[#7EC8E3] rounded-3xl opacity-10 blur-lg"
                                />
                                <div className="relative h-full w-full rounded-3xl overflow-hidden">
                                    <Image
                                        src="/images/ara/ara-hero.png"
                                        alt="Ara Zevallos - Fundadora"
                                        fill
                                        className="object-cover object-top"
                                        priority
                                    />
                                </div>
                            </div>
                        </HeroImage>
                    </div>

                    {/* Benefits Bar */}
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

            {/* Services Section */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <FadeInUp className="text-center mb-16">
                        <span className="text-[#D4847C] text-sm font-medium uppercase tracking-wider">
                            Nuestros Servicios
                        </span>
                        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                            Servicios Premium en Huánuco
                        </h2>
                        <p className="mt-4 text-[#6B6B6B] max-w-2xl mx-auto">
                            Cada servicio es una experiencia única diseñada para realzar tu belleza natural
                        </p>
                    </FadeInUp>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service) => (
                            <StaggerItem key={service.title}>
                                <motion.div
                                    whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
                                    transition={{ duration: 0.3 }}
                                    className="group p-8 rounded-2xl bg-[#FFFBFC] border border-[#F5B5C8]/30 hover:border-[#D4847C]/50 transition-colors"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#F5B5C8] to-[#FDE8EE] flex items-center justify-center mb-6"
                                    >
                                        <service.icon className="w-7 h-7 text-[#D4847C]" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-[#3D3D3D] mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                                        {service.title}
                                    </h3>
                                    <p className="text-[#6B6B6B] text-sm leading-relaxed">
                                        {service.description}
                                    </p>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    <FadeInUp delay={0.3} className="text-center mt-12">
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                            <Link href="/services" className="btn-secondary inline-flex items-center gap-2">
                                Ver todos los servicios
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </FadeInUp>
                </div>
            </section>

            {/* Press-On Feature Section */}
            <section className="py-24 bg-gradient-to-br from-[#FDE8EE] via-white to-[#E8F4F8]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Image Grid */}
                        <SlideInLeft className="relative">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <ScaleIn className="aspect-square rounded-2xl overflow-hidden bg-[#F5B5C8]/20">
                                        <Image
                                            src="/images/ara/ara-products.jpg"
                                            alt="Productos Ara Zevallos"
                                            width={300}
                                            height={300}
                                            className="w-full h-full object-cover"
                                        />
                                    </ScaleIn>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 }}
                                        className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#D4847C] to-[#F5B5C8] flex items-center justify-center p-6"
                                    >
                                        <p className="text-white text-center font-medium">
                                            <span className="text-3xl font-bold block" style={{ fontFamily: 'var(--font-playfair), serif' }}>100%</span>
                                            Reutilizables
                                        </p>
                                    </motion.div>
                                </div>
                                <div className="space-y-4 pt-8">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 }}
                                        className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#7EC8E3] to-[#A8DCF0] flex items-center justify-center p-6"
                                    >
                                        <p className="text-white text-center font-medium">
                                            <span className="text-3xl font-bold block" style={{ fontFamily: 'var(--font-playfair), serif' }}>24/7</span>
                                            Lista en minutos
                                        </p>
                                    </motion.div>
                                    <ScaleIn delay={0.4} className="aspect-square rounded-2xl overflow-hidden bg-[#F5B5C8]/20">
                                        <Image
                                            src="/images/ara/tools.jpg"
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
                        <SlideInRight className="space-y-8">
                            <span className="inline-block py-2 px-4 rounded-full bg-[#7EC8E3]/20 text-[#3D3D3D] text-sm font-medium">
                                🚀 Nuevo Producto
                            </span>

                            <h2 className="text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                                Press-On Nails para quienes{" "}
                                <span className="text-[#D4847C]">valoran su tiempo</span>
                            </h2>

                            <p className="text-lg text-[#6B6B6B] leading-relaxed">
                                ¿No tienes tiempo de ir al salón? Nuestras uñas press-on son la solución perfecta.
                                Diseñadas a mano con calidad premium, listas para aplicar en minutos y reutilizables.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { icon: Clock, title: "Ahorra Tiempo", desc: "Aplicación en 10-15 minutos. Sin esperas en el salón." },
                                    { icon: Sparkles, title: "Reutilizables", desc: "Usa tus press-on múltiples veces con el cuidado adecuado." },
                                    { icon: Truck, title: "Envío Nacional", desc: "Recibe tus diseños en cualquier parte del Perú." },
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * index }}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-[#FDE8EE] flex items-center justify-center flex-shrink-0">
                                            <item.icon className="w-5 h-5 text-[#D4847C]" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-[#3D3D3D]">{item.title}</h4>
                                            <p className="text-sm text-[#6B6B6B]">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                    <Link href="/press-on" className="btn-primary inline-flex items-center justify-center gap-2">
                                        Descubre Press-On
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                    <Link href="/shop" className="btn-secondary inline-flex items-center justify-center gap-2">
                                        Ver Diseños
                                    </Link>
                                </motion.div>
                            </div>
                        </SlideInRight>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            {products.length > 0 && (
                <section className="py-24 bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <FadeInUp className="flex justify-between items-end mb-12">
                            <div>
                                <span className="text-[#D4847C] text-sm font-medium uppercase tracking-wider">
                                    Tienda Online
                                </span>
                                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                                    Diseños Destacados
                                </h2>
                            </div>
                            <motion.div whileHover={{ x: 5 }}>
                                <Link
                                    href="/shop"
                                    className="hidden md:flex items-center gap-2 text-[#D4847C] font-medium hover:text-[#E8A0B0] transition-colors"
                                >
                                    Ver todo
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        </FadeInUp>

                        <StaggerContainer className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
                            {products.map((product) => (
                                <StaggerItem key={product.id}>
                                    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                                        <ProductCard product={product} />
                                    </motion.div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>

                        <FadeInUp className="mt-12 text-center md:hidden">
                            <Link href="/shop" className="btn-secondary inline-flex items-center gap-2">
                                Ver todos los diseños
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </FadeInUp>
                    </div>
                </section>
            )}

            {/* About Ara Section */}
            <section className="py-24 bg-[#FFFBFC]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Image */}
                        <SlideInLeft className="relative order-2 lg:order-1">
                            <div className="relative aspect-[4/5] max-w-md mx-auto">
                                <motion.div
                                    animate={{ rotate: [0, 1, 0, -1, 0] }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -inset-4 bg-gradient-to-br from-[#F5B5C8] to-[#7EC8E3] rounded-3xl opacity-20"
                                />
                                <div className="relative h-full w-full rounded-3xl overflow-hidden">
                                    <Image
                                        src="/images/ara/ara-studio.jpg"
                                        alt="Ara Zevallos trabajando"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </SlideInLeft>

                        {/* Content */}
                        <SlideInRight className="space-y-6 order-1 lg:order-2">
                            <span className="text-[#D4847C] text-sm font-medium uppercase tracking-wider">
                                Sobre Nosotros
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                                Hola, soy{" "}
                                <span className="text-[#D4847C]">Araceli Zevallos</span>
                            </h2>
                            <p className="text-lg text-[#6B6B6B] leading-relaxed">
                                Fundadora de <strong>Ara Zevallos Studio</strong>, un espacio donde la belleza se encuentra con la creatividad.
                                Mi pasión por el arte del nail design y el maquillaje me ha llevado a crear experiencias
                                únicas para cada cliente.
                            </p>
                            <p className="text-[#6B6B6B] leading-relaxed">
                                Desde Huánuco, Perú, trabajamos para realzar tu belleza con estilo y elegancia.
                                Cada diseño es una obra de arte personalizada.
                            </p>
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                <Link href="/about" className="btn-secondary inline-flex items-center gap-2">
                                    Conoce mi historia
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        </SlideInRight>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <TestimonialsSection />

            {/* Gallery Section */}
            <GallerySection />

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-[#D4847C] to-[#E8A0B0]">
                <FadeInUp className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                        ¿Lista para brillar?
                    </h2>
                    <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                        Reserva tu cita y vive la experiencia premium que mereces. También puedes pedir tus Press-On Nails y recibirlas en casa.
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
                            Reservar por WhatsApp
                            <ArrowRight className="w-4 h-4" />
                        </motion.a>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                href="/shop"
                                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors"
                            >
                                Comprar Press-On
                            </Link>
                        </motion.div>
                    </div>
                </FadeInUp>
            </section>
        </div>
    );
}
