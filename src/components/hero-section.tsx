'use client';

import { siteSettings } from '@/lib/data';

export default function HeroSection() {
  if (!siteSettings) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-canopy">
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4">
          <h1 className="font-headline text-5xl md:text-7xl text-linen uppercase tracking-[0.2em]">
            Contenido no disponible
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* ── Background video ─────────────────────────────────────── */}
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

      {/* ── Cinematic overlay — Verde Cánope gradient ─────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-canopy/85 via-canopy/40 to-canopy/90" />

      {/* ── Top gold accent line ──────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent z-20" />

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pt-20">

        {/* Main heading — Cinzel, uppercase, wide tracking */}
        <h1
          className="font-headline text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[1.1] text-linen animate-fade-in-up opacity-0"
          style={{
            animationDelay: '0.1s',
            animationFillMode: 'forwards',
            letterSpacing: '0.15em',
            fontWeight: 400,
          }}
        >
          Luz.{' '}
          <span className="text-linen/50" style={{ fontWeight: 300 }}>
            Movimiento.
          </span>
          <br />
          Emoción.
        </h1>

        {/* Thin gold divider */}
        <div
          className="divider-gold mx-auto my-8 animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
        />

        {/* Services label */}
        <p
          className="label-eyebrow mb-6 animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
        >
          Fotografía&nbsp;&middot;&nbsp;Filmmaking&nbsp;&middot;&nbsp;Dirección de Fotografía
        </p>


      </div>

      {/* ── Scroll indicator ──────────────────────────────────────── */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-fade-in-up opacity-0 flex flex-col items-center gap-3"
        style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}
      >
        <span className="font-body text-[9px] uppercase tracking-[0.45em] text-linen/35">
          Scroll
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-gold/50 to-transparent" />
      </div>

      {/* ── Bottom gold accent line ───────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent z-20" />

      {/* ── Full name watermark ───────────────────────────────────── */}
      <div className="absolute bottom-24 left-0 right-0 z-10 flex justify-center pointer-events-none select-none">
        <span
          className="font-headline text-[9px] tracking-[0.6em] text-linen/15 uppercase hidden lg:block"
          style={{ letterSpacing: '0.6em' }}
        >
          Pablo Blázquez Gil
        </span>
      </div>
    </section>
  );
}
