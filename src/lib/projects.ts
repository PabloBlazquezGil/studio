import { projects } from './data';
import type { Discipline, Project } from './types';
import { getYouTubeId } from './utils';

export const disciplineLabels: Record<Discipline, string> = {
  deporte: 'Deporte',
  retrato: 'Retrato',
  eventos: 'Eventos',
  cine: 'Cine',
  redes: 'Redes sociales',
};

export type Filter = { id: string; label: string; matches: (p: Project) => boolean };

export const isVideoProject = (p: Project) => p.media.some((m) => m.type === 'video');

/** Filtros de /trabajos. Solo se muestran las disciplinas que tienen algún proyecto. */
export const filters: Filter[] = [
  { id: 'todos', label: 'Todos', matches: () => true },
  { id: 'fotografia', label: 'Fotografía', matches: (p) => !isVideoProject(p) },
  { id: 'video', label: 'Vídeo', matches: isVideoProject },
  ...(Object.keys(disciplineLabels) as Discipline[])
    .filter((d) => projects.some((p) => p.discipline === d))
    .map((d) => ({ id: d, label: disciplineLabels[d], matches: (p: Project) => p.discipline === d })),
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Tres proyectos relacionados: primero los de la misma disciplina, luego los siguientes en la lista. */
export function getRelatedProjects(project: Project, count = 3): Project[] {
  const index = projects.indexOf(project);
  const rest = [...projects.slice(index + 1), ...projects.slice(0, index)];
  const same = rest.filter((p) => p.discipline === project.discipline);
  const others = rest.filter((p) => p.discipline !== project.discipline);
  return [...same, ...others].slice(0, count);
}

/** Imagen fija representativa de un proyecto (para metadatos y vistas previas). */
export function getProjectImage(project: Project): string | undefined {
  const youtubeId = project.media.map((m) => getYouTubeId(m.url)).find(Boolean);
  if (youtubeId) return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  return project.media.find((m) => m.type === 'image')?.url;
}
