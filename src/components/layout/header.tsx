"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AnimatedLogo from '@/components/animated-logo';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/#gallery', label: 'Trabajos' },
  { href: '/#about',   label: 'Sobre mí' },
  { href: '/#contact', label: 'Contacto' },
];

export default function Header() {
  const [scrolled, setScrolled]           = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-500',
        scrolled
          ? 'bg-canopy/95 backdrop-blur-sm border-b border-gold/10 shadow-[0_1px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      )}
    >
      {/* Top gold accent line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-16 flex items-center justify-between h-20">

        {/* Logo / Isotipo */}
        <Link href="/" aria-label="Pablo Blázquez Gil — Inicio">
          <AnimatedLogo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Navegación principal">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-link text-foreground/70 hover-gold hover:text-gold"
              style={{ letterSpacing: '0.2em', fontSize: '0.68rem', fontWeight: 500 }}
            >
              {label}
            </Link>
          ))}

          {/* CTA highlight */}
          <Link
            href="/#contact"
            className="nav-link px-5 py-2 border border-gold/50 text-gold hover:bg-gold hover:text-canopy"
            style={{ letterSpacing: '0.2em', fontSize: '0.68rem' }}
          >
            Presupuesto
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="p-2 text-foreground/70 hover:text-gold transition-colors duration-400"
                aria-label="Abrir menú"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[280px] bg-canopy border-l border-gold/10 flex flex-col"
            >
              {/* Mobile logo */}
              <div className="pt-6 pb-10 border-b border-gold/10">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <AnimatedLogo />
                </Link>
              </div>

              {/* Mobile links */}
              <nav className="flex flex-col gap-2 py-10" aria-label="Menú móvil">
                {navLinks.map(({ href, label }) => (
                  <SheetClose asChild key={href}>
                    <Link
                      href={href}
                      className="font-body text-foreground/60 hover:text-gold py-3 px-2 border-b border-gold/5 nav-link"
                      style={{ letterSpacing: '0.25em', fontSize: '0.75rem' }}
                    >
                      {label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    href="/#contact"
                    className="mt-6 px-6 py-3 bg-gold text-canopy font-body font-semibold text-center nav-link hover:bg-gold/80"
                    style={{ letterSpacing: '0.2em', fontSize: '0.7rem' }}
                  >
                    Presupuesto
                  </Link>
                </SheetClose>
              </nav>

              {/* Bottom gold line */}
              <div className="mt-auto pb-6">
                <div className="line-gold" />
                <p className="font-body text-[9px] tracking-[0.3em] text-foreground/30 uppercase mt-4 px-2">
                  © {new Date().getFullYear()} Pablo Blázquez Gil
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
