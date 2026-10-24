import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import BeforeAfter from '@/components/before-after';
import BentoGrid from '@/components/bento-grid';
import HeroCarousel from '@/components/hero-carousel';
import Parallax from '@/components/motion/parallax';
import ScrollMarquee from '@/components/motion/scroll-marquee';
import SplitHeading from '@/components/motion/split-heading';
import ReelsSection from '@/components/reels-section';
import Reveal from '@/components/reveal';
import Testimonials from '@/components/testimonials';
import { author, comparisons, heroSlides, marqueeWords, projects } from '@/lib/data';
import { getProject } from '@/lib/projects';

export default function Home() {
  const slides = heroSlides.flatMap((slide) => {
    const project = getProject(slide.projectSlug);
    return project ? [{ ...slide, project }] : [];
  });

  return (
    <>
      <HeroCarousel slides={slides} />

      <section className="px-5 pb-16 pt-20 text-center sm:px-10 sm:pt-28">
        <SplitHeading
          as="h1"
          lines={['Luz. Movimiento.', '*Emoción.*']}
          className="text-6xl font-bold leading-[0.88] text-linen sm:text-8xl lg:text-[10rem]"
        />
        <Reveal delay={300}>
          <p className="mt-8 text-sm text-linen/60 sm:text-base">Fotografía · Vídeo · Dirección de fotografía</p>
        </Reveal>
      </section>

      <section className="px-2.5 sm:px-10" aria-label="Trabajos destacados">
        <BentoGrid projects={projects} />
        <div className="mt-12 text-center">
          <Link
            href="/trabajos"
            className="inline-flex items-center gap-2 border border-linen/30 px-6 py-3 font-headline text-lg uppercase tracking-wide text-linen transition-colors hover:border-gold hover:text-gold"
          >
            Todos los trabajos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <ScrollMarquee words={marqueeWords} />

      <ReelsSection />

      {comparisons.length > 0 && (
        <section className="border-t border-linen/10 px-5 py-24 sm:px-10 sm:py-32">
          <p className="text-sm font-medium text-gold">Postproducción</p>
          <SplitHeading lines={['Antes y *después*']} className="mt-3 text-5xl font-bold leading-[0.9] text-linen sm:text-7xl" />
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            {comparisons.map((comparison) => (
              <BeforeAfter key={comparison.title} comparison={comparison} />
            ))}
          </div>
        </section>
      )}

      <section className="grid items-center gap-10 border-t border-linen/10 px-5 py-24 sm:px-10 sm:py-32 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative aspect-[4/5] overflow-hidden lg:order-2">
          <Parallax>
            <Image src={author.imageUrl} alt={author.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </Parallax>
        </Reveal>
        <div>
          <p className="text-sm font-medium text-gold">Sobre mí</p>
          <SplitHeading lines={[author.title]} className="mt-3 text-5xl font-bold leading-[0.9] text-linen sm:text-7xl" />
          <Reveal delay={150}>
            <p className="mt-6 max-w-lg leading-relaxed text-linen/70">{author.bio.split('\n\n')[0]}</p>
            <Link
              href="/sobre-mi"
              className="mt-8 inline-flex items-center gap-2 bg-linen/10 px-5 py-2.5 font-headline text-lg uppercase tracking-wide text-linen transition-colors hover:bg-gold hover:text-canopy"
            >
              Conóceme <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Testimonials />

    </>
  );
}
