'use client';

import { useEffect, useRef, useState } from 'react';
import { cn, getStartTime } from '@/lib/utils';

interface LoopVideoProps {
  src: string;
  className?: string;
  /**
   * Controla la reproducción desde fuera (p. ej. el carrusel).
   * Si no se indica, el vídeo se reproduce cuando está en pantalla y se pausa al salir.
   */
  playing?: boolean;
  /** Carga el vídeo nada más montarse en lugar de esperar a que se acerque a la pantalla. */
  eager?: boolean;
}

/**
 * Vídeo silencioso en bucle para tarjetas y fondos.
 * Solo descarga el archivo cuando está cerca de la pantalla y respeta el `#t=` de la URL
 * como punto de inicio de cada vuelta.
 */
export default function LoopVideo({ src, className, playing, eager = false }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(eager);
  const [inView, setInView] = useState(false);
  const startTime = getStartTime(src);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoad(true);
        setInView(entry.intersectionRatio > 0.2);
      },
      { rootMargin: '300px 0px', threshold: [0, 0.2] },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const shouldPlay = shouldLoad && (playing ?? inView);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (shouldPlay && !reducedMotion) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [shouldPlay]);

  return (
    <video
      ref={ref}
      src={shouldLoad ? src : undefined}
      className={cn('h-full w-full object-cover', className)}
      muted
      loop
      playsInline
      preload={shouldLoad ? 'auto' : 'none'}
      aria-hidden
      onLoadedMetadata={(e) => {
        if (startTime > 0) e.currentTarget.currentTime = startTime;
      }}
      onTimeUpdate={(e) => {
        // Al dar la vuelta el bucle vuelve al segundo 0: lo devolvemos al punto de inicio.
        if (startTime > 0 && e.currentTarget.currentTime < startTime - 0.5) {
          e.currentTarget.currentTime = startTime;
        }
      }}
    />
  );
}
