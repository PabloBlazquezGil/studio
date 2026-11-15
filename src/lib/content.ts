import type { Lang } from '@/i18n/routes';
import { authorEn, budgetRangesEn, marqueeWordsEn, projectsEn, servicesEn } from '@/i18n/content.en';
import { author, budgetRanges, marqueeWords, projects, services } from './data';
import type { Author, Project, Service } from './types';

/**
 * Contenido en el idioma de la página. En español devuelve data.ts tal cual;
 * en inglés sustituye los textos por los de src/i18n/content.en.ts (si falta alguno, se queda el español).
 */
export function localizeProject(project: Project, lang: Lang): Project {
  if (lang === 'es') return project;
  const { videoTitles, ...text } = projectsEn[project.slug] ?? {};
  let video = 0;
  return {
    ...project,
    ...text,
    media: project.media.map((m) => (m.type === 'video' ? { ...m, title: videoTitles?.[video++] ?? m.title } : m)),
  };
}

export function getProjects(lang: Lang): Project[] {
  return projects.map((p) => localizeProject(p, lang));
}

export function getAuthor(lang: Lang): Author {
  return lang === 'es' ? author : { ...author, ...authorEn };
}

export function getServices(lang: Lang): Service[] {
  return lang === 'es' ? services : services.map((s, i) => servicesEn[i] ?? s);
}

export function getBudgetRanges(lang: Lang): string[] {
  return lang === 'es' ? budgetRanges : budgetRanges.map((b, i) => budgetRangesEn[i] ?? b);
}

export function getMarqueeWords(lang: Lang): string[] {
  return lang === 'es' ? marqueeWords : marqueeWordsEn;
}
