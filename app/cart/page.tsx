import { getCart } from '@/lib/shopify';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export default async function CartPage() {
    const cartId = (await cookies()).get('cartId')?.value;
    let cart;

    if (cartId) {
        cart = await getCart(cartId);
    }

    if (!cart || cart.lines.edges.length === 0) {
        return (
            <div className="bg-[#FFFBFC] min-h-screen">
                <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 text-center">
                    <div className="w-20 h-20 rounded-full bg-[#FDE8EE] flex items-center justify-center mx-auto mb-8">
                        <ShoppingBag className="w-10 h-10 text-[#D4847C]" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#3D3D3D] mb-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                        Tu carrito está vacío
                    </h1>
                    <p className="text-[#6B6B6B] mb-8">
                        Aún no has agregado ningún diseño a tu carrito
                    </p>
                    <Link
                        href="/shop"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        Explorar Diseños
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#FFFBFC] min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
                <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-[#D4847C] text-sm font-medium mb-8 hover:text-[#E8A0B0] transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Seguir comprando
                </Link>

                <h1 className="text-3xl font-bold text-[#3D3D3D] mb-8" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                    Tu Carrito
                </h1>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.lines.edges.map((edge: any) => {
                            const item = edge.node;
                            return (
                                <div key={item.id} className="flex gap-6 bg-white p-6 rounded-2xl border border-[#F5B5C8]/30">
                                    <div className="relative h-28 w-28 flex-none rounded-xl bg-[#FDE8EE] overflow-hidden">
                                        {item.merchandise.product.featuredImage && (
                                            <Image
                                                src={item.merchandise.product.featuredImage.url}
                                                alt={item.merchandise.product.title}
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                    </div>

                                    <div className="flex flex-1 flex-col">
                                        <div className="flex justify-between">
                                            <div>
                                                <h3 className="font-semibold text-[#3D3D3D]">
                                                    {item.merchandise.product.title}
                                                </h3>
                                                <p className="text-sm text-[#6B6B6B] mt-1">
                                                    {item.merchandise.title}
                                                </p>
                                            </div>
                                            <p className="font-semibold text-[#D4847C]">
                                                {item.cost.totalAmount.currencyCode === 'PEN' ? 'S/' : item.cost.totalAmount.currencyCode}{' '}
                                                {parseFloat(item.cost.totalAmount.amount).toFixed(2)}
                                            </p>
                                        </div>

                                        {/* Custom Attributes (Sizing Photo) */}
                                        {item.attributes.length > 0 && (
                                            <div className="mt-4 space-y-2">
                                                {item.attributes.map((attr: any) => (
                                                    <div key={attr.key} className="text-sm">
                                                        {attr.key === 'Sizing Photo' ? (
                                                            <div className="flex items-center gap-3">
                                                                <div className="relative h-12 w-12 border border-[#F5B5C8] rounded-lg overflow-hidden">
                                                                    <Image src={attr.value} alt="Sizing Reference" fill className="object-cover" />
                                                                </div>
                                                                <span className="text-[#6B6B6B]">Foto de referencia adjunta ✓</span>
                                                            </div>
                                                        ) : (
                                                            <p className="text-[#6B6B6B]">
                                                                <span className="font-medium">{attr.key}:</span> {attr.value}
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-[#F5B5C8]/30 p-6 sticky top-32">
                            <h2 className="text-lg font-bold text-[#3D3D3D] mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                                Resumen del Pedido
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-[#6B6B6B]">
                                    <span>Subtotal</span>
                                    <span>
                                        {cart.cost.subtotalAmount.currencyCode === 'PEN' ? 'S/' : cart.cost.subtotalAmount.currencyCode}{' '}
                                        {parseFloat(cart.cost.subtotalAmount.amount).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-[#6B6B6B]">
                                    <span>Envío</span>
                                    <span className="text-[#D4847C]">Calculado en checkout</span>
                                </div>
                            </div>

                            <div className="border-t border-[#F5B5C8]/30 pt-4 mb-6">
                                <div className="flex justify-between text-lg font-bold text-[#3D3D3D]">
                                    <span>Total</span>
                                    <span className="text-[#D4847C]">
                                        {cart.cost.totalAmount.currencyCode === 'PEN' ? 'S/' : cart.cost.totalAmount.currencyCode}{' '}
                                        {parseFloat(cart.cost.totalAmount.amount).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <Link
                                href={cart.checkoutUrl}
                                className="block w-full btn-primary text-center text-lg py-4"
                            >
                                Proceder al Pago
                            </Link>

                            <p className="text-xs text-[#6B6B6B] text-center mt-4">
                                Pago seguro con Shopify 🔒
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
