'use client';
import { siteSettings } from '@/lib/data';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  const settings = siteSettings;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        key={settings.heroVideoUrl}
        src={settings.heroVideoUrl}
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2"
        autoPlay
        loop
        muted
        playsInline
        poster={settings.heroPosterUrl}
      />
      <div className="absolute inset-0 bg-background/70" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-foreground p-4">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl animate-fade-in-up opacity-0" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
          Narración Visionaria
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl animate-fade-in-up opacity-0" style={{animationDelay: '0.4s', animationFillMode: 'forwards'}}>
          Capturando momentos que trascienden el tiempo. Un viaje a través de la luz, la sombra y la emoción.
        </p>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-fade-in-up opacity-0" style={{animationDelay: '0.6s', animationFillMode: 'forwards'}}>
        <Link href="#gallery" aria-label="Ir a la galería">
          <ArrowDown className="w-8 h-8 animate-bounce text-foreground/80 hover:text-primary transition-colors" />
        </Link>
      </div>
    </section>
  );
}
