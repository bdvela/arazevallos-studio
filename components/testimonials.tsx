'use client';

import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { testimonials, type Testimonial } from '@/lib/data/testimonials';


function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`w-4 h-4 ${i < rating ? 'fill-[#F5B5C8] text-[#F5B5C8]' : 'text-gray-200'}`}
                />
            ))}
        </div>
    );
}

export function TestimonialsSection() {
    return (
        <section className="py-24 bg-gradient-to-br from-[#FFFBFC] via-white to-[#FDE8EE]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <FadeInUp className="text-center mb-16">
                    <span className="text-[#D4847C] text-sm font-medium uppercase tracking-wider">
                        Testimonios
                    </span>
                    <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                        Lo que dicen nuestras{' '}
                        <span className="text-[#D4847C] italic">clientas</span>
                    </h2>
                    <p className="mt-4 text-[#6B6B6B] max-w-2xl mx-auto">
                        La satisfacción de nuestras clientas es nuestra mayor recompensa
                    </p>
                </FadeInUp>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((testimonial) => (
                        <StaggerItem key={testimonial.id}>
                            <motion.div
                                whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)' }}
                                transition={{ duration: 0.3 }}
                                className="relative bg-white rounded-2xl p-6 border border-[#F5B5C8]/30 h-full flex flex-col"
                            >
                                {/* Quote Icon */}
                                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-[#D4847C] to-[#E8A0B0] rounded-full flex items-center justify-center">
                                    <Quote className="w-4 h-4 text-white fill-white" />
                                </div>

                                {/* Rating */}
                                <div className="mb-4 pt-2">
                                    <StarRating rating={testimonial.rating} />
                                </div>

                                {/* Text */}
                                <p className="text-[#6B6B6B] text-sm leading-relaxed flex-grow mb-4">
                                    "{testimonial.text}"
                                </p>

                                {/* Service Tag */}
                                <div className="mb-4">
                                    <span className="inline-block px-3 py-1 bg-[#FDE8EE] text-[#D4847C] text-xs font-medium rounded-full">
                                        {testimonial.service}
                                    </span>
                                </div>

                                {/* Author */}
                                <div className="flex items-center gap-3 pt-4 border-t border-[#F5B5C8]/20">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F5B5C8] to-[#E8A0B0] flex items-center justify-center">
                                        <span className="text-white font-semibold text-sm">
                                            {testimonial.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#3D3D3D] text-sm">{testimonial.name}</p>
                                        <p className="text-xs text-[#6B6B6B]">{testimonial.location}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* Trust Badge */}
                <FadeInUp delay={0.3} className="mt-12 text-center">
                    <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-[#F5B5C8]/30">
                        <div className="flex -space-x-2">
                            {['#F5B5C8', '#7EC8E3', '#E8A0B0', '#A8DCF0'].map((color, i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
                                    style={{ backgroundColor: color }}
                                >
                                    {String.fromCharCode(65 + i)}
                                </div>
                            ))}
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-semibold text-[#3D3D3D]">+100 clientas felices</p>
                            <p className="text-xs text-[#6B6B6B]">en Huánuco y todo el Perú</p>
                        </div>
                    </div>
                </FadeInUp>
            </div>
        </section>
    );
}
