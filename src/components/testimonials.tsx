import { testimonials } from '@/lib/data';
import Reveal from './reveal';

/** Opiniones de clientes en tipografía grande. No se muestra hasta que haya alguna en data.ts. */
export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="border-t border-linen/10 px-5 py-24 sm:px-10 sm:py-32" aria-label="Opiniones de clientes">
      <p className="text-sm font-medium text-gold">Lo que dicen</p>
      <div className="mt-10 grid gap-16 lg:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 120}>
            <blockquote>
              <p className="font-headline text-3xl uppercase leading-tight text-linen sm:text-4xl">“{t.quote}”</p>
              <footer className="mt-6 text-sm text-linen/60">
                <span className="text-linen">{t.name}</span> · {t.role}
              </footer>
            </blockquote>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
