'use client';

import { useEffect, useRef, type ElementType } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface SplitHeadingProps {
  /** Líneas del titular; cada una se revela por separado. Las palabras entre `*` van en dorado. */
  lines: string[];
  as?: ElementType;
  className?: string;
  /** Anima al cargar en lugar de al entrar en pantalla (para cabeceras). */
  immediate?: boolean;
}

/** Titular que se revela letra a letra deslizando desde abajo. */
export default function SplitHeading({ lines, as: Tag = 'h2', className, immediate = false }: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from(node.querySelectorAll('[data-char]'), {
        yPercent: 110,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.025,
        delay: immediate ? 0.3 : 0,
        scrollTrigger: immediate ? undefined : { trigger: node, start: 'top 85%' },
      });
    }, node);
    return () => ctx.revert();
  }, [immediate]);

  const label = lines.join(' ').replace(/\*/g, '');

  return (
    <Tag ref={ref} className={cn('font-headline uppercase', className)} aria-label={label}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]" aria-hidden>
          {line.split(/(\*[^*]+\*)/).filter(Boolean).map((part, j) => {
            const highlighted = part.startsWith('*');
            const text = highlighted ? part.slice(1, -1) : part;
            return (
              <span key={j} className={highlighted ? 'text-gold' : undefined}>
                {text.split(/(\s+)/).map((word, k) =>
                  /^\s+$/.test(word) ? (
                    ' '
                  ) : (
                    // Cada palabra va junta para que el salto de línea nunca la parta.
                    <span key={k} className="inline-block whitespace-nowrap">
                      {Array.from(word).map((char, c) => (
                        <span key={c} data-char className="inline-block">
                          {char}
                        </span>
                      ))}
                    </span>
                  ),
                )}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
