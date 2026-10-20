import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/lib/data';
import LoopVideo from './loop-video';
import SplitHeading from './motion/split-heading';

/** Reels verticales (9:16) de todos los proyectos en formato vertical, con su llamada a la acción. */
export default function ReelsSection() {
  const reels = projects
    .filter((p) => p.orientation === 'portrait')
    .flatMap((p) => p.media.filter((m) => m.type === 'video').map((m) => ({ project: p, video: m })));

  if (reels.length === 0) return null;

  return (
    <section className="grid items-center gap-12 px-5 py-24 sm:px-10 sm:py-32 lg:grid-cols-[2fr_3fr]">
      <div>
        <p className="text-sm font-medium text-gold">Redes sociales</p>
        <SplitHeading lines={['Reels que', '*paran el scroll*']} className="mt-3 text-5xl font-bold leading-[0.9] text-linen sm:text-7xl" />
        <p className="mt-6 max-w-md leading-relaxed text-linen/70">
          Piezas verticales con mirada de cine para marcas y negocios que quieren destacar en Instagram y TikTok.
        </p>
        <Link
          href="/contacto"
          className="mt-8 inline-flex items-center gap-2 bg-gold px-6 py-3 font-headline text-lg uppercase tracking-wide text-canopy transition-colors hover:bg-linen"
        >
          Quiero mis reels <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="-mx-5 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 lg:justify-end">
        {reels.map(({ project, video }) => (
          <Link
            key={video.url}
            href={`/trabajos/${project.slug}`}
            className="group relative aspect-[9/16] w-[70vw] max-w-[320px] shrink-0 snap-start overflow-hidden bg-black/30 sm:w-[40vw] lg:w-[30%]"
          >
            <LoopVideo src={video.url} className="transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-canopy/80 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-xs font-medium text-gold">{project.client}</p>
              <p className="mt-1 font-headline text-2xl uppercase leading-none text-linen">{video.title ?? project.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
