'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Desplazamiento máximo en % de la altura del contenido. */
  amount?: number;
}

/**
 * El contenido se desplaza más despacio que la página mientras cruza la pantalla.
 * Se agranda un poco para que el movimiento nunca deje bordes vacíos.
 */
export default function Parallax({ children, className, amount = 8 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: 'none',
          scrollTrigger: { trigger: node.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });
    return () => ctx.revert();
  }, [amount]);

  return (
    <div ref={ref} className={cn('absolute inset-x-0 -inset-y-[10%]', className)}>
      {children}
    </div>
  );
}
