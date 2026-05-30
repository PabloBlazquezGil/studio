import type { Project } from '@/lib/types';
import Image from 'next/image';
import ScrollReveal from './scroll-reveal';

interface PhotoGallerySectionProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export default function PhotoGallerySection({ projects, onProjectClick }: PhotoGallerySectionProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="py-28 sm:py-36 bg-background" id="gallery">
      <ScrollReveal className="container mx-auto px-6 sm:px-8 lg:px-16">

        {/* ── Section header ──────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-20 gap-6">
          <div>
            <p className="label-eyebrow mb-4">Portfolio</p>
            <div className="divider-gold mb-6" />
            <h2
              className="font-headline text-4xl sm:text-5xl lg:text-6xl text-foreground font-light"
              style={{ letterSpacing: '0.18em' }}
            >
              Fotografía
            </h2>
          </div>
          <p
            className="font-body text-sm leading-[1.8] max-w-xs text-left sm:text-right"
            style={{ color: 'rgba(249,248,246,0.5)' }}
          >
            Una cuidada selección de proyectos que definen mi trayectoria creativa.
          </p>
        </div>

        {/* ── Masonry-style grid ───────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {projects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              delay={index * 80}
              className={`group relative overflow-hidden cursor-pointer ${
                index === 0 ? 'col-span-2 lg:col-span-1 row-span-1 aspect-[4/3]' : 'aspect-[2/3]'
              }`}
              onClick={() => onProjectClick(project)}
            >
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:brightness-70"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-canopy/90 via-canopy/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Gold border on hover */}
              <div
                className="absolute inset-0 border border-transparent group-hover:border-gold/40 transition-all duration-500 pointer-events-none"
              />

              {/* Category badge — top-left */}
              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <span
                  className="font-body text-[8px] uppercase tracking-[0.3em] px-3 py-1.5"
                  style={{
                    backgroundColor: 'rgba(212,175,55,0.15)',
                    border: '1px solid rgba(212,175,55,0.4)',
                    color: '#D4AF37',
                    backdropFilter: 'blur(8px)',
                    letterSpacing: '0.3em',
                  }}
                >
                  {project.category}
                </span>
              </div>

              {/* Bottom text */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-7 text-linen">
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                  {/* Gold thin line before title on hover */}
                  <div
                    className="h-[1px] mb-3 transition-all duration-500 opacity-0 group-hover:opacity-100"
                    style={{ backgroundColor: '#D4AF37', width: '2rem' }}
                  />
                  <h3
                    className="font-headline text-lg sm:text-xl leading-snug font-light"
                    style={{ letterSpacing: '0.12em', color: '#F9F8F6' }}
                  >
                    {project.title}
                  </h3>
                  {project.year && (
                    <p
                      className="font-body text-[9px] uppercase tracking-[0.35em] mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: '#D4AF37' }}
                    >
                      {project.year}
                    </p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
