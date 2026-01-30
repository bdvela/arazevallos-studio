'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, MessageCircle, MapPin, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinks = {
    navegacion: [
        { href: '/', label: 'Inicio' },
        { href: '/services', label: 'Servicios' },
        { href: '/press-on', label: 'Press-On' },
        { href: '/shop', label: 'Tienda' },
        { href: '/about', label: 'Sobre Ara' },
    ],
    servicios: [
        { label: 'Uñas Acrílicas' },
        { label: 'Maquillaje' },
        { label: 'Pestañas' },
        { label: 'Cejas' },
        { label: 'Pedicure' },
    ],
};

export function Footer() {
    return (
        <footer className="relative bg-gradient-to-br from-[#3D3D3D] via-[#2D2D2D] to-[#1D1D1D] text-white overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4847C]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#7EC8E3]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            {/* Main Footer */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Image
                                src="/images/logo.png"
                                alt="Ara Zevallos Studio"
                                width={100}
                                height={100}
                                className="h-10 w-auto brightness-0 invert mb-6"
                            />
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                Realzamos tu belleza con estilo y elegancia. Experiencia premium en cada servicio.
                            </p>
                            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                                <MapPin className="w-4 h-4 text-[#F5B5C8]" />
                                <span>Huánuco, Perú</span>
                            </div>

                            {/* Social Icons */}
                            <div className="flex items-center gap-3 mt-6">
                                <motion.a
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    href="https://instagram.com/arazevallos.studio"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#F77737] transition-all"
                                >
                                    <Instagram className="w-5 h-5" />
                                </motion.a>
                                <motion.a
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    href="https://wa.link/b5c2z6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-all"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Navigation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className="text-sm font-semibold mb-6 text-white uppercase tracking-wider flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-gradient-to-r from-[#F5B5C8] to-transparent" />
                            Navegación
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.navegacion.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-[#F5B5C8] transition-colors text-sm inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-[#F5B5C8] transition-all duration-300" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-sm font-semibold mb-6 text-white uppercase tracking-wider flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-gradient-to-r from-[#F5B5C8] to-transparent" />
                            Servicios
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.servicios.map((service) => (
                                <li key={service.label} className="text-gray-400 text-sm flex items-center gap-2">
                                    <Sparkles className="w-3 h-3 text-[#F5B5C8]/50" />
                                    {service.label}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* CTA Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="text-sm font-semibold mb-6 text-white uppercase tracking-wider flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-gradient-to-r from-[#F5B5C8] to-transparent" />
                            Agenda tu cita
                        </h3>
                        <p className="text-gray-400 text-sm mb-6">
                            ¿Lista para brillar? Reserva tu cita por WhatsApp y vive la experiencia premium.
                        </p>
                        <motion.a
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            href="https://wa.link/b5c2z6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] text-white px-6 py-3 rounded-full font-medium text-sm hover:shadow-lg hover:shadow-[#D4847C]/20 transition-all"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Reservar Cita
                        </motion.a>

                        <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
                            <p className="text-xs text-gray-400 flex items-center gap-2">
                                <Heart className="w-4 h-4 text-[#F5B5C8]" />
                                <span>Hecho con amor en Huánuco, Perú</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative z-10 border-t border-white/10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-gray-500">
                            &copy; {new Date().getFullYear()} Ara Zevallos Studio. Todos los derechos reservados.
                        </p>
                        <p className="text-xs text-gray-500">
                            Desarrollado con <span className="text-[#F5B5C8]">♥</span> por{' '}
                            <a
                                href="https://bdvela.github.io"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-[#F5B5C8] transition-colors"
                            >
                                @bdvela
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
