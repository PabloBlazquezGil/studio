import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { Lang } from '@/i18n/routes';
import { useTranslations } from '@/i18n/ui';

interface ProjectGalleryProps {
  title: string;
  /** Fotos con su texto alternativo y, si existe sin pérdida visible, su `srcset` AVIF. */
  images: { url: string; alt: string; avif?: string }[];
  lang: Lang;
}

/** Galería en cuadrícula de tres columnas con visor a pantalla completa (teclado: ← → Esc). */
export default function ProjectGallery({ title, images, lang }: ProjectGalleryProps) {
  const t = useTranslations(lang).gallery;
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const touchX = useRef(0);

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
    closeButton.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, step]);

  // Al cerrar el visor, el foco vuelve a la miniatura que lo abrió.
  useEffect(() => {
    if (open === null) opener.current?.focus();
  }, [open]);

  return (
    <>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {images.map(({ url, alt, avif }, index) => (
          <button
            key={url}
            type="button"
            onClick={(e) => {
              opener.current = e.currentTarget;
              setOpen(index);
            }}
            className="group relative aspect-3/2 overflow-hidden bg-black/30"
            aria-label={t.open(index + 1, title)}
          >
            <picture>
              {avif && <source type="image/avif" srcSet={avif} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />}
              <img
                src={url}
                alt={alt}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </picture>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/95"
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-label={t.dialog(title, open + 1, images.length)}
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          }}
        >
          <div className="relative h-[85vh] w-[92vw]" onClick={(e) => e.stopPropagation()}>
            <picture key={images[open].url}>
              {images[open].avif && <source type="image/avif" srcSet={images[open].avif} sizes="92vw" />}
              <img
                src={images[open].url}
                alt={images[open].alt}
                sizes="92vw"
                className="absolute inset-0 h-full w-full object-contain"
              />
            </picture>
          </div>
          <p className="absolute left-5 top-5 text-sm text-linen/60">
            {open + 1} / {images.length}
          </p>
          <button ref={closeButton} type="button" onClick={close} aria-label={t.close} className="absolute right-4 top-4 p-2 text-linen/70 hover:text-gold">
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
                aria-label={t.prev}
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
                aria-label={t.next}
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
