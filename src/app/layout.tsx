import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Playfair_Display, Manrope } from 'next/font/google';

const fontHeadline = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['400', '700'],
});

const fontBody = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '700'],
});

export const metadata: Metadata = {
  title: 'Pablo Blázquez Gil | Fotógrafo y Videógrafo',
  description: 'Portafolio de Pablo Blázquez Gil. Fotógrafo y videógrafo especializado en narrativa visual, eventos y proyectos corporativos.',
  openGraph: {
    title: 'Pablo Blázquez Gil | Fotógrafo y Videógrafo',
    description: 'Portafolio de Pablo Blázquez Gil. Fotógrafo y videógrafo especializado en narrativa visual, eventos y proyectos corporativos.',
    siteName: 'Pablo Blázquez Gil',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1506606401543-2e73709cebb4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
        width: 1200,
        height: 630,
        alt: 'Una de las imágenes del portafolio de Pablo Blázquez Gil',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn("dark", fontHeadline.variable, fontBody.variable)}>
      <head />
      <body className={cn(
        'font-body antialiased film-grain',
        'selection:bg-primary selection:text-primary-foreground'
      )}>
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster />
      </body>
    </html>
  );
}
