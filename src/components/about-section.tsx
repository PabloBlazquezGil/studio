'use client';
import Image from 'next/image';
import ScrollReveal from './scroll-reveal';
import Link from 'next/link';
import { author } from '@/lib/data';
import { Camera, Film, Star } from 'lucide-react';

const skills = [
  { icon: Camera, label: 'Fotografía', sub: 'Retrato · Deporte · Evento' },
  { icon: Film, label: 'Vídeo', sub: 'Corporativo · Cinemático · Social' },
  { icon: Star, label: 'Postproducción', sub: 'Edición · Color · Motion' },
];

export default function AboutSection() {
    if (!author) return null;

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden bg-background scroll-mt-24">

      {/* Faint watermark background */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none select-none">
        <p className="text-[20vw] lg:text-[15vw] leading-none font-black font-headline whitespace-nowrap animate-marquee text-foreground">
          {author.name.toUpperCase()} – {author.name.toUpperCase()} –&nbsp;
        </p>
      </div>

      <ScrollReveal className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[#4FD1C5] uppercase tracking-[0.3em] text-xs font-light mb-3">El artista</p>
          <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-foreground">Sobre Mí</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">
          {/* Photo */}
          <div className="lg:col-span-2">
            <ScrollReveal className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl shadow-black group">
              <Image
                src={author.imageUrl}
                alt={author.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              {/* Cyan bottom tint */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4FD1C5]/20 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4FD1C5]/60" />
            </ScrollReveal>
          </div>

          {/* Text */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            <div>
              <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl text-foreground mb-6 leading-snug">
                {author.title}
              </h3>
              <div className="text-muted-foreground leading-relaxed space-y-4 text-base sm:text-lg">
                {author.bio.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="grid grid-cols-3 gap-4">
              {skills.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="border border-gray-800 rounded-lg p-4 hover:border-[#4FD1C5]/50 transition-colors group">
                  <Icon className="w-5 h-5 text-[#4FD1C5] mb-3" />
                  <p className="font-bold text-white text-sm">{label}</p>
                  <p className="text-[10px] text-gray-500 mt-1 leading-snug">{sub}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="#contact"
                className="inline-block px-8 py-3 bg-[#4FD1C5] text-black font-bold text-sm uppercase tracking-widest rounded hover:bg-[#38a198] transition-colors"
              >
                Ponte en Contacto
              </Link>
              <Link
                href="#gallery"
                className="inline-block px-8 py-3 border border-white/20 text-white text-sm uppercase tracking-widest rounded hover:border-[#4FD1C5] hover:text-[#4FD1C5] transition-colors"
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
