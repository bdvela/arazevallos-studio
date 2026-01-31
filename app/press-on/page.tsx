'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Sparkles, Truck, Heart, Check, Palette, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { FadeInUp, ScaleIn, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { FAQSection } from "@/components/faq";

const benefits = [
    {
        icon: Clock,
        title: "Ahorra Tiempo",
        description: "Aplicación en solo 10-15 minutos. Sin citas, sin esperas. Perfectas para profesionales ocupadas.",
    },
    {
        icon: Sparkles,
        title: "Reutilizables",
        description: "Con el cuidado adecuado, puedes usar tus press-on múltiples veces. Más valor por tu dinero.",
    },
    {
        icon: Shield,
        title: "Cero Daño",
        description: "No dañan tus uñas naturales. Sin limas agresivas ni químicos fuertes.",
    },
    {
        icon: Palette,
        title: "Diseños Únicos",
        description: "Cada set es diseñado a mano por Ara. Arte en miniatura para tus dedos.",
    },
    {
        icon: Truck,
        title: "Envío Nacional",
        description: "Recibe tus press-on en cualquier parte del Perú. Empaque seguro y discreto.",
    },
    {
        icon: Heart,
        title: "Calidad Premium",
        description: "Los mismos materiales y técnicas que usamos en el salón. Acabado profesional garantizado.",
    },
];

const steps = [
    {
        number: "01",
        title: "Elige tu diseño",
        description: "Explora nuestra colección y encuentra el set perfecto para ti.",
    },
    {
        number: "02",
        title: "Medimos tu talla",
        description: "Sube una foto de tu mano con una moneda de referencia para calcular tu talla exacta.",
    },
    {
        number: "03",
        title: "Recibe y aplica",
        description: "Recibes tu kit completo con instrucciones. Lista en minutos.",
    },
];

export default function PressOnPage() {
    return (
        <div className="bg-[#FFFBFC] overflow-x-hidden">
            {/* Hero */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FDE8EE] via-[#FFFBFC] to-[#E8F4F8]" />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.4, 0.3]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 right-10 w-72 h-72 bg-[#7EC8E3]/30 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.3, 0.4, 0.3]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-20 left-10 w-96 h-96 bg-[#F5B5C8]/30 rounded-full blur-3xl"
                />

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-block py-2 px-4 rounded-full bg-[#7EC8E3]/20 text-[#3D3D3D] text-sm font-medium"
                            >
                                🚀 Nuevo Producto
                            </motion.span>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3D3D3D] leading-tight"
                                style={{ fontFamily: 'var(--font-playfair), serif' }}
                            >
                                Press-On Nails: Look de salón {" "}
                                <span className="text-[#D4847C] italic">sin salir de casa</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-xl text-[#6B6B6B] leading-relaxed"
                            >
                                ¿Tu agenda no te permite ir al salón? Nuestras uñas press-on te dan el look profesional
                                que mereces, listas en minutos, sin salir de casa.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                    <Link href="/shop" className="btn-primary inline-flex items-center justify-center gap-2 text-lg px-8 py-4">
                                        Ver Diseños
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </motion.div>
                                <motion.a
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    href="#como-funciona"
                                    className="btn-secondary inline-flex items-center justify-center gap-2 text-lg"
                                >
                                    ¿Cómo Funciona?
                                </motion.a>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative aspect-square max-w-lg mx-auto">
                                <motion.div
                                    animate={{ rotate: [0, 2, 0, -2, 0] }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -inset-4 bg-gradient-to-br from-[#D4847C] to-[#7EC8E3] rounded-3xl opacity-20 blur-xl"
                                />
                                <div className="relative h-full w-full rounded-3xl overflow-hidden bg-white shadow-2xl">
                                    <Image
                                        src="/images/ara/press-on.png"
                                        alt="Press-On Nails de Ara Zevallos"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Problem/Solution - Chat Bubble Style */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <FadeInUp className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                            ¿Te suena familiar?
                        </h2>
                    </FadeInUp>

                    {/* Chat Bubbles Container */}
                    <div className="space-y-6">
                        {[
                            { text: "Quiero uñas bonitas pero no tengo 2-3 horas para ir al salón...", align: "left", emoji: "😩" },
                            { text: "Cuando finalmente tengo tiempo, no hay citas disponibles...", align: "right", emoji: "😔" },
                            { text: "Me preocupa dañar mis uñas naturales...", align: "left", emoji: "😟" },
                            { text: "No vivo en una ciudad grande con buenos salones...", align: "right", emoji: "🥺" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: item.align === 'left' ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.15, duration: 0.4 }}
                                viewport={{ once: true }}
                                className={`flex items-end gap-3 ${item.align === 'right' ? 'flex-row-reverse' : ''}`}
                            >
                                {/* Avatar */}
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F5B5C8] to-[#FDE8EE] flex items-center justify-center text-lg flex-shrink-0 shadow-sm"
                                >
                                    {item.emoji}
                                </motion.div>

                                {/* Chat Bubble */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className={`relative max-w-[80%] p-4 rounded-2xl shadow-sm ${item.align === 'left'
                                        ? 'bg-gray-100 rounded-bl-md'
                                        : 'bg-[#FDE8EE] rounded-br-md'
                                        }`}
                                >
                                    <p className="text-[#6B6B6B] italic text-sm md:text-base">"{item.text}"</p>

                                    {/* Bubble tail */}
                                    <div className={`absolute bottom-0 w-3 h-3 ${item.align === 'left'
                                        ? '-left-1 bg-gray-100'
                                        : '-right-1 bg-[#FDE8EE]'
                                        }`} style={{
                                            clipPath: item.align === 'left'
                                                ? 'polygon(100% 0, 100% 100%, 0 100%)'
                                                : 'polygon(0 0, 100% 100%, 0 100%)'
                                        }} />
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Solution Response */}
                    <FadeInUp delay={0.5} className="mt-12">
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            className="relative p-6 md:p-8 bg-gradient-to-br from-[#D4847C] to-[#E8A0B0] rounded-3xl shadow-lg"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                    <span className="text-2xl">✨</span>
                                </div>
                                <span className="text-white font-semibold">Ara Zevallos Studio</span>
                            </div>
                            <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
                                Las <span className="font-bold">Press-On Nails</span> son la solución perfecta.
                                Calidad de salón, en tus manos, cuando tú quieras. 💅
                            </p>
                        </motion.div>
                    </FadeInUp>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-24 bg-[#FFFBFC]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <FadeInUp className="text-center mb-16">
                        <span className="text-[#D4847C] text-sm font-medium uppercase tracking-wider">
                            Ventajas
                        </span>
                        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                            ¿Por qué Press-On?
                        </h2>
                    </FadeInUp>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit) => (
                            <StaggerItem key={benefit.title}>
                                <motion.div
                                    whileHover={{ y: -5, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)" }}
                                    className="flex gap-4 p-6 bg-white rounded-2xl border border-[#F5B5C8]/30"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F5B5C8] to-[#FDE8EE] flex items-center justify-center flex-shrink-0"
                                    >
                                        <benefit.icon className="w-6 h-6 text-[#D4847C]" />
                                    </motion.div>
                                    <div>
                                        <h3 className="font-bold text-[#3D3D3D] mb-2">{benefit.title}</h3>
                                        <p className="text-sm text-[#6B6B6B] leading-relaxed">{benefit.description}</p>
                                    </div>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* How it Works */}
            <section id="como-funciona" className="py-24 bg-white scroll-mt-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <FadeInUp className="text-center mb-16">
                        <span className="text-[#D4847C] text-sm font-medium uppercase tracking-wider">
                            Proceso Simple
                        </span>
                        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                            ¿Cómo Funciona?
                        </h2>
                    </FadeInUp>

                    <div className="grid md:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative text-center"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4847C] to-[#E8A0B0] flex items-center justify-center mx-auto mb-6"
                                >
                                    <span className="text-2xl font-bold text-white">{step.number}</span>
                                </motion.div>
                                <h3 className="text-xl font-bold text-[#3D3D3D] mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                                    {step.title}
                                </h3>
                                <p className="text-[#6B6B6B]">{step.description}</p>

                                {index < steps.length - 1 && (
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                                        className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#F5B5C8] to-transparent origin-left"
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section className="py-24 bg-gradient-to-br from-[#FDE8EE] via-white to-[#E8F4F8]">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <FadeInUp className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                            ¿Qué incluye tu kit?
                        </h2>
                    </FadeInUp>

                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* Kit Image */}
                        <SlideInLeft>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
                            >
                                <Image
                                    src="/images/ara/kit-press-on.png"
                                    alt="Kit completo de Press-On Nails"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </motion.div>
                        </SlideInLeft>

                        {/* List */}
                        <SlideInRight>
                            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-[#F5B5C8]/30">
                                <h3 className="text-xl font-bold text-[#3D3D3D] mb-6">Todo lo que necesitas:</h3>
                                <div className="space-y-4">
                                    {[
                                        "Set de 10 uñas en tu talla personalizada",
                                        "Pegamento profesional de alta duración",
                                        "Lima para preparación",
                                        "Palito de naranjo",
                                        "Instrucciones de aplicación y cuidado",
                                        "Tips para mayor duración",
                                        "Estuche de almacenamiento",
                                        "Soporte post-venta por WhatsApp",
                                    ].map((item, index) => (
                                        <motion.div
                                            key={item}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.05 }}
                                            className="flex items-center gap-3"
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.2 }}
                                                className="w-6 h-6 rounded-full bg-[#D4847C] flex items-center justify-center flex-shrink-0"
                                            >
                                                <Check className="w-4 h-4 text-white" />
                                            </motion.div>
                                            <span className="text-[#3D3D3D]">{item}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </SlideInRight>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQSection />

            {/* CTA */}
            <section className="py-24 bg-gradient-to-r from-[#D4847C] to-[#E8A0B0]">
                <FadeInUp className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                        ¿Lista para tener uñas perfectas sin salir de casa?
                    </h2>
                    <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                        Explora nuestra colección de diseños y encuentra tu match perfecto.
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 bg-white text-[#D4847C] px-10 py-5 rounded-full font-semibold hover:bg-[#FFFBFC] transition-colors text-lg"
                        >
                            Ver Diseños Disponibles
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </FadeInUp>
            </section>
        </div>
    );
}
