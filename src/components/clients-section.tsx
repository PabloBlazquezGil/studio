import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import ScrollReveal from './scroll-reveal';

export default function ClientsSection() {
  const logos = PlaceHolderImages.filter(p => p.id.startsWith('client-logo-')).slice(0, 6);
  const allLogos = [...logos, ...logos, ...logos, ...logos]; // Duplicate for infinite scroll effect

  return (
    <section className="py-24 sm:py-32 bg-background">
      <ScrollReveal className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-headline text-3xl text-foreground mb-12">Con la Confianza de Líderes de la Industria</h2>
        <div className="relative w-full overflow-hidden mask-image-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
          <div className="flex animate-marquee-slow">
            {allLogos.map((logo, index) => (
              <div key={`${logo.id}-${index}`} className="flex-shrink-0 mx-8 flex items-center justify-center h-24">
                <Image
                  src={logo.imageUrl}
                  alt={logo.description}
                  width={150}
                  height={75}
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  data-ai-hint={logo.imageHint}
                />
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
