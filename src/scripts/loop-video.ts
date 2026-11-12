/**
 * Vídeos silenciosos en bucle para tarjetas y fondos (`<video data-loop data-src="…">`).
 * Solo descargan el archivo cuando están cerca de la pantalla y respetan el `#t=` de la URL
 * como punto de inicio de cada vuelta.
 *
 * Atributos: data-src (URL), data-eager (carga al montarse), data-playing="true" (reproduce siempre).
 * El carrusel de la home controla sus clips desde fuera con `controlLoopVideo`.
 */
type State = { load: boolean; inView: boolean; controlled: boolean; play: boolean };
const states = new WeakMap<HTMLVideoElement, State>();

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const startTime = (src: string) => {
  const match = src.match(/#t=([0-9]+(?:\.[0-9]+)?)/);
  return match ? parseFloat(match[1]) : 0;
};

function apply(video: HTMLVideoElement) {
  const state = states.get(video)!;
  const src = video.dataset.src ?? '';
  if (state.load && !video.getAttribute('src')) {
    video.preload = 'auto';
    video.src = src;
  }
  const shouldPlay = state.load && (state.controlled ? state.play : video.dataset.playing === 'true' || state.inView);
  if (shouldPlay && !reducedMotion()) video.play().catch(() => {});
  else video.pause();
}

function setup(video: HTMLVideoElement, controlled: boolean) {
  if (states.has(video)) return;
  const src = video.dataset.src ?? '';
  const start = startTime(src);
  states.set(video, { load: video.hasAttribute('data-eager'), inView: false, controlled, play: false });

  video.addEventListener('loadedmetadata', () => {
    if (start > 0) video.currentTime = start;
  });
  video.addEventListener('timeupdate', () => {
    // Al dar la vuelta el bucle vuelve al segundo 0: lo devolvemos al punto de inicio.
    if (start > 0 && video.currentTime < start - 0.5) video.currentTime = start;
  });

  if (!controlled) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const state = states.get(video)!;
        if (entry.isIntersecting) state.load = true;
        state.inView = entry.intersectionRatio > 0.2;
        apply(video);
      },
      { rootMargin: '300px 0px', threshold: [0, 0.2] },
    );
    observer.observe(video);
  }
  apply(video);
}

/** Carga y/o reproduce un clip desde fuera (carrusel). */
export function controlLoopVideo(video: HTMLVideoElement, load: boolean, play: boolean) {
  setup(video, true);
  const state = states.get(video)!;
  state.load = state.load || load;
  state.play = play;
  apply(video);
}

export function initLoopVideos(root: ParentNode = document) {
  root.querySelectorAll<HTMLVideoElement>('video[data-loop]:not([data-controlled])').forEach((v) => setup(v, false));
}
