'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Comparison } from '@/lib/types';

/**
 * Comparador antes/después: la foto editada se recorta sobre la original
 * y una barra vertical (arrastrable, o con las flechas del teclado) marca el corte.
 */
export default function BeforeAfter({ comparison }: { comparison: Comparison }) {
  const [position, setPosition] = useState(50);

  return (
    <figure>
      <div className="relative aspect-[3/2] select-none overflow-hidden bg-black/30">
        <Image src={comparison.before} alt={`${comparison.title}, sin editar`} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image src={comparison.after} alt={`${comparison.title}, editada`} fill sizes="100vw" className="object-cover" />
        </div>

        <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-gold" style={{ left: `${position}%` }}>
          <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-gold font-headline text-sm text-canopy">
            ⟷
          </span>
        </div>
        <span className="absolute left-4 top-4 bg-canopy/70 px-2 py-1 text-xs text-linen">Editada</span>
        <span className="absolute right-4 top-4 bg-canopy/70 px-2 py-1 text-xs text-linen">Original</span>

        {/* El control real es un range invisible a pantalla completa: funciona con ratón, dedo y teclado. */}
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label={`Comparar ${comparison.title}: original y editada`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-3 font-headline text-xl uppercase tracking-wide text-linen">{comparison.title}</figcaption>
    </figure>
  );
}
