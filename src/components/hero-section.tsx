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
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/90" />

      {/* Cyan top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4FD1C5] to-transparent z-20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-foreground p-4">
        <p
          className="text-[#4FD1C5] uppercase tracking-[0.4em] text-xs sm:text-sm font-light mb-6 animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
        >
          PBG Studio — Fotografía & Vídeo
        </p>
        <h1
          className="font-headline text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-tight animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
        >
          Luz. Movimiento.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#4FD1C5] to-white">
            Emoción.
          </span>
        </h1>
        <p
          className="mt-6 text-base md:text-lg max-w-xl text-white/70 font-light leading-relaxed animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
        >
          Narrativas visuales que conectan marcas con personas. Especializado en proyectos corporativos, eventos y retratos.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
        >
          <Link
            href="#gallery"
            className="px-8 py-3 bg-[#4FD1C5] text-black font-bold text-sm uppercase tracking-widest rounded hover:bg-[#38a198] transition-colors"
          >
            Ver Trabajos
          </Link>
          <Link
            href="#contact"
            className="px-8 py-3 border border-white/30 text-white text-sm uppercase tracking-widest rounded hover:border-[#4FD1C5] hover:text-[#4FD1C5] transition-colors"
          >
            Hablemos
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-fade-in-up opacity-0 flex flex-col items-center gap-2" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll</span>
        <ArrowDown className="w-5 h-5 animate-bounce text-[#4FD1C5]" />
      </div>

      {/* Bottom cyan line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#4FD1C5]/40 to-transparent z-20" />
    </section>
  );
}
