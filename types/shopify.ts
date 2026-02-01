/**
 * ============================================
 * TIPOS DE SHOPIFY
 * ============================================
 * 
 * Tipos TypeScript para los datos de Shopify.
 * Mejora el autocompletado y previene errores.
 */

// ============================================
// Tipos de Imagen
// ============================================

export interface ShopifyImage {
    url: string;
    altText: string | null;
    width?: number;
    height?: number;
}

// ============================================
// Tipos de Precio
// ============================================

export interface ShopifyMoney {
    amount: string;
    currencyCode: 'PEN' | 'USD' | 'EUR' | string;
}

export interface ShopifyPriceRange {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
}

// ============================================
// Tipos de Producto
// ============================================

export interface ShopifyProductVariant {
    id: string;
    title: string;
    availableForSale: boolean;
    selectedOptions: {
        name: string;
        value: string;
    }[];
    price: ShopifyMoney;
}

export interface ShopifyProduct {
    id: string;
    handle: string;
    availableForSale: boolean;
    title: string;
    description: string;
    descriptionHtml: string;
    options: {
        id: string;
        name: string;
        values: string[];
    }[];
    priceRange: ShopifyPriceRange;
    variants: {
        edges: {
            node: ShopifyProductVariant;
        }[];
    };
    featuredImage: ShopifyImage | null;
    images: {
        edges: {
            node: ShopifyImage;
        }[];
    };
    seo: {
        title: string | null;
        description: string | null;
    };
    tags: string[];
    updatedAt: string;
    collections?: ShopifyCollectionReference[];
}

// Versión simplificada para listados
export interface ShopifyProductCard {
    id: string;
    handle: string;
    title: string;
    featuredImage: ShopifyImage | null;
    priceRange: ShopifyPriceRange;
    collections: ShopifyCollectionReference[];
}

// ============================================
// Tipos de Colección
// ============================================

export interface ShopifyCollectionReference {
    handle: string;
    title: string;
}

export interface ShopifyCollection {
    id: string;
    handle: string;
    title: string;
    description: string | null;
    image: ShopifyImage | null;
    products: {
        edges: {
            node: ShopifyProduct;
        }[];
    };
}

// ============================================
// Tipos de Carrito
// ============================================

export interface ShopifyCartLine {
    id: string;
    quantity: number;
    cost: {
        totalAmount: ShopifyMoney;
    };
    merchandise: {
        id: string;
        title: string;
        selectedOptions: {
            name: string;
            value: string;
        }[];
        product: {
            handle: string;
            title: string;
            featuredImage: ShopifyImage | null;
        };
    };
    attributes: {
        key: string;
        value: string;
    }[];
}

export interface ShopifyCart {
    id: string;
    checkoutUrl: string;
    cost: {
        subtotalAmount: ShopifyMoney;
        totalAmount: ShopifyMoney;
        totalTaxAmount: ShopifyMoney | null;
    };
    lines: {
        edges: {
            node: ShopifyCartLine;
        }[];
    };
    totalQuantity: number;
}

// ============================================
// Tipos de Atributos (para sizing photos)
// ============================================

export interface CartLineAttributes {
    [key: string]: string;
}
