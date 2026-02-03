"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AnimatedLogo from '@/components/animated-logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial render

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
      scrolled ? 'bg-background' : 'bg-transparent'
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-24 text-foreground">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          <AnimatedLogo />
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#gallery" className="hover:text-primary transition-colors">Trabajos</Link>
            <Link href="/#about" className="hover:text-primary transition-colors">Sobre mí</Link>
            <Link href="/#contact" className="hover:text-primary transition-colors">Contacto</Link>
          </nav>
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
                  <SheetClose asChild>
                    <Link href="/#gallery" className="hover:text-primary transition-colors">Trabajos</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/#about" className="hover:text-primary transition-colors">Sobre mí</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/#contact" className="hover:text-primary transition-colors">Contacto</Link>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
