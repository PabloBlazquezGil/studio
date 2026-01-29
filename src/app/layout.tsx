import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import CustomCursor from '@/components/custom-cursor';
import './globals.css';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Pablo Blázquez Gil',
  description: 'Portafolio de Pablo Blázquez Gil',
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
        <CustomCursor />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
