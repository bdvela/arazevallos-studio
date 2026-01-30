'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeInUp } from '@/components/ui/motion';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: '¿Cómo sé cuál es mi talla de press-on?',
        answer: 'Es muy fácil! Solo necesitas enviarnos una foto de tu mano junto a una moneda de 1 sol como referencia. Con esa imagen, calculamos el ancho exacto de cada una de tus uñas para crear un set personalizado a tu medida. Te contactaremos por WhatsApp para guiarte en el proceso.',
    },
    {
        question: '¿Cuánto tiempo duran las press-on?',
        answer: 'Con una aplicación correcta y cuidado normal, las press-on pueden durar de 1 a 2 semanas. La duración depende de tu actividad diaria y del cuidado que les des. Evita sumergir las manos en agua por tiempo prolongado y usa guantes para tareas del hogar.',
    },
    {
        question: '¿Dañan mis uñas naturales?',
        answer: '¡Para nada! A diferencia del acrílico o gel, las press-on no requieren limar tu uña natural ni usar químicos agresivos. Se aplican con pegamento especial y se retiran fácilmente sin dañar tus uñas.',
    },
    {
        question: '¿Son reutilizables?',
        answer: 'Sí, con el cuidado adecuado puedes usar tus press-on varias veces. Al retirarlas, limpia los residuos de pegamento con cuidado y guárdalas en su estuche. Te incluimos instrucciones detalladas de cuidado y reutilización.',
    },
    {
        question: '¿A qué ciudades hacen envío?',
        answer: 'Hacemos envíos a todo el Perú. El tiempo de entrega varía según tu ubicación: Lima 1-2 días, provincias 3-5 días. Recibirás un número de tracking para seguir tu pedido.',
    },
    {
        question: '¿Qué incluye el kit de press-on?',
        answer: 'Cada kit incluye: 10 uñas personalizadas a tu talla, pegamento profesional de alta duración, lima para preparación, palito de naranjo, instrucciones de aplicación y cuidado, y un estuche de almacenamiento.',
    },
    {
        question: '¿Cómo aplico las press-on?',
        answer: 'El proceso es súper fácil y toma solo 10-15 minutos: 1) Limpia y lima suavemente tus uñas, 2) Aplica una gota de pegamento en tu uña y otra en la press-on, 3) Presiona firmemente por 30 segundos. Incluimos instrucciones detalladas paso a paso.',
    },
    {
        question: '¿Puedo pedir un diseño personalizado?',
        answer: '¡Claro que sí! Contáctanos por WhatsApp con tu idea o inspiración y creamos un diseño único para ti. Los diseños personalizados tienen un costo adicional y tiempo de elaboración de 3-5 días.',
    },
];

function FAQItemComponent({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-b border-[#F5B5C8]/30 last:border-b-0"
        >
            <button
                onClick={onClick}
                className="w-full py-5 flex items-center justify-between text-left group"
            >
                <span className="font-medium text-[#3D3D3D] group-hover:text-[#D4847C] transition-colors pr-4">
                    {item.question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                >
                    <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-[#D4847C]' : 'text-[#6B6B6B]'}`} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="pb-5 text-[#6B6B6B] leading-relaxed">
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-gradient-to-br from-[#FFFBFC] via-white to-[#FDE8EE]">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <FadeInUp className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#F5B5C8] to-[#FDE8EE] mb-6">
                        <HelpCircle className="w-8 h-8 text-[#D4847C]" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                        Preguntas{' '}
                        <span className="text-[#D4847C] italic">Frecuentes</span>
                    </h2>
                    <p className="mt-4 text-[#6B6B6B] max-w-2xl mx-auto">
                        Todo lo que necesitas saber sobre nuestras Press-On Nails
                    </p>
                </FadeInUp>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-[#F5B5C8]/30"
                >
                    {faqs.map((faq, index) => (
                        <FAQItemComponent
                            key={index}
                            item={faq}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </motion.div>

                {/* Contact CTA */}
                <FadeInUp delay={0.2} className="text-center mt-10">
                    <p className="text-[#6B6B6B] mb-4">
                        ¿Tienes otra pregunta? Estamos aquí para ayudarte
                    </p>
                    <motion.a
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        href="https://wa.link/b5c2z6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        Pregúntanos por WhatsApp
                    </motion.a>
                </FadeInUp>
            </div>
        </section>
    );
}
