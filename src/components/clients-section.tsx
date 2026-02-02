'use client';

import Image from 'next/image';
import ScrollReveal from './scroll-reveal';
import { clientLogos } from '@/lib/data';

export default function ClientsSection() {

  if (!clientLogos || clientLogos.length === 0) {
    // Don't render the section if there are no logos to display
    return null;
  }
  
  return (
    <section className="py-24 sm:py-32 bg-background">
      <ScrollReveal className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-headline text-3xl text-foreground mb-16">Con la confianza de...</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-12 gap-y-8 items-center max-w-5xl mx-auto">
          {clientLogos.map((logo) => (
            <div key={logo.id} className="flex justify-center">
              <Image
                src={logo.logoUrl}
                alt={logo.clientName}
                width={180}
                height={70}
                className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
