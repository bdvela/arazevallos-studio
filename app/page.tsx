import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/shop/product-card";
import { ArrowRight, Sparkles, Clock, Heart, Truck, Palette, Star, Footprints } from "lucide-react";

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

export default async function Home() {
  let products: any[] = [];
  try {
    products = (await getProducts({})).slice(0, 4);
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div className="bg-[#FFFBFC]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FDE8EE] via-[#FFFBFC] to-[#E8F4F8]" />

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#F5B5C8]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#7EC8E3]/20 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left space-y-8">
              <span className="inline-block py-2 px-4 rounded-full bg-white/80 border border-[#F5B5C8] text-[#D4847C] text-sm font-medium">
                ✨ Experiencia Premium en Huánuco
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3D3D3D] leading-tight" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Realzamos tu belleza con{" "}
                <span className="text-[#D4847C] italic">estilo y elegancia</span>
              </h1>

              <p className="text-lg text-[#6B6B6B] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Uñas, maquillaje, pestañas y cejas. Cada detalle cuenta para hacerte brillar.
                Ahora con <strong>Press-On Nails</strong> con envío a todo el Perú.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="https://wa.link/b5c2z6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-2 text-base"
                >
                  Reservar Cita
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/press-on"
                  className="btn-secondary inline-flex items-center justify-center gap-2 text-base"
                >
                  Conoce las Press-On
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-full">
                {/* Pink border decoration */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[#F5B5C8] to-[#7EC8E3] rounded-3xl opacity-10 blur-lg" />
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
            </div>
          </div>

          {/* Benefits Bar */}
          <div className="">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-white/50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F5B5C8] to-[#FDE8EE] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-[#D4847C]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#3D3D3D] text-sm">Relajación</h4>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">Cuida tu cuerpo y mente</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E8D8F0] to-[#F5D0C5] flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-[#B47C9B]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#3D3D3D] text-sm">Satisfacción</h4>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">Alcanza tu máxima belleza</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7EC8E3]/30 to-[#A8DCF0] flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-[#5BA8C8]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#3D3D3D] text-sm">Calidad</h4>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">Productos premium</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F5D0C5] to-[#FDE8EE] flex items-center justify-center flex-shrink-0">
                    <Truck className="w-6 h-6 text-[#D4847C]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#3D3D3D] text-sm">Envío</h4>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">Press-On a todo Perú</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      < section className="py-24 bg-white" >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#D4847C] text-sm font-medium uppercase tracking-wider">
              Nuestros Servicios
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Servicios Premium en Huánuco
            </h2>
            <p className="mt-4 text-[#6B6B6B] max-w-2xl mx-auto">
              Cada servicio es una experiencia única diseñada para realzar tu belleza natural
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="group p-8 rounded-2xl bg-[#FFFBFC] border border-[#F5B5C8]/30 hover:border-[#D4847C]/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#F5B5C8] to-[#FDE8EE] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-[#D4847C]" />
                </div>
                <h3 className="text-xl font-bold text-[#3D3D3D] mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  {service.title}
                </h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-secondary inline-flex items-center gap-2">
              Ver todos los servicios
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section >

      {/* Press-On Feature Section */}
      < section className="py-24 bg-gradient-to-br from-[#FDE8EE] via-white to-[#E8F4F8]" >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-[#F5B5C8]/20">
                    <Image
                      src="/images/ara/ara-products.jpg"
                      alt="Productos Ara Zevallos"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#D4847C] to-[#F5B5C8] flex items-center justify-center p-6">
                    <p className="text-white text-center font-medium">
                      <span className="text-3xl font-bold block" style={{ fontFamily: 'var(--font-playfair), serif' }}>100%</span>
                      Reutilizables
                    </p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#7EC8E3] to-[#A8DCF0] flex items-center justify-center p-6">
                    <p className="text-white text-center font-medium">
                      <span className="text-3xl font-bold block" style={{ fontFamily: 'var(--font-playfair), serif' }}>24/7</span>
                      Lista en minutos
                    </p>
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden bg-[#F5B5C8]/20">
                    <Image
                      src="/images/ara/tools.jpg"
                      alt="Ara en su estudio"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
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
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FDE8EE] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#D4847C]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#3D3D3D]">Ahorra Tiempo</h4>
                    <p className="text-sm text-[#6B6B6B]">Aplicación en 10-15 minutos. Sin esperas en el salón.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FDE8EE] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-[#D4847C]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#3D3D3D]">Reutilizables</h4>
                    <p className="text-sm text-[#6B6B6B]">Usa tus press-on múltiples veces con el cuidado adecuado.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FDE8EE] flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5 text-[#D4847C]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#3D3D3D]">Envío Nacional</h4>
                    <p className="text-sm text-[#6B6B6B]">Recibe tus diseños en cualquier parte del Perú.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/press-on" className="btn-primary inline-flex items-center justify-center gap-2">
                  Descubre Press-On
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/shop" className="btn-secondary inline-flex items-center justify-center gap-2">
                  Ver Diseños
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Featured Products */}
      {
        products.length > 0 && (
          <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <span className="text-[#D4847C] text-sm font-medium uppercase tracking-wider">
                    Tienda Online
                  </span>
                  <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                    Diseños Destacados
                  </h2>
                </div>
                <Link
                  href="/shop"
                  className="hidden md:flex items-center gap-2 text-[#D4847C] font-medium hover:text-[#E8A0B0] transition-colors"
                >
                  Ver todo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="mt-12 text-center md:hidden">
                <Link href="/shop" className="btn-secondary inline-flex items-center gap-2">
                  Ver todos los diseños
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )
      }

      {/* About Ara Section */}
      <section className="py-24 bg-[#FFFBFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/5] max-w-md mx-auto">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#F5B5C8] to-[#7EC8E3] rounded-3xl opacity-20" />
                <div className="relative h-full w-full rounded-3xl overflow-hidden">
                  <Image
                    src="/images/ara/ara-studio.jpg"
                    alt="Ara Zevallos trabajando"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 order-1 lg:order-2">
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
              <Link href="/about" className="btn-secondary inline-flex items-center gap-2">
                Conoce mi historia
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#D4847C] to-[#E8A0B0]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            ¿Lista para brillar?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Reserva tu cita y vive la experiencia premium que mereces. También puedes pedir tus Press-On Nails y recibirlas en casa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.link/b5c2z6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#D4847C] px-8 py-4 rounded-full font-semibold hover:bg-[#FFFBFC] transition-colors"
            >
              Reservar por WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              Comprar Press-On
            </Link>
          </div>
        </div>
      </section>
    </div >
  );
}
