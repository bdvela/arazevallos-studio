import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Ara Zevallos Studio | Belleza Premium en Huánuco",
  description: "Realzamos tu belleza con estilo y elegancia. Uñas, maquillaje, pestañas y cejas. Experiencia premium en Huánuco, Perú. Ahora con envío de Press-On Nails a nivel nacional.",
  keywords: ["uñas", "maquillaje", "pestañas", "cejas", "press-on nails", "huánuco", "perú", "belleza", "manicure"],
  authors: [{ name: "Ara Zevallos Studio" }],
  openGraph: {
    title: "Ara Zevallos Studio | Belleza Premium",
    description: "Realzamos tu belleza con estilo y elegancia ✨",
    locale: "es_PE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
        style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
      >
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
