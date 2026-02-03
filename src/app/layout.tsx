import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

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
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Manrope:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
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
