'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { author, logoUrl } from '@/lib/data';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/trabajos', label: 'Trabajos' },
  { href: '/sobre-mi', label: 'Sobre mí' },
  { href: '/contacto', label: 'Contacto' },
];

/** Las páginas que empiezan con un vídeo o imagen a pantalla completa llevan la cabecera transparente. */
const hasFullBleedHero = (pathname: string) => pathname === '/' || /^\/trabajos\/[^/]+$/.test(pathname);

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const solid = scrolled || !hasFullBleedHero(pathname);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        solid ? 'bg-canopy/95 backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <div className="flex h-16 items-center justify-between px-5 sm:h-20 sm:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label={`${author.name}, inicio`}>
          <span className="relative h-8 w-8 shrink-0 sm:h-9 sm:w-9">
            <Image src={logoUrl} alt="" fill sizes="36px" className="object-contain" priority unoptimized />
          </span>
          <span className="font-headline text-lg uppercase tracking-[0.12em] text-linen sm:text-xl">{author.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'font-headline text-lg uppercase tracking-wide transition-colors hover:text-gold',
                pathname.startsWith(href) ? 'text-gold' : 'text-linen',
              )}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contacto"
            className="border border-gold px-4 py-1.5 font-headline text-lg uppercase tracking-wide text-gold transition-colors hover:bg-gold hover:text-canopy"
          >
            Presupuesto
          </Link>
        </nav>

        <button
          type="button"
          className="p-2 text-linen md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <nav
          className="fixed inset-x-0 bottom-0 top-16 flex flex-col justify-between bg-canopy px-5 pb-10 pt-8 md:hidden"
          aria-label="Menú móvil"
          data-lenis-prevent
        >
          <ul className="space-y-2">
            {[{ href: '/', label: 'Inicio' }, ...navLinks].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block font-headline text-5xl uppercase leading-tight text-linen hover:text-gold"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contacto"
            onClick={() => setMenuOpen(false)}
            className="block bg-gold py-4 text-center font-headline text-xl uppercase tracking-wide text-canopy"
          >
            Pide presupuesto
          </Link>
        </nav>
      )}
    </header>
  );
}
