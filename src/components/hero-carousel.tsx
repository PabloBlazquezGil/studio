'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { HeroSlide, Project } from '@/lib/types';
import { cn } from '@/lib/utils';
import LoopVideo from './loop-video';

const SLIDE_DURATION = 7000;

interface HeroCarouselProps {
  slides: (HeroSlide & { project: Project })[];
}

/**
 * Carrusel de vídeos a pantalla completa con indicadores tipo "stories":
 * cada barra se llena mientras dura su clip y se puede saltar tocando una barra.
 */
export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setCurrent((i) => (i + 1) % slides.length), SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [current, slides.length]);

  const active = slides[current];

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-canopy">
      {slides.map((slide, index) => (
        <div
          key={slide.videoUrl}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            index === current ? 'opacity-100' : 'opacity-0',
          )}
          aria-hidden={index !== current}
        >
          {/* Solo se descargan el clip actual y el siguiente */}
          {(index === current || index === (current + 1) % slides.length) && (
            <LoopVideo src={slide.videoUrl} playing={index === current} eager />
          )}
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-canopy/60 via-transparent to-canopy/70" />

      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-8 sm:px-10 sm:pb-10">
        <Link href={`/trabajos/${active.project.slug}`} className="group inline-block">
          <p className="text-xs font-medium text-gold">{active.project.client}</p>
          <p className="mt-1 font-headline text-2xl uppercase leading-none text-linen transition-colors group-hover:text-gold sm:text-3xl">
            {active.project.title}
          </p>
        </Link>

        <div className="mt-6 flex gap-2" role="tablist" aria-label="Clips del showreel">
          {slides.map((slide, index) => (
            <button
              key={slide.videoUrl}
              type="button"
              role="tab"
              aria-selected={index === current}
              aria-label={`Clip ${index + 1}: ${slide.project.title}`}
              onClick={() => setCurrent(index)}
              className="group relative h-6 flex-1 sm:max-w-24"
            >
              <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-linen/25 transition-colors group-hover:bg-linen/50" />
              <span
                key={`${current}-${index}`}
                className={cn(
                  'absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-linen',
                  index < current && 'w-full',
                  index > current && 'w-0',
                  index === current && 'w-0 animate-progress',
                )}
                style={index === current ? { animationDuration: `${SLIDE_DURATION}ms` } : undefined}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
