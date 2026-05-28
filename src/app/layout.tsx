import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Cinzel, Montserrat } from 'next/font/google';

const fontHeadline = Cinzel({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['300', '400', '600'],
  display: 'swap',
});

const fontBody = Montserrat({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pablo Blázquez Gil | Fotografía & Filmmaking',
  description: 'Portfolio de Pablo Blázquez Gil — Fotógrafo y cineasta especializado en naturaleza, fauna y narrativa visual de autor.',
  openGraph: {
    title: 'Pablo Blázquez Gil | Fotografía & Filmmaking',
    description: 'Portfolio de Pablo Blázquez Gil — Fotógrafo y cineasta especializado en naturaleza, fauna y narrativa visual de autor.',
    siteName: 'Pablo Blázquez Gil',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1506606401543-2e73709cebb4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
        width: 1200,
        height: 630,
        alt: 'Portfolio de Pablo Blázquez Gil — Fotografía y Filmmaking',
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
    <html lang="es" className={cn('dark', fontHeadline.variable, fontBody.variable)}>
      <head />
      <body
        className={cn(
          'font-body antialiased film-grain',
          'selection:bg-gold selection:text-canopy'
        )}
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
