import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { author, socialLinks } from '@/lib/data';

const siteMap = [
  { href: '/', label: 'Inicio' },
  { href: '/trabajos', label: 'Trabajos' },
  { href: '/sobre-mi', label: 'Sobre mí' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Footer() {
  return (
    <footer className="bg-canopy text-linen">
      {/* Llamada a la acción */}
      <section className="border-t border-linen/10 px-5 py-24 text-center sm:px-10 sm:py-32">
        <p className="text-sm font-medium text-gold">Trabaja conmigo</p>
        <Link
          href="/contacto"
          className="group mt-4 inline-block font-headline text-5xl font-bold uppercase leading-[0.95] transition-colors hover:text-gold sm:text-7xl lg:text-8xl"
        >
          Hagamos algo
          <br />
          memorable
        </Link>
        <div className="mt-8">
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-gold px-6 py-3 font-headline text-lg uppercase tracking-wide text-canopy transition-colors hover:bg-linen"
          >
            Escríbeme <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <div className="border-t border-linen/10 px-5 py-12 sm:px-10">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2">
            <p className="font-headline text-2xl uppercase">{author.name}</p>
            <p className="mt-2 max-w-xs text-sm text-linen/60">Fotografía y vídeo. Deporte, retrato, eventos y redes sociales.</p>
          </div>
          <FooterColumn title="Mapa del sitio" links={siteMap} />
          <FooterColumn title="Redes" links={socialLinks} external />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-linen/10 pt-6 text-xs text-linen/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {author.name}
          </p>
          <div className="flex gap-6">
            <Link href="/politica-de-privacidad" className="hover:text-gold">
              Privacidad
            </Link>
            <Link href="/aviso-legal" className="hover:text-gold">
              Aviso legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  external = false,
}: {
  title: string;
  links: { href: string; label: string }[];
  external?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-gold">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="font-headline text-lg uppercase tracking-wide text-linen/80 hover:text-gold"
              {...(external && !href.startsWith('mailto:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
