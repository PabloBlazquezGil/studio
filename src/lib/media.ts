import media from '@/data/media.json';

/**
 * Versiones optimizadas de los medios de archivos.thundershoot.com, generadas por
 * scripts/media/optimize.py solo cuando no hay pérdida visible (ver docs/medios-optimizados.md).
 * Si una foto o vídeo no aparece aquí, se usa el original tal cual.
 */
interface Version {
  src: string;
  width: number;
  height: number;
}

const photos = media.photos as Record<string, Version[]>;
const posters = media.posters as Record<string, Version>;

function key(url: string): string | undefined {
  const clean = url.split('#')[0];
  return clean.startsWith(media.base) ? clean.slice(media.base.length) : undefined;
}

/** `srcset` AVIF de una foto (2048 px y tamaño completo), o undefined si se queda con el JPG. */
export function avifSrcset(url: string): string | undefined {
  const k = key(url);
  const versions = k ? photos[k] : undefined;
  return versions?.length ? versions.map((v) => `${v.src} ${v.width}w`).join(', ') : undefined;
}

/** Póster (fotograma inicial) de un vídeo, para que se vea algo mientras carga. */
export function posterFor(url: string): string | undefined {
  const k = key(url);
  return k ? posters[k]?.src : undefined;
}
