'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * ============================================
 * SECTION COMPONENT
 * ============================================
 * 
 * Componente base reutilizable para secciones.
 * Mobile-first con variants predefinidos.
 */

type SectionVariant = 'default' | 'white' | 'pink' | 'gradient' | 'cta';
type SectionPadding = 'sm' | 'md' | 'lg' | 'xl' | 'hero';
type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface SectionProps {
    children: ReactNode;
    variant?: SectionVariant;
    padding?: SectionPadding;
    container?: ContainerSize;
    className?: string;
    id?: string;
    animate?: boolean;
}

const variantStyles: Record<SectionVariant, string> = {
    default: 'bg-[#FFFBFC]',
    white: 'bg-white',
    pink: 'bg-gradient-to-br from-[#FDE8EE] via-[#FFFBFC] to-white',
    gradient: 'bg-gradient-to-br from-[#FDE8EE] via-[#FFFBFC] to-[#E8F4F8]',
    cta: 'bg-gradient-to-r from-[#D4847C] to-[#E8A0B0]',
};

const paddingStyles: Record<SectionPadding, string> = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-20',
    lg: 'py-20 md:py-24',
    xl: 'py-24 md:py-32',
    hero: 'pt-24 pb-16 md:pt-32 md:pb-20',
};

const containerStyles: Record<ContainerSize, string> = {
    sm: 'max-w-4xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'w-full',
};

export function Section({
    children,
    variant = 'default',
    padding = 'md',
    container = 'xl',
    className,
    id,
    animate = false,
}: SectionProps) {
    const content = (
        <div className={cn(
            'mx-auto px-4 sm:px-6 lg:px-8',
            containerStyles[container]
        )}>
            {children}
        </div>
    );

    if (animate) {
        return (
            <motion.section
                id={id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className={cn(
                    variantStyles[variant],
                    paddingStyles[padding],
                    'overflow-hidden',
                    className
                )}
            >
                {content}
            </motion.section>
        );
    }

    return (
        <section
            id={id}
            className={cn(
                variantStyles[variant],
                paddingStyles[padding],
                'overflow-hidden',
                className
            )}
        >
            {content}
        </section>
    );
}

/**
 * Section Header - Título estándar de sección
 */
interface SectionHeaderProps {
    label?: string;
    title: string;
    titleAccent?: string;
    description?: string;
    centered?: boolean;
    className?: string;
}

export function SectionHeader({
    label,
    title,
    titleAccent,
    description,
    centered = true,
    className,
}: SectionHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={cn(
                centered && 'text-center',
                'mb-12 md:mb-16',
                className
            )}
        >
            {label && (
                <span className="text-[#D4847C] text-xs sm:text-sm font-medium uppercase tracking-wider">
                    {label}
                </span>
            )}
            <h2
                className="mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-[#3D3D3D]"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
                {title}{' '}
                {titleAccent && (
                    <span className="text-[#D4847C] italic">{titleAccent}</span>
                )}
            </h2>
            {description && (
                <p className={cn(
                    'mt-3 sm:mt-4 text-sm sm:text-base text-[#6B6B6B]',
                    centered && 'max-w-2xl mx-auto'
                )}>
                    {description}
                </p>
            )}
        </motion.div>
    );
}
