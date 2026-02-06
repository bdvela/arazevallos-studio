'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FadeInUp } from '@/components/ui/motion';

/**
 * ============================================
 * CTA SECTION COMPONENT
 * ============================================
 * 
 * Componente reutilizable para Call-to-Action.
 * Reemplaza las secciones CTA duplicadas en múltiples páginas.
 * Mobile-first design.
 */

interface CTAAction {
    label: string;
    href: string;
    icon?: ReactNode;
    variant: 'primary' | 'secondary';
    external?: boolean;
}

interface CTASectionProps {
    title: string;
    subtitle?: string;
    primaryAction: CTAAction;
    secondaryAction?: CTAAction;
    className?: string;
}

export function CTASection({
    title,
    subtitle,
    primaryAction,
    secondaryAction,
    className,
}: CTASectionProps) {
    return (
        <section className={cn(
            'py-16 md:py-20 bg-gradient-to-r from-[#D4847C] to-[#E8A0B0]',
            className
        )}>
            <FadeInUp className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                <h2
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6"
                    style={{ fontFamily: 'var(--font-playfair), serif' }}
                >
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-white/90 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                )}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <CTAButton {...primaryAction} />
                    {secondaryAction && <CTAButton {...secondaryAction} />}
                </div>
            </FadeInUp>
        </section>
    );
}

function CTAButton({ label, href, icon, variant, external }: CTAAction) {
    const baseClasses = cn(
        'inline-flex items-center justify-center gap-2',
        'px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold',
        'transition-all duration-200',
        'min-h-[44px]', // Touch-friendly
        'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#D4847C]'
    );

    const variantClasses = {
        primary: 'bg-white text-[#D4847C] hover:bg-[#FFFBFC] hover:shadow-lg',
        secondary: 'bg-transparent border-2 border-white text-white hover:bg-white/10',
    };

    const content = (
        <>
            {icon}
            {label}
            {variant === 'secondary' && !icon && <ArrowRight className="w-4 h-4" />}
        </>
    );

    if (external) {
        return (
            <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(baseClasses, variantClasses[variant])}
            >
                {content}
            </motion.a>
        );
    }

    return (
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link href={href} className={cn(baseClasses, variantClasses[variant])}>
                {content}
            </Link>
        </motion.div>
    );
}

/**
 * Preset CTAs para uso común
 */
export const ctaPresets = {
    // CTA estándar para agendar cita
    booking: {
        title: '¿Lista para tu cita?',
        subtitle: 'Agenda tu cita por WhatsApp y vive la experiencia Ara Zevallos Studio',
        primaryAction: {
            label: 'Reservar por WhatsApp',
            href: 'https://wa.link/b5c2z6',
            icon: <MessageCircle className="w-5 h-5" />,
            variant: 'primary' as const,
            external: true,
        },
    },

    // CTA para servicios + press-on
    fullExperience: {
        title: '¿Lista para vivir la experiencia?',
        subtitle: 'Agenda tu cita o pide tus Press-On Nails con envío a todo el Perú',
        primaryAction: {
            label: 'Reservar Cita',
            href: 'https://wa.link/b5c2z6',
            icon: <MessageCircle className="w-5 h-5" />,
            variant: 'primary' as const,
            external: true,
        },
        secondaryAction: {
            label: 'Comprar Press-On',
            href: '/shop',
            variant: 'secondary' as const,
            external: false,
        },
    },

    // CTA para press-on
    pressOn: {
        title: '¿Lista para tus uñas perfectas?',
        subtitle: 'Elige tu diseño favorito y recíbelo en casa',
        primaryAction: {
            label: 'Ver Colección',
            href: '/shop',
            variant: 'primary' as const,
            external: false,
        },
    },
};
