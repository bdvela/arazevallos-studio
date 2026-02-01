/**
 * ============================================
 * COLORES DE MARCA - ARA ZEVALLOS STUDIO
 * ============================================
 * 
 * Todos los colores de la marca centralizados.
 * Si necesitas cambiar un color, hazlo solo aquí.
 */

export const brandColors = {
    // Colores Primarios
    primary: '#D4847C',      // Coral/Rosa principal
    secondary: '#E8A0B0',    // Rosa más claro
    accent: '#F5B5C8',       // Rosa accent

    // Colores de Fondo
    background: {
        main: '#FFFBFC',     // Fondo principal (casi blanco rosado)
        light: '#FDE8EE',    // Fondo rosa claro
        card: '#FFFFFF',     // Fondo de tarjetas
    },

    // Texto
    text: {
        primary: '#3D3D3D',   // Texto principal (gris oscuro)
        secondary: '#6B6B6B', // Texto secundario (gris)
        muted: '#9B9B9B',     // Texto sutil
        white: '#FFFFFF',     // Texto blanco
    },

    // Colores de Estado
    success: '#10B981',      // Verde éxito
    error: '#EF4444',        // Rojo error
    warning: '#F59E0B',      // Amarillo advertencia

    // Colores de Colección (para badges)
    collections: {
        trendy: { main: '#FF6B6B', light: '#FF8E8E' },
        luxury: { main: '#9B59B6', light: '#B07CC6' },
        essential: { main: '#E91E8C', light: '#F06BA8' },
        custom: { main: '#7EC8E3', light: '#A8D8EA' },
    },

    // Gradientes (para uso en Tailwind)
    gradients: {
        primary: 'from-[#D4847C] to-[#E8A0B0]',
        trendy: 'from-[#FF6B6B] to-[#FF8E8E]',
        luxury: 'from-[#9B59B6] to-[#B07CC6]',
        essential: 'from-[#E91E8C] to-[#F06BA8]',
        custom: 'from-[#7EC8E3] to-[#A8D8EA]',
        hero: 'from-[#FDE8EE] via-[#FFFBFC] to-white',
    },
} as const;

// Tipo para autocompletado
export type BrandColor = typeof brandColors;

/**
 * Helper para obtener sombra con color
 * @param color - Color hex
 * @param opacity - Opacidad (0-1)
 */
export function colorWithOpacity(color: string, opacity: number): string {
    return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
}

/**
 * Clases CSS comunes pre-definidas
 */
export const brandClasses = {
    // Botones
    buttonPrimary: 'bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] text-white hover:shadow-lg hover:shadow-[#D4847C]/20',
    buttonSecondary: 'bg-white text-[#D4847C] border border-[#F5B5C8]/50 hover:border-[#D4847C]/50',

    // Texto
    textGradient: 'bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] bg-clip-text text-transparent',

    // Fondos
    cardBackground: 'bg-white rounded-2xl border border-[#F5B5C8]/30 shadow-sm',
    sectionBackground: 'bg-[#FFFBFC]',

    // Badges
    badge: 'px-2.5 py-1 rounded-full text-[10px] font-semibold',
} as const;
