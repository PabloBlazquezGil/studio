import type { ReactNode } from 'react';

/** Cabecera de las páginas interiores: etiqueta pequeña y título grande. */
export default function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <header className="px-5 pb-10 pt-32 sm:px-10 sm:pt-44">
      <p className="text-sm font-medium text-gold">{eyebrow}</p>
      <h1 className="mt-3 font-headline text-6xl uppercase leading-[0.9] text-linen sm:text-8xl lg:text-9xl">{title}</h1>
      {children}
    </header>
  );
}
