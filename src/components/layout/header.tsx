import Link from 'next/link';
import AnimatedLogo from '@/components/animated-logo';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-24 text-foreground mix-blend-difference">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          <AnimatedLogo />
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#gallery" className="hover:text-primary transition-colors">Trabajos</Link>
          <Link href="#about" className="hover:text-primary transition-colors">Sobre mí</Link>
          <Link href="#contact" className="hover:text-primary transition-colors">Contacto</Link>
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </div>
    </header>
  );
}
