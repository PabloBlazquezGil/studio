'use client';
import Image from 'next/image';
import ScrollReveal from './scroll-reveal';
import Link from 'next/link';
import { author } from '@/lib/data';
import { Camera, Film, Star } from 'lucide-react';

const skills = [
  { icon: Camera, label: 'Fotografía',      sub: 'Naturaleza · Fauna · Evento' },
  { icon: Film,   label: 'Vídeo',           sub: 'Documental · Cinemático · Corporativo' },
  { icon: Star,   label: 'Postproducción',  sub: 'Edición · Color · Motion' },
];

export default function AboutSection() {
  if (!author) return null;

  return (
    /* ── Light section — Blanco Lino background ────────────────── */
    <section
      id="about"
      className="relative py-28 sm:py-36 overflow-hidden scroll-mt-24"
      style={{ backgroundColor: '#F9F8F6' }}
    >
      {/* Faint watermark */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none select-none overflow-hidden">
        <p
          className="text-[18vw] leading-none font-headline whitespace-nowrap animate-marquee"
          style={{ color: '#1C2826', letterSpacing: '0.1em' }}
        >
          {author.name.toUpperCase()} &ndash; {author.name.toUpperCase()} &nbsp;
        </p>
      </div>

      <ScrollReveal className="container mx-auto px-6 sm:px-8 lg:px-16 relative z-10">

        {/* ── Section header ──────────────────────────────────────── */}
        <div className="mb-20">
          <p className="label-eyebrow mb-4" style={{ color: '#D4AF37' }}>
            El artista
          </p>
          {/* Gold divider */}
          <div className="divider-gold mb-6" />
          <h2
            className="font-headline text-4xl sm:text-5xl lg:text-6xl font-light"
            style={{ color: '#1C2826', letterSpacing: '0.18em' }}
          >
            Sobre Mí
          </h2>
        </div>

        {/* ── Grid: photo + text ───────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24 items-start">

          {/* Photo */}
          <div className="lg:col-span-2">
            <ScrollReveal className="relative aspect-[4/5] overflow-hidden shadow-[0_20px_60px_rgba(28,40,38,0.15)] group">
              <Image
                src={author.imageUrl}
                alt={author.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              {/* Canopy tint overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-canopy/50 via-transparent to-transparent" />

              {/* Gold bottom edge */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold/60" />
            </ScrollReveal>
          </div>

          {/* Text */}
          <div className="lg:col-span-3 flex flex-col gap-10">
            <div>
              <h3
                className="font-headline text-2xl sm:text-3xl mb-6 font-light"
                style={{ color: '#1C2826', letterSpacing: '0.15em' }}
              >
                {author.title}
              </h3>
              <div
                className="font-body leading-[1.9] space-y-5 text-base"
                style={{ color: '#4A4E51' }}
              >
                {author.bio.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {skills.map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="border border-canopy/12 bg-canopy/[0.03] transition-colors duration-400 hover:border-gold hover:bg-gold/5 p-5 group"
                >
                  <Icon className="w-5 h-5 mb-3" style={{ color: '#D4AF37' }} />
                  <p className="font-body font-medium text-sm" style={{ color: '#1C2826' }}>
                    {label}
                  </p>
                  <p
                    className="text-[10px] mt-1 leading-snug font-body"
                    style={{ color: '#4A4E51' }}
                  >
                    {sub}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-5 mt-2">
              <Link
                href="#contact"
                className="inline-block px-[2.2rem] py-[0.9rem] bg-canopy text-linen font-body text-[0.68rem] font-semibold tracking-[0.25em] uppercase border border-canopy transition-all duration-400 hover:bg-transparent hover:text-canopy"
              >
                Conectar
              </Link>
              <Link
                href="#gallery"
                className="inline-block px-[2.2rem] py-[0.9rem] bg-transparent text-canopy font-body text-[0.68rem] font-medium tracking-[0.25em] uppercase border border-canopy/30 transition-all duration-400 hover:border-gold hover:text-gold"
              >
                Ver Portfolio
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
