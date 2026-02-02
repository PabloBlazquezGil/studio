'use client';
import { author } from '@/lib/data';
import type { Author } from '@/lib/types';
import Image from 'next/image';
import ScrollReveal from './scroll-reveal';
import { Button } from './ui/button';
import Link from 'next/link';

export default function AboutSection() {

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden bg-background scroll-mt-24">
      <div className="absolute inset-0 opacity-[0.02] text-foreground/20 -z-0">
        <p className="text-[20vw] lg:text-[15vw] leading-none font-black font-headline whitespace-nowrap animate-marquee">
          {author.name.toUpperCase()} – {author.name.toUpperCase()} –&nbsp;
        </p>
        <p className="text-[20vw] lg:text-[15vw] leading-none font-black font-headline whitespace-nowrap animate-marquee2">
          {author.name.toUpperCase()} – {author.name.toUpperCase()} –&nbsp;
        </p>
      </div>
      <ScrollReveal className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-foreground">Sobre Mí</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <ScrollReveal className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={author.imageUrl}
                alt={author.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </ScrollReveal>
          </div>
          <div className="lg:col-span-3">
            <h3 className="font-headline text-3xl sm:text-4xl text-foreground">
              {author.title}
            </h3>
            <div className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed space-y-4 whitespace-pre-wrap">
              {author.bio.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <Button asChild size="lg" className="mt-8">
              <Link href="#contact">Ponte en Contacto</Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
