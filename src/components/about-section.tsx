import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import ScrollReveal from './scroll-reveal';
import { Button } from './ui/button';
import Link from 'next/link';

export default function AboutSection() {
  const authorImage = PlaceHolderImages.find(p => p.id === 'about-author');

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-[0.02] text-foreground/20 -z-0">
        <p className="text-[20vw] lg:text-[15vw] leading-none font-black font-headline whitespace-nowrap animate-marquee">
          PABLO BLÁZQUEZ GIL – PABLO BLÁZQUEZ GIL –&nbsp;
        </p>
        <p className="text-[20vw] lg:text-[15vw] leading-none font-black font-headline whitespace-nowrap animate-marquee2">
          PABLO BLÁZQUEZ GIL – PABLO BLÁZQUEZ GIL –&nbsp;
        </p>
      </div>
      <ScrollReveal className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <ScrollReveal className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={authorImage?.imageUrl || ''}
                alt="Pablo Blázquez Gil"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                data-ai-hint={authorImage?.imageHint}
              />
            </ScrollReveal>
          </div>
          <div className="lg:col-span-3">
            <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-foreground">
              Un Narrador Detrás del Lente
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Mi nombre es Pablo Blázquez Gil. Con una pasión por la narrativa visual, he pasado más de una década perfeccionando mi arte, transformando momentos fugaces en historias atemporales. Mi trabajo es una mezcla de arte cinematográfico y emoción auténtica, buscando la belleza tanto en lo grandioso como en lo sutil.
            </p>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Desde campañas comerciales hasta proyectos personales, abordo cada fotograma con intención y el deseo de conectar con el espectador a un nivel más profundo. Creemos algo inolvidable juntos.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="#contact">Ponte en Contacto</Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
