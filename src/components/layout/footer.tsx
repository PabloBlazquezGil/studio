import { ContactForm } from '@/components/contact-form';
import { Copyright, Instagram, Linkedin, Mail } from "lucide-react";
import Link from 'next/link';

const socials = [
  { icon: Instagram, href: 'https://instagram.com/pabloblazquezgil', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/in/pabloblazquezgil', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:pabloblazquezgil@gmail.com', label: 'Email' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-background border-t border-white/5" id="contact">

      {/* Top subtle line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 scroll-mt-24 text-center">
        {/* Header */}
        <div className="max-w-3xl mb-16 mx-auto">
          <p className="text-white/60 uppercase tracking-[0.3em] text-xs font-light mb-4">Contacto</p>
          <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight font-light tracking-tight">
            Hagamos algo<br/>
            <span className="font-medium italic text-white/80">
              memorable juntos.
            </span>
          </h2>
          <p className="mt-6 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            ¿Tienes un proyecto en mente? Cuéntame lo que necesitas y buscamos la forma de hacerlo realidad, o escríbeme directamente a <a href="mailto:pabloblazquezgil@gmail.com" className="text-white hover:underline font-medium">pabloblazquezgil@gmail.com</a>.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between text-center text-muted-foreground gap-4">
          <div className="flex items-center text-sm">
            <Copyright className="w-3 h-3 mr-2" />
            <p>{currentYear} Pablo Blázquez Gil. Todos los Derechos Reservados.</p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-5">
            {socials.map(({ icon: Icon, href, label }) => (
              <Link key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="text-muted-foreground hover:text-white transition-colors"
              >
                <Icon className="w-4 h-4" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6 text-xs">
            <Link href="/politica-de-privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link>
            <Link href="/aviso-legal" className="hover:text-white transition-colors">Aviso Legal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
