'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * ============================================
 * GOOGLE MAP COMPONENT
 * ============================================
 * 
 * Componente reutilizable para el mapa de Google.
 * Reemplaza el código duplicado en services y about.
 * Mobile-first design.
 */

interface GoogleMapProps {
    height?: number | string;
    className?: string;
    showDirectionsLink?: boolean;
}

// Embed URL del studio
const STUDIO_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3930.1545372234887!2d-76.2394521!3d-9.9210847!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a7c3003477179b%3A0xd38a3cbd81c15a86!2sAra%20Zevallos%20Studio!5e0!3m2!1sen!2spe!4v1769885790307!5m2!1sen!2spe';
const GOOGLE_MAPS_LINK = 'https://maps.app.goo.gl/5tX6ttp5mhfp4GfH6';

export function GoogleMap({
    height = 350,
    className,
    showDirectionsLink = true,
}: GoogleMapProps) {
    const heightValue = typeof height === 'number' ? `${height}px` : height;

    return (
        <div className={cn('space-y-4 sm:space-y-6', className)}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#F5B5C8]/30"
            >
                <iframe
                    src={STUDIO_EMBED_URL}
                    width="100%"
                    height={heightValue}
                    style={{ border: 0, minHeight: '280px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de Ara Zevallos Studio en Google Maps"
                    aria-label="Mapa mostrando la ubicación de Ara Zevallos Studio en Huánuco, Perú"
                />
            </motion.div>

            {showDirectionsLink && (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    <motion.a
                        whileHover={{ scale: 1.02 }}
                        href={GOOGLE_MAPS_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            'inline-flex items-center gap-2',
                            'text-[#D4847C] hover:text-[#c06b64]',
                            'transition-colors font-medium',
                            'text-sm sm:text-base',
                            // Accessibility
                            'focus:outline-none focus:ring-2 focus:ring-[#D4847C] focus:ring-offset-2 rounded-lg p-1',
                            'min-h-[44px] min-w-[44px]', // Touch target
                        )}
                        aria-label="Abrir ubicación de Ara Zevallos Studio en Google Maps"
                    >
                        📍 Abrir en Google Maps →
                    </motion.a>
                </motion.div>
            )}
        </div>
    );
}
