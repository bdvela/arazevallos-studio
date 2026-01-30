import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Instagram, MessageCircle, MapPin, Heart, Sparkles, Star } from "lucide-react";

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
        <div className="bg-[#FFFBFC]">
            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FDE8EE] via-[#FFFBFC] to-white" />
                <div className="absolute top-40 right-0 w-96 h-96 bg-[#7EC8E3]/20 rounded-full blur-3xl" />

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Image */}
                        <div className="relative order-2 lg:order-1">
                            <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-full">
                                <div className="absolute -inset-4 bg-gradient-to-br from-[#F5B5C8] to-[#7EC8E3] rounded-3xl opacity-30 blur-sm" />
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
                        </div>

                        {/* Content */}
                        <div className="space-y-6 order-1 lg:order-2">
                            <span className="text-[#D4847C] text-sm font-medium uppercase tracking-wider">
                                Mi Historia
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                                Hola, soy{" "}
                                <span className="text-[#D4847C] italic">Araceli Zevallos</span>
                            </h1>
                            <p className="text-lg text-[#6B6B6B] leading-relaxed">
                                Fundadora de Ara Zevallos Studio, un espacio donde la belleza se encuentra con la creatividad
                                y cada cliente es tratado como alguien especial.
                            </p>
                            <p className="text-[#6B6B6B] leading-relaxed">
                                Desde Huánuco, Perú, he construido este estudio con la misión de realzar la belleza
                                de cada mujer con estilo y elegancia. Mi pasión por el arte del nail design,
                                el maquillaje y el cuidado de la belleza me impulsa a ofrecer siempre lo mejor.
                            </p>
                            <p className="text-[#6B6B6B] leading-relaxed">
                                Cada servicio que brindo es una experiencia premium, porque creo que todas merecemos
                                sentirnos especiales y cuidadas.
                            </p>

                            {/* Social Links */}
                            <div className="flex items-center gap-4 pt-4">
                                <a
                                    href="https://instagram.com/arazevallos.studio"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-[#D4847C] hover:text-[#E8A0B0] transition-colors"
                                >
                                    <Instagram className="w-5 h-5" />
                                    <span className="font-medium">@arazevallos.studio</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-[#D4847C] text-sm font-medium uppercase tracking-wider">
                            Mis Valores
                        </span>
                        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                            Lo que me define
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value) => (
                            <div key={value.title} className="text-center p-8">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F5B5C8] to-[#FDE8EE] flex items-center justify-center mx-auto mb-6">
                                    <value.icon className="w-10 h-10 text-[#D4847C]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#3D3D3D] mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                                    {value.title}
                                </h3>
                                <p className="text-[#6B6B6B]">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Studio */}
            <section className="py-24 bg-[#FFFBFC]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <span className="text-[#D4847C] text-sm font-medium uppercase tracking-wider">
                                El Estudio
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
                                Ubicado en Huánuco, Perú, el estudio está equipado con los mejores productos
                                y herramientas profesionales para garantizar resultados excepcionales.
                            </p>

                            <div className="flex items-center gap-2 text-[#6B6B6B]">
                                <MapPin className="w-5 h-5 text-[#D4847C]" />
                                <span>Huánuco, Perú</span>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                                <Image
                                    src="/images/ara/local_photo_2.jpg"
                                    alt="Ara Zevallos Studio"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-[#D4847C] to-[#E8A0B0]">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                        ¿Lista para vivir la experiencia?
                    </h2>
                    <p className="text-white/90 text-lg mb-8">
                        Agenda tu cita o pide tus Press-On Nails con envío a todo el Perú
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://wa.link/b5c2z6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-white text-[#D4847C] px-8 py-4 rounded-full font-semibold hover:bg-[#FFFBFC] transition-colors"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Reservar Cita
                        </a>
                        <Link
                            href="/shop"
                            className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors"
                        >
                            Comprar Press-On
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
