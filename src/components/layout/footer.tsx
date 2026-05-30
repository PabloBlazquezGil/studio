import { ContactForm } from '@/components/contact-form';
import { Instagram, Linkedin, Mail } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

const socials = [
  { icon: Instagram, href: 'https://instagram.com/pabloblazquezgil',  label: 'Instagram' },
  { icon: Linkedin,  href: 'https://linkedin.com/in/pabloblazquezgil', label: 'LinkedIn'  },
  { icon: Mail,      href: 'mailto:pabloblazquezgil@gmail.com',        label: 'Email'     },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full" id="contact" style={{ backgroundColor: '#1C2826' }}>

      {/* ── Top gold accent line ──────────────────────────────────── */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      {/* ── Contact section ───────────────────────────────────────── */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 py-24 sm:py-32 scroll-mt-24">

        {/* Two-column: heading left / form right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: heading block */}
          <div>
            <p className="label-eyebrow mb-4">Contacto</p>
            <div className="divider-gold mb-8" />
            <h2
              className="font-headline text-4xl sm:text-5xl lg:text-6xl text-linen font-light leading-[1.15]"
              style={{ letterSpacing: '0.15em' }}
            >
              Hagamos algo<br />
              <span style={{ color: '#D4AF37', fontWeight: 300 }}>memorable.</span>
            </h2>
            <p className="mt-8 font-body text-sm leading-[1.9] max-w-md" style={{ color: 'rgba(249,248,246,0.5)' }}>
              ¿Tienes un proyecto en mente? Cuéntame lo que necesitas y buscamos la
              forma de hacerlo realidad, o escríbeme directamente a{' '}
              <a
                href="mailto:pabloblazquezgil@gmail.com"
                className="transition-colors duration-400"
                style={{ color: '#D4AF37' }}
              >
                pabloblazquezgil@gmail.com
              </a>
              .
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-6 mt-12">
              {socials.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-linen/40 hover:text-gold transition-colors duration-400"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* ── Gold mid divider ─────────────────────────────────────── */}
      <div className="h-[1px] mx-16 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* ── Bottom bar ───────────────────────────────────────────── */}
      <div style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}>
        <div className="container mx-auto px-6 sm:px-8 lg:px-16 py-7 flex flex-col sm:flex-row items-center justify-between gap-5">

          {/* Logo mark + brand name */}
          <div className="flex items-center gap-3">
            <div className="relative w-7 h-7 border border-gold/25 overflow-hidden">
              <Image
                src="https://thundershoot.com/wp-content/uploads/2026/05/Logo-Pablo-Blazquez.png"
                alt="PBG"
                fill
                className="object-contain p-0.5"
                unoptimized
              />
            </div>
            <span
              className="font-headline text-[9px] tracking-[0.35em] uppercase"
              style={{ color: 'rgba(249,248,246,0.4)', letterSpacing: '0.35em' }}
            >
              &copy; {currentYear} Pablo Blázquez Gil
            </span>
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-6">
            <Link
              href="/politica-de-privacidad"
              className="font-body text-[10px] uppercase tracking-[0.2em] transition-colors duration-400 text-linen/30 hover:text-gold"
            >
              Privacidad
            </Link>
            <Link
              href="/aviso-legal"
              className="font-body text-[10px] uppercase tracking-[0.2em] transition-colors duration-400 text-linen/30 hover:text-gold"
            >
              Aviso Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
