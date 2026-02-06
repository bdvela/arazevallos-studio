import NailAnalyzer from '@/components/ai/nail-analyzer';

export const metadata = {
    title: 'Cotizador con IA | Ara Zevallos Studio',
    description: 'Sube tu diseño y nuestra IA te dará un precio al instante.',
};

export default function CustomDesignPage() {
    return (
        <main className="min-h-screen bg-[#FFFBF9] pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-xs font-bold tracking-[0.2em] text-pink-500 uppercase mb-3 block">
                        Innovación Exclusiva
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
                        Diseña tus Uñas con <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Inteligencia Artificial</span>
                    </h1>
                    <p className="text-gray-500 max-w-lg mx-auto text-lg leading-relaxed">
                        ¿Viste un diseño en Pinterest o Instagram? Sube la foto y nuestro sistema te dirá exactamente qué categoría es y te permitirá reservarlo al instante.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative order-2 md:order-1">
                        {/* Decorative background blobs */}
                        <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

                        <NailAnalyzer />
                    </div>

                    <div className="space-y-8 order-1 md:order-2">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-xl font-serif font-bold text-gray-300">1</div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">Sube tu Imagen</h3>
                                <p className="text-gray-500 text-sm">Cualquier foto clara de un diseño de uñas que te guste.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-xl font-serif font-bold text-gray-300">2</div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">Análisis Instantáneo</h3>
                                <p className="text-gray-500 text-sm">Nuestra IA identifica las técnicas necesarias (Mano alzada, 3D, Efectos).</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-xl font-serif font-bold text-gray-300">3</div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">Reserva Directa</h3>
                                <p className="text-gray-500 text-sm">Agrégalo a tu carrito con el precio correcto y la foto adjunta.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
