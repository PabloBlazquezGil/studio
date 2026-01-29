import type { Project } from '@/lib/types';
import Image from 'next/image';
import ScrollReveal from './scroll-reveal';

interface PhotoGallerySectionProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export default function PhotoGallerySection({ projects, onProjectClick }: PhotoGallerySectionProps) {
  return (
    <section className="py-24 sm:py-32 bg-background">
      <ScrollReveal className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-foreground">Trabajos Destacados</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Una cuidada selección de proyectos que definen mi trayectoria creativa y mi experiencia técnica.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <ScrollReveal 
              key={project.id} 
              delay={index * 100} 
              className="group relative overflow-hidden rounded-lg aspect-[2/3] cursor-pointer shadow-lg"
              onClick={() => onProjectClick(project)}
            >
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                data-ai-hint="photo gallery"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                  <h3 className="font-headline text-2xl">{project.title}</h3>
                  <p className="text-sm uppercase tracking-wider opacity-80">{project.category}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
