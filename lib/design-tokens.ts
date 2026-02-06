/**
 * ============================================
 * DESIGN TOKENS - ARA ZEVALLOS STUDIO
 * ============================================
 * 
 * Sistema de diseño centralizado.
 * Todas las decisiones de diseño en un solo lugar.
 * Mobile-first approach.
 */

// ============================================
// COLORS
// ============================================

export const colors = {
    // Brand Colors
    brand: {
        primary: '#D4847C',      // Coral principal
        primaryLight: '#E8A0B0', // Rosa claro
        secondary: '#F5B5C8',    // Rosa accent
        accent: '#7EC8E3',       // Azul celeste
    },

    // Background Colors
    background: {
        main: '#FFFBFC',         // Fondo principal
        light: '#FDE8EE',        // Rosa muy claro
        white: '#FFFFFF',
        card: '#FFFFFF',
    },

    // Text Colors
    text: {
        primary: '#3D3D3D',      // Texto principal
        secondary: '#6B6B6B',    // Texto secundario
        muted: '#9B9B9B',        // Texto sutil
        white: '#FFFFFF',
        onPrimary: '#FFFFFF',    // Texto sobre color primario
    },

    // Semantic Colors
    semantic: {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
    },

    // Collection badge colors
    collections: {
        trendy: { main: '#FF6B6B', light: '#FF8E8E' },
        luxury: { main: '#9B59B6', light: '#B07CC6' },
        essential: { main: '#E91E8C', light: '#F06BA8' },
        custom: { main: '#7EC8E3', light: '#A8D8EA' },
    },
} as const;

// ============================================
// GRADIENTS
// ============================================

export const gradients = {
    // Brand gradients
    primary: 'from-[#D4847C] to-[#E8A0B0]',
    primaryHero: 'from-[#FDE8EE] via-[#FFFBFC] to-[#E8F4F8]',
    pinkLight: 'from-[#FDE8EE] via-[#FFFBFC] to-white',
    accent: 'from-[#7EC8E3] to-[#A8D8EA]',

    // CTA gradient
    cta: 'from-[#D4847C] to-[#E8A0B0]',

    // Collection gradients
    trendy: 'from-[#FF6B6B] to-[#FF8E8E]',
    luxury: 'from-[#9B59B6] to-[#B07CC6]',
    essential: 'from-[#E91E8C] to-[#F06BA8]',
    custom: 'from-[#7EC8E3] to-[#A8D8EA]',

    // Card backgrounds
    cardPink: 'from-[#F5B5C8] to-[#FDE8EE]',
    cardBlue: 'from-[#7EC8E3]/30 to-[#A8DCF0]',
} as const;

// ============================================
// SPACING (Mobile-first scale)
// ============================================

export const spacing = {
    // Section padding (mobile → desktop)
    section: {
        y: {
            sm: 'py-12',         // Mobile small
            md: 'py-16 md:py-20', // Standard
            lg: 'py-20 md:py-24', // Large
            xl: 'py-24 md:py-32', // Extra large (hero)
        },
        x: 'px-4 sm:px-6 lg:px-8',
    },

    // Container max widths
    container: {
        sm: 'max-w-4xl',
        md: 'max-w-5xl',
        lg: 'max-w-6xl',
        xl: 'max-w-7xl',
        full: 'w-full',
    },

    // Gap scale
    gap: {
        xs: 'gap-2',
        sm: 'gap-4',
        md: 'gap-6 md:gap-8',
        lg: 'gap-8 md:gap-12',
        xl: 'gap-12 md:gap-16',
    },
} as const;

// ============================================
// TYPOGRAPHY (Mobile-first)
// ============================================

export const typography = {
    // Font families
    fonts: {
        heading: 'var(--font-playfair), Georgia, serif',
        body: 'var(--font-inter), system-ui, sans-serif',
    },

    // Heading sizes (mobile → desktop)
    heading: {
        h1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold',
        h2: 'text-2xl sm:text-3xl md:text-4xl font-bold',
        h3: 'text-xl sm:text-2xl font-bold',
        h4: 'text-lg sm:text-xl font-semibold',
    },

    // Body text
    body: {
        lg: 'text-base sm:text-lg',
        md: 'text-sm sm:text-base',
        sm: 'text-xs sm:text-sm',
    },

    // Special
    label: 'text-xs sm:text-sm font-medium uppercase tracking-wider',
} as const;

// ============================================
// SHADOWS
// ============================================

export const shadows = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    card: 'shadow-sm hover:shadow-xl transition-shadow',
    cardHover: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
    primary: 'shadow-[#D4847C]/20',
} as const;

// ============================================
// BORDER RADIUS
// ============================================

export const radii = {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
    full: 'rounded-full',
} as const;

// ============================================
// BORDERS
// ============================================

export const borders = {
    light: 'border border-[#F5B5C8]/30',
    medium: 'border border-[#F5B5C8]/50',
    primary: 'border border-[#D4847C]/50',
    white: 'border border-white/50',
} as const;

// ============================================
// TRANSITIONS
// ============================================

export const transitions = {
    fast: 'transition-all duration-200',
    normal: 'transition-all duration-300',
    slow: 'transition-all duration-500',
    colors: 'transition-colors duration-200',
} as const;

// ============================================
// COMMON CLASS COMBINATIONS
// ============================================

export const classes = {
    // Buttons
    button: {
        base: 'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200',
        primary: `bg-gradient-to-r ${gradients.primary} text-white px-6 py-3 sm:px-8 sm:py-4 hover:shadow-lg hover:shadow-[#D4847C]/20`,
        secondary: 'bg-white text-[#D4847C] border border-[#F5B5C8]/50 px-6 py-3 sm:px-8 sm:py-4 hover:border-[#D4847C]/50',
        outline: 'bg-transparent border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 hover:bg-white/10',
        // Touch-friendly minimum size
        minTouch: 'min-h-[44px] min-w-[44px]',
    },

    // Cards
    card: {
        base: `bg-white ${radii.lg} ${borders.light} ${transitions.normal}`,
        hover: 'hover:border-[#D4847C]/50 hover:shadow-xl',
        gradient: `bg-gradient-to-br from-[#FDE8EE] to-[#E8F4F8] ${radii.lg} ${borders.light}`,
    },

    // Section
    section: {
        base: `${spacing.section.x} mx-auto`,
        container: `mx-auto ${spacing.container.xl} ${spacing.section.x}`,
    },

    // Text
    text: {
        heading: `text-[#3D3D3D]`,
        headingAccent: `text-[#D4847C] italic`,
        body: `text-[#6B6B6B]`,
        label: `text-[#D4847C] ${typography.label}`,
        gradient: `bg-gradient-to-r ${gradients.primary} bg-clip-text text-transparent`,
    },

    // Badge
    badge: {
        base: 'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold',
        primary: `bg-gradient-to-r ${gradients.primary} text-white`,
        custom: `bg-gradient-to-r ${gradients.custom} text-white`,
    },

    // Focus states (accessibility)
    focus: {
        ring: 'focus:outline-none focus:ring-2 focus:ring-[#D4847C] focus:ring-offset-2',
        visible: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4847C] focus-visible:ring-offset-2',
    },
} as const;

// ============================================
// BREAKPOINTS REFERENCE
// ============================================

export const breakpoints = {
    sm: '640px',   // Mobile landscape
    md: '768px',   // Tablet
    lg: '1024px',  // Desktop
    xl: '1280px',  // Large desktop
    '2xl': '1536px', // Extra large
} as const;

// ============================================
// TYPE EXPORTS
// ============================================

export type Colors = typeof colors;
export type Gradients = typeof gradients;
export type Spacing = typeof spacing;
export type Typography = typeof typography;
