/**
 * ============================================
 * TESTIMONIALS DATA - ARA ZEVALLOS STUDIO
 * ============================================
 * 
 * Datos de testimonios externalizados para fácil mantenimiento.
 * Añade, edita o elimina testimonios aquí sin tocar el componente.
 */

export interface Testimonial {
    id: string;
    name: string;
    location: string;
    image?: string;
    rating: number;
    text: string;
    service: string;
}

export const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'María Fernanda',
        location: 'Huánuco',
        rating: 5,
        text: 'Ara es increíble! Mis uñas quedaron perfectas para mi boda. El diseño era exactamente lo que imaginé. 100% recomendada.',
        service: 'Uñas Acrílicas',
    },
    {
        id: '2',
        name: 'Lucía Torres',
        location: 'Lima',
        rating: 5,
        text: 'Las press-on llegaron súper rápido y la calidad es impresionante. Se ven como si hubiera ido al salón. Ya pedí mi segundo set!',
        service: 'Press-On Nails',
    },
    {
        id: '3',
        name: 'Camila Ríos',
        location: 'Huánuco',
        rating: 5,
        text: 'El maquillaje para mi sesión de fotos quedó espectacular. Ara entiende exactamente lo que necesitas y te hace sentir hermosa.',
        service: 'Maquillaje Profesional',
    },
    {
        id: '4',
        name: 'Valentina Soto',
        location: 'Arequipa',
        rating: 5,
        text: 'Primera vez comprando press-on y estoy encantada! El proceso de medición fue muy fácil y quedaron a la medida perfecta.',
        service: 'Press-On Nails',
    },
];
