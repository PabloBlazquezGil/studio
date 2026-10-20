import type { Metadata } from 'next';
import { Barlow_Condensed, Inter } from 'next/font/google';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { siteUrl } from '@/lib/site';
import { cn } from '@/lib/utils';
import './globals.css';

const fontHeadline = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['500', '600'],
  display: 'swap',
});

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const description =
  'Fotógrafo y videógrafo. Surf y deporte, retrato, eventos y reels para redes sociales con una mirada cinematográfica.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Pablo Blázquez Gil | Fotografía y vídeo',
    template: '%s | Pablo Blázquez Gil',
  },
  description,
  openGraph: {
    title: 'Pablo Blázquez Gil | Fotografía y vídeo',
    description,
    siteName: 'Pablo Blázquez Gil',
    images: [{ url: '/og.jpg', width: 2048, height: 1518, alt: 'Surf en Malpica, por Pablo Blázquez Gil' }],
    locale: 'es_ES',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={cn(fontHeadline.variable, fontBody.variable)}>
      <body className="font-body antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
