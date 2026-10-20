'use client';

import { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, LayoutGrid, List } from 'lucide-react';
import { projects } from '@/lib/data';
import { filters } from '@/lib/projects';
import type { Project } from '@/lib/types';
import { cn } from '@/lib/utils';
import ProjectCard from './project-card';
import ProjectMedia from './project-media';

type View = 'cuadricula' | 'lista';

/**
 * Índice de trabajos con filtros y dos vistas (cuadrícula y lista).
 * El filtro y la vista viven en la URL (?filtro=deporte&vista=lista) para poder compartirlos.
 */
export default function WorkIndex() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeFilter = filters.find((f) => f.id === searchParams.get('filtro')) ?? filters[0];
  const view: View = searchParams.get('vista') === 'lista' ? 'lista' : 'cuadricula';
  const visible = projects.filter(activeFilter.matches);

  // Al cambiar de filtro o de vista cambia la altura de la página: recalcula las animaciones.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [activeFilter.id, view]);

  const update = (key: string, value: string, defaultValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === defaultValue) params.delete(key);
    else params.set(key, value);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <nav aria-label="Filtrar trabajos" className="-mx-1 flex flex-wrap gap-x-5 gap-y-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => update('filtro', filter.id, 'todos')}
              aria-pressed={filter.id === activeFilter.id}
              className={cn(
                'px-1 font-headline text-lg uppercase tracking-wide underline-offset-8 transition-colors',
                filter.id === activeFilter.id ? 'text-linen underline decoration-gold decoration-2' : 'text-linen/50 hover:text-linen',
              )}
            >
              {filter.label}
            </button>
          ))}
        </nav>

        <div className="flex shrink-0 self-start bg-linen/10 p-1 sm:self-auto" role="group" aria-label="Vista">
          {(
            [
              ['cuadricula', LayoutGrid, 'Ver en cuadrícula'],
              ['lista', List, 'Ver en lista'],
            ] as const
          ).map(([id, Icon, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => update('vista', id, 'cuadricula')}
              aria-pressed={view === id}
              aria-label={label}
              className={cn('p-2 transition-colors', view === id ? 'bg-linen/15 text-linen' : 'text-linen/40 hover:text-linen')}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10">
        {visible.length === 0 ? (
          <p className="py-20 text-center text-linen/50">Todavía no hay proyectos en esta categoría.</p>
        ) : view === 'cuadricula' ? (
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((project, index) => (
              <ProjectCard key={project.slug} project={project} className="aspect-[4/5]" priority={index < 3} />
            ))}
          </div>
        ) : (
          <ProjectList projects={visible} />
        )}
      </div>
    </>
  );
}

/** Vista lista: una fila por proyecto; en escritorio, al pasar el ratón aparece la portada siguiendo al cursor. */
function ProjectList({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<Project | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div
      className="relative"
      onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
      onMouseLeave={() => setHovered(null)}
    >
      <ul className="border-t border-linen/15">
        {projects.map((project) => (
          <li key={project.slug} onMouseEnter={() => setHovered(project)}>
            <Link
              href={`/trabajos/${project.slug}`}
              className="group grid grid-cols-[1fr_auto] items-center gap-4 border-b border-linen/15 py-5 transition-colors hover:border-gold/60 md:grid-cols-[3fr_2fr_2fr_auto]"
            >
              <span className="font-headline text-2xl uppercase leading-none text-linen transition-colors group-hover:text-gold sm:text-3xl">
                {project.title}
              </span>
              <span className="hidden text-sm text-linen/60 md:block">{project.category}</span>
              <span className="hidden text-sm text-linen/60 md:block">{project.client}</span>
              <ArrowRight className="h-5 w-5 text-linen/60 transition-all group-hover:translate-x-1 group-hover:text-gold" />
            </Link>
          </li>
        ))}
      </ul>

      {hovered && (
        <div
          className="pointer-events-none fixed z-40 hidden aspect-[4/3] w-80 translate-x-8 -translate-y-1/2 overflow-hidden shadow-2xl [@media(hover:hover)]:block"
          style={{ left: pos.x, top: pos.y }}
          aria-hidden
        >
          <ProjectMedia key={hovered.slug} project={hovered} sizes="320px" playing />
        </div>
      )}
    </div>
  );
}
