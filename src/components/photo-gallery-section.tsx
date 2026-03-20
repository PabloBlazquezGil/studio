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
    <section className="py-24 sm:py-32 bg-background" id="gallery">
      <ScrollReveal className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-4">
          <div>
            <p className="text-[#4FD1C5] uppercase tracking-[0.3em] text-xs font-light mb-3">Portfolio</p>
            <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-foreground">Fotografía</h2>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm leading-relaxed text-left sm:text-right">
            Una cuidada selección de proyectos que definen mi trayectoria creativa.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
                className="object-cover transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:brightness-75"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Cyan border on hover */}
              <div className="absolute inset-0 border border-transparent group-hover:border-[#4FD1C5]/40 transition-all duration-500 pointer-events-none" />

              {/* Badge top-left */}
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-[#4FD1C5] text-black text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded">
                  {project.category}
                </span>
              </div>

              {/* Bottom text */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 text-white">
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                  <h3 className="font-headline text-lg sm:text-2xl leading-tight">{project.title}</h3>
                  {project.year && (
                    <p className="text-[10px] uppercase tracking-widest text-[#4FD1C5] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
