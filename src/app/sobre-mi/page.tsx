import type { Metadata } from 'next';
import Image from 'next/image';
import SplitHeading from '@/components/motion/split-heading';
import PageIntro from '@/components/page-intro';
import Reveal from '@/components/reveal';
import Testimonials from '@/components/testimonials';
import { author, services } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Sobre mí',
  description: `${author.name}: fotógrafo y videógrafo. Servicios de fotografía deportiva, retrato, eventos, vídeo y reels.`,
};

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="Sobre mí" title={author.title} />

      <section className="grid gap-10 px-5 pb-24 sm:px-10 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative aspect-[4/5] overflow-hidden">
          <Image src={author.imageUrl} alt={author.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
        </Reveal>
        <Reveal delay={120} className="space-y-6 text-lg leading-relaxed text-linen/80 lg:pt-10">
          {author.bio.split('\n\n').map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
      </section>

      <section className="border-t border-linen/10 px-5 py-24 sm:px-10 sm:py-32">
        <SplitHeading lines={['Servicios']} className="text-5xl font-bold leading-none text-linen sm:text-8xl" />
        <ol className="mt-12 border-t border-linen/15">
          {services.map((service, index) => (
            <li key={service.title} className="grid gap-3 border-b border-linen/15 py-8 md:grid-cols-[6rem_2fr_3fr] md:gap-8">
              <span className="font-headline text-xl text-gold">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="font-headline text-3xl font-bold uppercase leading-none text-linen sm:text-4xl">{service.title}</h3>
              <p className="leading-relaxed text-linen/70">{service.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <Testimonials />

    </>
  );
}
