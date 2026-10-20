import Image from 'next/image';
import type { Project } from '@/lib/types';
import { cn, isVideoFile } from '@/lib/utils';
import LoopVideo from './loop-video';

interface ProjectMediaProps {
  project: Project;
  sizes: string;
  className?: string;
  priority?: boolean;
  playing?: boolean;
}

/** Portada de un proyecto: vídeo en bucle si la portada es un vídeo, imagen optimizada si no. */
export default function ProjectMedia({ project, sizes, className, priority, playing }: ProjectMediaProps) {
  if (isVideoFile(project.cover)) {
    return <LoopVideo src={project.cover} className={className} playing={playing} eager={priority} />;
  }
  return (
    <Image
      src={project.cover}
      alt={project.title}
      fill
      sizes={sizes}
      priority={priority}
      className={cn('object-cover', className)}
    />
  );
}
