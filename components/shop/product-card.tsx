import Image from 'next/image';
import Link from 'next/link';

export function ProductCard({ product }: { product: any }) {
    const { handle, title, featuredImage, priceRange } = product;
    const price = priceRange?.minVariantPrice?.amount;
    const currencyCode = priceRange?.minVariantPrice?.currencyCode;

    return (
        <Link href={`/shop/${handle}`} className="group block">
            <div className="aspect-square relative overflow-hidden rounded-2xl bg-[#FDE8EE] border border-[#F5B5C8]/30 group-hover:border-[#D4847C]/50 transition-all">
                {featuredImage && (
                    <Image
                        src={featuredImage.url}
                        alt={featuredImage.altText || title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    />
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D3D3D]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-block bg-white text-[#D4847C] text-xs font-medium px-3 py-1.5 rounded-full">
                        Ver detalles
                    </span>
                </div>
            </div>
            <div className="mt-4 space-y-1">
                <h3 className="text-[#3D3D3D] font-medium group-hover:text-[#D4847C] transition-colors line-clamp-1">
                    {title}
                </h3>
                <p className="text-[#D4847C] font-semibold">
                    {currencyCode === 'PEN' ? 'S/' : currencyCode === 'USD' ? '$' : currencyCode}{' '}
                    {parseFloat(price).toFixed(2)}
                </p>
            </div>
        </Link>
    );
}
