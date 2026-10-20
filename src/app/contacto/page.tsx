import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/contact-form';
import PageIntro from '@/components/page-intro';
import { contactEmail, socialLinks } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Cuéntame tu proyecto de fotografía o vídeo y te preparo un presupuesto.',
};

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Contacto" title="Hablemos" />

      <section className="grid gap-16 px-5 pb-24 sm:px-10 lg:grid-cols-[2fr_3fr] lg:gap-24">
        <div className="space-y-10">
          <p className="max-w-md text-lg leading-relaxed text-linen/70">
            ¿Tienes un proyecto en mente? Cuéntame lo que necesitas y buscamos la forma de hacerlo realidad.
          </p>
          <div>
            <p className="text-xs font-medium text-gold">Email</p>
            <a
              href={`mailto:${contactEmail}`}
              className="mt-2 block break-all font-headline text-2xl tracking-wide text-linen hover:text-gold sm:text-3xl"
            >
              {contactEmail}
            </a>
          </div>
          <div>
            <p className="text-xs font-medium text-gold">Redes</p>
            <ul className="mt-2 space-y-1">
              {socialLinks
                .filter((link) => !link.href.startsWith('mailto:'))
                .map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-headline text-2xl uppercase tracking-wide text-linen hover:text-gold"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
