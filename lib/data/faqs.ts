/**
 * ============================================
 * FAQ DATA - ARA ZEVALLOS STUDIO
 * ============================================
 * 
 * Preguntas frecuentes externalizadas.
 * Añade, edita o elimina FAQs aquí sin tocar el componente.
 */

export interface FAQItem {
    question: string;
    answer: string;
}

export const faqs: FAQItem[] = [
    {
        question: "¿Cómo funcionan las Press-On Nails?",
        answer: "Las Press-On son uñas prehornadas que se adhieren a tus uñas naturales con adhesivo especial. Son reutilizables, duran hasta 2 semanas y no dañan tus uñas. Incluimos todo lo necesario en el kit: uñas, adhesivo, lima y palillo de madera.",
    },
    {
        question: "¿Cómo sé mi talla de uñas?",
        answer: "Te enviamos una guía de medición con cada pedido. Solo necesitas medir el ancho de cada uña con una regla y comparar con nuestra tabla de tallas. También ofrecemos kits de muestra para asegurar el ajuste perfecto.",
    },
    {
        question: "¿Cuánto tiempo duran las Press-On?",
        answer: "Con el cuidado adecuado, nuestras Press-On duran entre 1-2 semanas. Son perfectas para eventos especiales o uso diario. Además, puedes reutilizarlas hasta 3-5 veces si las cuidas correctamente.",
    },
    {
        question: "¿Hacen envíos a todo el Perú?",
        answer: "¡Sí! Enviamos a todo el Perú. Lima y principales ciudades: 2-3 días hábiles. Otras provincias: 3-5 días hábiles. El envío incluye seguimiento para que siempre sepas dónde está tu pedido.",
    },
    {
        question: "¿Puedo pedir un diseño personalizado?",
        answer: "¡Por supuesto! Ofrecemos diseños personalizados. Solo envíanos tu idea o referencia por WhatsApp y te daremos una cotización. Podemos replicar casi cualquier diseño que te guste o crear algo único para ti.",
    },
    {
        question: "¿Cómo cuido mis Press-On para que duren más?",
        answer: "Evita mojar tus manos por 2 horas después de aplicarlas. Usa guantes para lavar platos. No las uses como herramientas. Para removerlas, sumérgelas en agua tibia por 10-15 minutos y retíralas suavemente.",
    },
];
