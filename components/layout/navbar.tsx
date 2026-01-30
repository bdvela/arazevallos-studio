'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Menu, X, Instagram, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/services', label: 'Servicios' },
    { href: '/press-on', label: 'Press-On' },
    { href: '/shop', label: 'Tienda' },
    { href: '/about', label: 'Sobre Ara' },
];

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#F5B5C8]/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <Image
                            src="/images/logo.png"
                            alt="Ara Zevallos Studio"
                            width={180}
                            height={60}
                            className="h-12 w-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-[#3D3D3D] hover:text-[#D4847C] transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side - CTA + Cart + Social */}
                    <div className="flex items-center gap-3">
                        {/* Social Icons - Desktop */}
                        <div className="hidden md:flex items-center gap-2">
                            <a
                                href="https://instagram.com/arazevallos.studio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-[#6B6B6B] hover:text-[#D4847C] transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://wa.link/b5c2z6"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-[#6B6B6B] hover:text-[#25D366] transition-colors"
                                aria-label="WhatsApp"
                            >
                                <MessageCircle className="w-5 h-5" />
                            </a>
                        </div>

                        {/* Cart */}
                        <Link
                            href="/cart"
                            className="relative p-2 text-[#6B6B6B] hover:text-[#D4847C] transition-colors"
                        >
                            <ShoppingBag className="w-5 h-5" />
                        </Link>

                        {/* CTA - Desktop */}
                        <a
                            href="https://wa.link/b5c2z6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:inline-flex btn-primary text-sm"
                        >
                            Reservar Cita
                        </a>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 text-[#3D3D3D]"
                            aria-label="Menu"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white border-t border-[#F5B5C8]/30">
                    <div className="px-4 py-6 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block py-2 text-lg font-medium text-[#3D3D3D] hover:text-[#D4847C]"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-[#F5B5C8]/30">
                            <a
                                href="https://wa.link/b5c2z6"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full text-center btn-primary"
                            >
                                Reservar Cita
                            </a>
                        </div>
                        <div className="flex justify-center gap-6 pt-4">
                            <a
                                href="https://instagram.com/arazevallos.studio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#6B6B6B] hover:text-[#D4847C]"
                            >
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a
                                href="https://wa.link/b5c2z6"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#6B6B6B] hover:text-[#25D366]"
                            >
                                <MessageCircle className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
