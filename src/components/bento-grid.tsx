import type { Project } from '@/lib/types';
import { cn } from '@/lib/utils';
import ProjectCard from './project-card';
import Reveal from './reveal';

/**
 * Rejilla con ritmo: en escritorio alterna filas de tres tarjetas cuadradas con filas
 * de una tarjeta doble ancha y una cuadrada (la ancha a la izquierda y luego a la derecha).
 * Patrón de 10 posiciones: ■■■ / ▬■ / ■■■ / ■▬
 */
const WIDE_POSITIONS = new Set([3, 9]);

export default function BentoGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => {
        const wide = WIDE_POSITIONS.has(index % 10);
        return (
          <Reveal
            key={project.slug}
            delay={(index % 3) * 80}
            className={cn('aspect-[4/5] sm:aspect-square', wide && 'sm:col-span-2 sm:aspect-[2/1] lg:aspect-auto')}
          >
            <ProjectCard
              project={project}
              className="h-full w-full"
              priority={index < 3}
              sizes={wide ? '(max-width: 640px) 100vw, 66vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
            />
          </Reveal>
        );
      })}
    </div>
  );
}
