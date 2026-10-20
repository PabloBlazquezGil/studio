'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Dos filas de texto gigante que se desplazan en sentidos opuestos al hacer scroll.
 * La segunda fila va en contorno para dar ritmo.
 */
export default function ScrollMarquee({ words }: { words: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const line = `${words.join(' · ')} · `;

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const trigger = { trigger: node, start: 'top bottom', end: 'bottom top', scrub: true };
      gsap.fromTo('[data-row="1"]', { xPercent: 0 }, { xPercent: -25, ease: 'none', scrollTrigger: trigger });
      gsap.fromTo('[data-row="2"]', { xPercent: -25 }, { xPercent: 0, ease: 'none', scrollTrigger: trigger });
    }, node);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="overflow-hidden py-16 sm:py-24" aria-hidden>
      {[1, 2].map((row) => (
        <p
          key={row}
          data-row={row}
          className={
            row === 1
              ? 'whitespace-nowrap font-headline text-[18vw] uppercase leading-[0.85] text-linen sm:text-[12vw]'
              : 'whitespace-nowrap font-headline text-[18vw] uppercase leading-[0.85] text-transparent [-webkit-text-stroke:1px_theme(colors.gold)] sm:text-[12vw]'
          }
        >
          {line.repeat(4)}
        </p>
      ))}
    </div>
  );
}
