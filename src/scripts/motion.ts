import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initLoopVideos } from './loop-video';

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Scroll suave (Lenis) sincronizado con GSAP ScrollTrigger. Se desactiva con "reducir movimiento".
 * Los paneles fijos (menú móvil, visor de fotos) llevan `data-lenis-prevent`.
 */
function smoothScroll() {
  if (reduced) return;
  const lenis = new Lenis({ duration: 1.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/** Titulares que se revelan letra a letra (SplitHeading). */
function splitHeadings() {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((node) => {
    const chars = node.querySelectorAll('[data-char]');
    if (!chars.length) return;
    const immediate = node.hasAttribute('data-immediate');
    gsap.from(chars, {
      yPercent: 110,
      duration: 0.9,
      ease: 'power4.out',
      stagger: 0.025,
      delay: immediate ? 0.3 : 0,
      scrollTrigger: immediate ? undefined : { trigger: node, start: 'top 85%' },
    });
  });
}

/** El contenido se desplaza más despacio que la página mientras cruza la pantalla. */
function parallax() {
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((node) => {
    const amount = Number(node.dataset.parallax) || 8;
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
}

/** Dos filas de texto gigante que se desplazan en sentidos opuestos. */
function marquee() {
  document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((node) => {
    const trigger = { trigger: node, start: 'top bottom', end: 'bottom top', scrub: true };
    const rows = node.querySelectorAll('[data-row]');
    gsap.fromTo(rows[0], { xPercent: 0 }, { xPercent: -25, ease: 'none', scrollTrigger: trigger });
    gsap.fromTo(rows[1], { xPercent: -25 }, { xPercent: 0, ease: 'none', scrollTrigger: trigger });
  });
}

/** Al bajar, el vídeo de la home se acerca y se oscurece mientras la página sube por encima. */
function heroZoom() {
  const section = document.querySelector<HTMLElement>('[data-hero]');
  const media = section?.querySelector<HTMLElement>('[data-hero-media]');
  if (!section || !media) return;
  gsap.to(media, {
    scale: 1.15,
    opacity: 0.4,
    ease: 'none',
    scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
  });
}

/** Aparece con un fundido y un ligero desplazamiento la primera vez que entra en pantalla (Reveal). */
function reveal() {
  const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1 },
  );
  nodes.forEach((node) => observer.observe(node));
}

smoothScroll();
reveal();
initLoopVideos();
if (!reduced) {
  splitHeadings();
  parallax();
  marquee();
  heroZoom();
}
// Recalcula las animaciones cuando ya se conoce la altura real de la página.
window.addEventListener('load', () => ScrollTrigger.refresh());
document.addEventListener('studio:layout-change', () => ScrollTrigger.refresh());
