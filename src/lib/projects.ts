import type { Lang } from '@/i18n/routes';
import { useTranslations } from '@/i18n/ui';
import { getProjects } from './content';
import type { Discipline, Project } from './types';
import { getYouTubeId } from './utils';

export function getDisciplineLabels(lang: Lang): Record<Discipline, string> {
  return useTranslations(lang).disciplines;
}

export type Filter = { id: string; label: string; matches: (p: Project) => boolean };

export const isVideoProject = (p: Project) => p.media.some((m) => m.type === 'video');

/**
 * Filtros de /trabajos. Solo se muestran las disciplinas que tienen algún proyecto.
 * Los `id` (los que van en la URL, ?filtro=deporte) son los mismos en los dos idiomas.
 */
export function getFilters(lang: Lang): Filter[] {
  const t = useTranslations(lang);
  const projects = getProjects(lang);
  const labels = getDisciplineLabels(lang);
  return [
    { id: 'todos', label: t.filters.all, matches: () => true },
    { id: 'fotografia', label: t.filters.photo, matches: (p) => !isVideoProject(p) },
    { id: 'video', label: t.filters.video, matches: isVideoProject },
    ...(Object.keys(labels) as Discipline[])
      .filter((d) => projects.some((p) => p.discipline === d))
      .map((d) => ({ id: d, label: labels[d], matches: (p: Project) => p.discipline === d })),
  ];
}

export function getProject(slug: string, lang: Lang): Project | undefined {
  return getProjects(lang).find((p) => p.slug === slug);
}

/** Tres proyectos relacionados: primero los de la misma disciplina, luego los siguientes en la lista. */
export function getRelatedProjects(project: Project, lang: Lang, count = 3): Project[] {
  const projects = getProjects(lang);
  const index = projects.findIndex((p) => p.slug === project.slug);
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
