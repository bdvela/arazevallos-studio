import Link from 'next/link';
import Image from 'next/image';
import { Instagram, MessageCircle, MapPin } from 'lucide-react';

const footerLinks = {
    navegacion: [
        { href: '/', label: 'Inicio' },
        { href: '/services', label: 'Servicios' },
        { href: '/press-on', label: 'Press-On' },
        { href: '/shop', label: 'Tienda' },
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
        <footer className="bg-[#3D3D3D] text-white">
            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Image
                            src="/images/logo.png"
                            alt="Ara Zevallos Studio"
                            width={160}
                            height={50}
                            className="h-10 w-auto brightness-0 invert mb-4"
                        />
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Realzamos tu belleza con estilo y elegancia. Experiencia premium en cada servicio.
                        </p>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <MapPin className="w-4 h-4 text-[#D4847C]" />
                            <span>Huánuco, Perú</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-sm font-semibold mb-4 text-[#F5B5C8] uppercase tracking-wider">
                            Navegación
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.navegacion.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-sm font-semibold mb-4 text-[#F5B5C8] uppercase tracking-wider">
                            Servicios
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.servicios.map((service) => (
                                <li key={service.label} className="text-gray-400 text-sm">
                                    {service.label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h3 className="text-sm font-semibold mb-4 text-[#F5B5C8] uppercase tracking-wider">
                            Contacto
                        </h3>
                        <div className="space-y-4">
                            <a
                                href="https://wa.link/b5c2z6"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-gray-400 hover:text-[#25D366] transition-colors text-sm"
                            >
                                <MessageCircle className="w-5 h-5" />
                                <span>WhatsApp</span>
                            </a>
                            <a
                                href="https://instagram.com/arazevallos.studio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-gray-400 hover:text-[#E1306C] transition-colors text-sm"
                            >
                                <Instagram className="w-5 h-5" />
                                <span>@arazevallos.studio</span>
                            </a>
                        </div>

                        <div className="mt-8">
                            <a
                                href="https://wa.link/b5c2z6"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex btn-primary text-sm"
                            >
                                Reservar Cita
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                    <p className="text-center text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} Ara Zevallos Studio. Todos los derechos reservados.
                    </p>
                    <p className="text-center text-xs text-gray-500 hover:text-[#25D366] transition-colors">Desarrollado por <a href="https://bdvela.github.io" target="_blank" rel="noopener noreferrer">@bdvela</a></p>
                </div>
            </div>
        </footer>
    );
}
