'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Menu, X, Instagram, MessageCircle, Fullscreen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCartTotalQuantity } from '@/lib/shopify/actions';
import { CartNotification } from '@/components/ui/cart-notification';

const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/services', label: 'Servicios' },
    { href: '/press-on', label: 'Press-On', featured: true },
    { href: '/shop', label: 'Tienda' },
    { href: '/about', label: 'Sobre Ara' },
];

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    const updateCartCount = async () => {
        const count = await getCartTotalQuantity();
        setCartCount(count);
    };

    useEffect(() => {
        updateCartCount();
        window.addEventListener('cart-updated', updateCartCount);
        return () => window.removeEventListener('cart-updated', updateCartCount);
    }, []);

    // Detect scroll for navbar background change
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-[#F5B5C8]/20'
                : 'bg-white/95 backdrop-blur-md border-b border-[#F5B5C8]/30'
                }`}
        >
            <CartNotification />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Image
                                src="/images/logo.png"
                                alt="Ara Zevallos Studio"
                                width={100}
                                height={100}
                                className="h-10 w-auto"
                                priority
                            />
                        </motion.div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index, duration: 0.3 }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="relative text-sm font-medium text-[#3D3D3D] hover:text-[#D4847C] transition-colors group"
                                >
                                    {link.label}
                                    {link.featured && (
                                        <span className="absolute -top-2 -right-8 px-1.5 py-0.5 bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] text-white text-[9px] font-bold rounded-full animate-pulse">
                                            NEW
                                        </span>
                                    )}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4847C] transition-all duration-300 group-hover:w-full" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Side - CTA + Cart + Social */}
                    <div className="flex items-center gap-3">
                        {/* Social Icons - Desktop */}
                        <div className="hidden md:flex items-center gap-2">
                            <motion.a
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://instagram.com/arazevallos.studio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-[#6B6B6B] hover:text-[#D4847C] transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </motion.a>
                        </div>

                        {/* Cart */}
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                href="/cart"
                                className="p-2 text-[#6B6B6B] hover:text-[#D4847C] transition-colors"
                            >
                                <div className="relative">
                                    <ShoppingBag className="w-5 h-5" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1.5 -right-1.5 bg-[#D4847C] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                                            {cartCount}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        </motion.div>

                        {/* CTA - Desktop */}
                        <motion.a
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            href="https://wa.link/b5c2z6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:inline-flex btn-primary text-sm"
                        >
                            Reservar Cita
                        </motion.a>

                        {/* Mobile Menu Button */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 text-[#3D3D3D]"
                            aria-label="Menu"
                        >
                            <AnimatePresence mode="wait">
                                {isMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X className="w-6 h-6" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu className="w-6 h-6" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-[#F5B5C8]/30 overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-2">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 * index }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="relative inline-flex items-center gap-2 py-3 text-lg font-medium text-[#3D3D3D] hover:text-[#D4847C] hover:pl-2 transition-all"
                                    >
                                        {link.label}
                                        {link.featured && (
                                            <span className="px-2 py-0.5 bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] text-white text-[10px] font-bold rounded-full animate-pulse">
                                                NEW
                                            </span>
                                        )}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="pt-4 border-t border-[#F5B5C8]/30"
                            >
                                <a
                                    href="https://wa.link/b5c2z6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center btn-primary"
                                >
                                    Reservar Cita
                                </a>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="flex justify-center gap-6 pt-4"
                            >
                                <a
                                    href="https://instagram.com/arazevallos.studio"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#6B6B6B] hover:text-[#D4847C] transition-colors"
                                >
                                    <Instagram className="w-6 h-6" />
                                </a>
                                <a
                                    href="https://wa.link/b5c2z6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#6B6B6B] hover:text-[#25D366] transition-colors"
                                >
                                    <MessageCircle className="w-6 h-6" />
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
