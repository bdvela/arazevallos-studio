import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Servicios de Belleza | Ara Zevallos Studio",
    description: "Manicure, Pedicure, Pestañas y Cejas en Huánuco. Descubre nuestros servicios premium.",
    openGraph: {
        title: "Servicios de Belleza Premium | Ara Zevallos Studio",
        description: "Desde uñas acrílicas hasta diseño de cejas. Realza tu belleza con nosotros.",
        url: 'https://arazevallos.studio/services',
    }
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
