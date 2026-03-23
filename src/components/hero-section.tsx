'use client';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { siteSettings } from '@/lib/data';

export default function HeroSection() {
  if (!siteSettings) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-secondary">
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-foreground p-4">
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl">Contenido no disponible</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background video */}
      <video
        key={siteSettings.heroVideoUrl}
        src={siteSettings.heroVideoUrl}
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 scale-105"
        autoPlay
        loop
        muted
        playsInline
        poster={siteSettings.heroPosterUrl}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-foreground p-4">
        <p
          className="text-white/70 uppercase tracking-[0.4em] text-xs sm:text-sm font-light mb-6 animate-fade-in-up opacity-0 text-center"
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
        >
          Fotografía &middot; Filmmaking &middot; Dirección de Fotografía
        </p>
        <h1
          className="font-headline text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-tight animate-fade-in-up opacity-0 tracking-tight"
          style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
        >
          Luz. <span className="text-white/60 font-light italic">Movimiento.</span>
          <br />
          Emoción.
        </h1>
        <p
          className="mt-8 text-base md:text-lg max-w-xl text-white/60 font-light leading-relaxed animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
        >
          Narrativas visuales que conectan marcas con personas. Especializado en cinematografía, eventos de alto nivel y proyectos corporativos.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-6 mt-12 animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
        >
          <Link
            href="#gallery"
            className="px-8 py-4 bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
          >
            Ver Portfolio
          </Link>
          <Link
            href="#contact"
            className="px-8 py-4 bg-transparent border border-white/20 text-white text-xs sm:text-sm uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            Contactar
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-fade-in-up opacity-0 flex flex-col items-center gap-4" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>

      {/* Bottom subtle line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-20" />
    </section>
  );
}
