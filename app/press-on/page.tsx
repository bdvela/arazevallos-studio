import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Sparkles, Truck, Heart, Check, Palette, Shield } from "lucide-react";

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
        <div className="bg-[#FFFBFC]">
            {/* Hero */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FDE8EE] via-[#FFFBFC] to-[#E8F4F8]" />
                <div className="absolute top-20 right-10 w-72 h-72 bg-[#7EC8E3]/30 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#F5B5C8]/30 rounded-full blur-3xl" />

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <span className="inline-block py-2 px-4 rounded-full bg-[#7EC8E3]/20 text-[#3D3D3D] text-sm font-medium">
                                🚀 Nuevo Producto
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3D3D3D] leading-tight" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                                Press-On Nails para mujeres que{" "}
                                <span className="text-[#D4847C] italic">valoran su tiempo</span>
                            </h1>

                            <p className="text-xl text-[#6B6B6B] leading-relaxed">
                                ¿Tu agenda no te permite ir al salón? Nuestras uñas press-on te dan el look profesional
                                que mereces, lista en minutos, sin salir de casa.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/shop" className="btn-primary inline-flex items-center justify-center gap-2 text-lg px-8 py-4">
                                    Ver Diseños
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <a href="#como-funciona" className="btn-secondary inline-flex items-center justify-center gap-2 text-lg">
                                    ¿Cómo Funciona?
                                </a>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative aspect-square max-w-lg mx-auto">
                                <div className="absolute -inset-4 bg-gradient-to-br from-[#D4847C] to-[#7EC8E3] rounded-3xl opacity-20 blur-xl" />
                                <div className="relative h-full w-full rounded-3xl overflow-hidden bg-white shadow-2xl">
                                    <Image
                                        src="/images/ara/ara-products.jpg"
                                        alt="Press-On Nails de Ara Zevallos"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem/Solution */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#3D3D3D] mb-8" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                        ¿Te suena familiar?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 text-left mb-12">
                        <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                            <p className="text-[#6B6B6B] italic">"Quiero uñas bonitas pero no tengo 2-3 horas para ir al salón..."</p>
                        </div>
                        <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                            <p className="text-[#6B6B6B] italic">"Cuando finalmente tengo tiempo, no hay citas disponibles..."</p>
                        </div>
                        <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                            <p className="text-[#6B6B6B] italic">"Me preocupa dañar mis uñas naturales..."</p>
                        </div>
                        <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                            <p className="text-[#6B6B6B] italic">"No vivo en una ciudad grande con buenos salones..."</p>
                        </div>
                    </div>
                    <div className="p-8 bg-gradient-to-br from-[#FDE8EE] to-white rounded-3xl border border-[#F5B5C8]">
                        <p className="text-xl text-[#3D3D3D] font-medium">
                            Las <span className="text-[#D4847C] font-bold">Press-On Nails</span> de Ara Zevallos Studio
                            son la solución perfecta. Calidad de salón, en tus manos, cuando tú quieras.
                        </p>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-24 bg-[#FFFBFC]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-[#D4847C] text-sm font-medium uppercase tracking-wider">
                            Ventajas
                        </span>
                        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                            ¿Por qué Press-On?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit) => (
                            <div key={benefit.title} className="flex gap-4 p-6 bg-white rounded-2xl border border-[#F5B5C8]/30">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F5B5C8] to-[#FDE8EE] flex items-center justify-center flex-shrink-0">
                                    <benefit.icon className="w-6 h-6 text-[#D4847C]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#3D3D3D] mb-2">{benefit.title}</h3>
                                    <p className="text-sm text-[#6B6B6B] leading-relaxed">{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section id="como-funciona" className="py-24 bg-white scroll-mt-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-[#D4847C] text-sm font-medium uppercase tracking-wider">
                            Proceso Simple
                        </span>
                        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                            ¿Cómo Funciona?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <div key={step.number} className="relative text-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4847C] to-[#E8A0B0] flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl font-bold text-white">{step.number}</span>
                                </div>
                                <h3 className="text-xl font-bold text-[#3D3D3D] mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                                    {step.title}
                                </h3>
                                <p className="text-[#6B6B6B]">{step.description}</p>

                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#F5B5C8] to-transparent" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section className="py-24 bg-gradient-to-br from-[#FDE8EE] via-white to-[#E8F4F8]">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                            ¿Qué incluye tu kit?
                        </h2>
                    </div>

                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#F5B5C8]/30">
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                "Set de 10 uñas en tu talla personalizada",
                                "Pegamento profesional de alta duración",
                                "Lima para preparación",
                                "Palito de naranjo",
                                "Instrucciones de aplicación y cuidado",
                                "Tips para mayor duración",
                                "Estuche de almacenamiento",
                                "Soporte post-venta por WhatsApp",
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#D4847C] flex items-center justify-center flex-shrink-0">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-[#3D3D3D]">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-gradient-to-r from-[#D4847C] to-[#E8A0B0]">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                        ¿Lista para tener uñas perfectas sin salir de casa?
                    </h2>
                    <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                        Explora nuestra colección de diseños y encuentra tu match perfecto.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 bg-white text-[#D4847C] px-10 py-5 rounded-full font-semibold hover:bg-[#FFFBFC] transition-colors text-lg"
                    >
                        Ver Diseños Disponibles
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
