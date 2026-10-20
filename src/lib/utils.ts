import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extrae el ID de 11 caracteres de un vídeo de YouTube a partir de su URL.
 * Soporta formatos: youtu.be, youtube.com/watch, youtube.com/embed y youtube.com/shorts
 */
export function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\/shorts\/)([^#&?]*).*/);
  return match && match[2].length === 11 ? match[2] : null;
}

/** true si la URL apunta a un archivo de vídeo (mp4, webm, ogg, mov). */
export function isVideoFile(url: string): boolean {
  return /\.(mp4|webm|ogg|mov)$/i.test(url.split('#')[0].split('?')[0]);
}

/** Segundo de inicio indicado con un fragmento `#t=5` en la URL del vídeo. */
export function getStartTime(url: string): number {
  const match = url.match(/#t=([0-9]+(?:\.[0-9]+)?)/);
  return match ? parseFloat(match[1]) : 0;
}
