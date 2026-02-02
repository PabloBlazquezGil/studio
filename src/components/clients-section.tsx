'use client';

import Image from 'next/image';
import ScrollReveal from './scroll-reveal';
import { clientLogos } from '@/lib/data';

export default function ClientsSection() {

  if (!clientLogos || clientLogos.length === 0) {
    // Don't render the section if there are no logos to display
    return null;
  }
  
  const allLogos = [...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos]; // Duplicate for infinite scroll effect

  return (
    <section className="py-24 sm:py-32 bg-background">
      <ScrollReveal className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-headline text-3xl text-foreground mb-12">Con la confianza de...</h2>
        <div className="relative w-full overflow-hidden mask-image-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
          <div className="flex animate-marquee-slow">
            {allLogos.map((logo, index) => (
              <div key={`${logo.id}-${index}`} className="flex-shrink-0 mx-8 flex items-center justify-center h-24">
                <Image
                  src={logo.logoUrl}
                  alt={logo.clientName}
                  width={150}
                  height={75}
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
