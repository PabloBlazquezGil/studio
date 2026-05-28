'use client';

import Image from 'next/image';
import ScrollReveal from './scroll-reveal';
import { clientLogos } from '@/lib/data';

export default function ClientsSection() {
  if (!clientLogos || clientLogos.length === 0) return null;

  return (
    /* Light section — alternates with dark gallery sections */
    <section className="py-24 sm:py-28" style={{ backgroundColor: '#F9F8F6' }}>
      <ScrollReveal className="container mx-auto px-6 sm:px-8 lg:px-16">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="label-eyebrow mb-4" style={{ color: '#D4AF37' }}>
            Clientes
          </p>
          <div className="divider-gold mx-auto mb-6" />
          <h2
            className="font-headline text-2xl sm:text-3xl font-light"
            style={{ color: '#1C2826', letterSpacing: '0.2em' }}
          >
            Con la confianza de
          </h2>
        </div>

        {/* Logo grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-x-12 gap-y-8 items-center max-w-5xl mx-auto">
          {clientLogos.map((logo) => (
            <div key={logo.id} className="flex justify-center">
              <Image
                src={logo.logoUrl}
                alt={logo.clientName}
                width={160}
                height={60}
                className="object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
                style={{ opacity: 0.65 }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '0.65')}
              />
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
