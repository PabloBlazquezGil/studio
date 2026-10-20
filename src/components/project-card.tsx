import Link from 'next/link';
import type { Project } from '@/lib/types';
import { cn } from '@/lib/utils';
import Parallax from './motion/parallax';
import ProjectMedia from './project-media';

interface ProjectCardProps {
  project: Project;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/** Tarjeta de proyecto: el trabajo ocupa toda la tarjeta y encima solo el cliente y el título. */
export default function ProjectCard({
  project,
  className,
  sizes = '(max-width: 1024px) 100vw, 33vw',
  priority,
}: ProjectCardProps) {
  return (
    <Link
      href={`/trabajos/${project.slug}`}
      className={cn('group relative block overflow-hidden bg-black/30', className)}
    >
      <Parallax amount={6}>
        <ProjectMedia
          project={project}
          sizes={sizes}
          priority={priority}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-t from-canopy/80 via-canopy/10 to-transparent transition-opacity duration-500 group-hover:opacity-70" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <p className="text-xs font-medium text-gold">{project.client}</p>
        <h3 className="mt-1 font-headline text-2xl font-bold uppercase leading-none text-linen sm:text-3xl">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}
