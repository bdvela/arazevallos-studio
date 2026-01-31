/**
 * ============================================
 * CONFIGURACIÓN DE COLECCIONES
 * ============================================
 * 
 * Aquí puedes agregar nuevas colecciones cuando las crees en Shopify.
 * Solo necesitas agregar el "handle" de la colección y su configuración.
 * 
 * ¿Cómo encontrar el handle?
 * 1. Ve a Shopify Admin > Products > Collections
 * 2. Abre la colección
 * 3. Mira la URL o la sección "Handle" en la configuración
 * 
 * Ejemplo: Si la URL es /collections/mi-nueva-coleccion, el handle es "mi-nueva-coleccion"
 */

export interface CollectionConfig {
    icon: string;
    color: string;
    gradient: string;
    description?: string;
}

export const collectionConfig: Record<string, CollectionConfig> = {
    // ═══════════════════════════════════════
    // 🔥 TRENDY - Diseños en tendencia
    // ═══════════════════════════════════════
    'coleccion-trendy-disenos-en-tendencia': {
        icon: '🔥',
        color: '#FF6B6B',
        gradient: 'from-[#FF6B6B] to-[#FF8E8E]',
        description: 'Los diseños más populares y a la moda del momento'
    },

    // ═══════════════════════════════════════
    // 👑 LUXURY - Elegancia Premium
    // ═══════════════════════════════════════
    'coleccion-luxury-elegancia-premium': {
        icon: '👑',
        color: '#9B59B6',
        gradient: 'from-[#9B59B6] to-[#B07CC6]',
        description: 'Diseños sofisticados para ocasiones especiales'
    },

    // ═══════════════════════════════════════
    // 💖 ESSENTIAL - Belleza diaria
    // ═══════════════════════════════════════
    'coleccion-essential': {
        icon: '💖',
        color: '#E91E8C',
        gradient: 'from-[#E91E8C] to-[#F06BA8]',
        description: 'Tonos clásicos perfectos para el día a día'
    },

    // ═══════════════════════════════════════
    // ✨ PERSONALIZADOS - Diseñados para ti
    // ═══════════════════════════════════════
    'press-on-personalizados-disenados-para-ti': {
        icon: '✨',
        color: '#7EC8E3',
        gradient: 'from-[#7EC8E3] to-[#A8D8EA]',
        description: 'Crea tu diseño único con nuestro kit personalizado'
    },

    // ═══════════════════════════════════════
    // 📝 AGREGA NUEVAS COLECCIONES AQUÍ:
    // ═══════════════════════════════════════
    // Ejemplo:
    // 'mi-nueva-coleccion': {
    //     icon: '🌟',
    //     color: '#FF9500',
    //     gradient: 'from-[#FF9500] to-[#FFB347]',
    //     description: 'Descripción de mi nueva colección'
    // },
};

// Configuración por defecto para colecciones sin configuración personalizada
export const defaultCollectionConfig: CollectionConfig = {
    icon: '💅',
    color: '#D4847C',
    gradient: 'from-[#D4847C] to-[#E8A0B0]',
    description: 'Descubre nuestra colección exclusiva'
};

// Helper para obtener la configuración de una colección
export function getCollectionConfig(handle: string): CollectionConfig {
    return collectionConfig[handle] || defaultCollectionConfig;
}
