'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

interface ProjectGalleryProps {
  title: string;
  images: string[];
}

/** Galería en cuadrícula de tres columnas con visor a pantalla completa (teclado: ← → Esc). */
export default function ProjectGallery({ title, images }: ProjectGalleryProps) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (delta: number) => setOpen((i) => (i === null ? i : (i + delta + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, step]);

  return (
    <>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((url, index) => (
          <button
            key={url}
            type="button"
            onClick={() => setOpen(index)}
            className="group relative aspect-[3/2] overflow-hidden bg-black/30"
            aria-label={`Ampliar imagen ${index + 1} de ${title}`}
          >
            <Image
              src={url}
              alt={`${title}, imagen ${index + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95"
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-label={`${title}: imagen ${open + 1} de ${images.length}`}
          onClick={close}
        >
          <div className="relative h-[85vh] w-[92vw]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[open]}
              alt={`${title}, imagen ${open + 1}`}
              fill
              sizes="92vw"
              className="object-contain"
              priority
            />
          </div>
          <p className="absolute left-5 top-5 text-sm text-linen/60">
            {open + 1} / {images.length}
          </p>
          <button type="button" onClick={close} aria-label="Cerrar" className="absolute right-4 top-4 p-2 text-linen/70 hover:text-gold">
            <X className="h-6 w-6" />
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Imagen anterior"
                className="absolute left-2 top-1/2 -translate-y-1/2 p-3 text-linen/70 hover:text-gold sm:left-5"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Imagen siguiente"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-linen/70 hover:text-gold sm:right-5"
              >
                <ArrowRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
