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
              A Storyteller Behind The Lens
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              My name is Pablo Blázquez Gil. With a passion for visual narrative, I've spent over a decade honing my craft, transforming fleeting moments into timeless stories. My work is a blend of cinematic artistry and authentic emotion, seeking beauty in both the grand and the subtle.
            </p>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              From commercial campaigns to personal projects, I approach every frame with intention and a desire to connect with the viewer on a deeper level. Let's create something unforgettable together.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="#contact" id="contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
