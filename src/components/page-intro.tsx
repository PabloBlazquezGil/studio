import type { ReactNode } from 'react';
import SplitHeading from './motion/split-heading';

/** Cabecera de las páginas interiores: etiqueta pequeña y título grande que se revela letra a letra. */
export default function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <header className="px-5 pb-10 pt-32 sm:px-10 sm:pt-44">
      <p className="text-sm font-medium text-gold">{eyebrow}</p>
      <SplitHeading
        as="h1"
        immediate
        lines={[title]}
        className="mt-3 text-6xl font-bold leading-[0.9] text-linen sm:text-8xl lg:text-9xl"
      />
      {children}
    </header>
  );
}
