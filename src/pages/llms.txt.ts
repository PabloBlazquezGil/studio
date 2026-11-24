import type { APIRoute } from 'astro';
import { path, projectPath, servicePath, type Lang } from '@/i18n/routes';
import { useTranslations } from '@/i18n/ui';
import { getAuthor, getProjects, getServices } from '@/lib/content';
import { contactEmail } from '@/lib/data';
import { areaServed, jobTitle, siteName } from '@/lib/site';

/**
 * /llms.txt: resumen en texto plano de la web para asistentes de IA (ChatGPT, Claude, Perplexity…).
 * Se genera con los mismos datos que la web (data.ts y content.en.ts), así que nunca queda desfasado.
 * Solo recoge hechos que ya están publicados en la web (el formato es el de https://llmstxt.org).
 */
export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL('http://localhost:9002')).origin;
  const url = (p: string) => `${base}${p === '/' ? '/' : `${p}/`}`;
  const lang: Lang = 'es';
  const t = useTranslations(lang);
  const author = getAuthor(lang);

  const lines = [
    `# ${siteName}`,
    '',
    `> ${jobTitle[lang]} en ${areaServed.join(', ')}. Portfolio de fotografía deportiva y de surf, retrato y photobook, eventos, cortometrajes y reels para redes sociales.`,
    '',
    `## Páginas principales`,
    `- [${t.nav.work}](${url(path('work', lang))}): todos los proyectos, con fotos y vídeos`,
    `- [${t.nav.services}](${url(path('services', lang))}): qué ofrezco y para quién`,
    `- [${t.nav.about}](${url(path('about', lang))}): ${author.name}, trayectoria y forma de trabajar`,
    `- [${t.nav.contact}](${url(path('contact', lang))}): pedir presupuesto`,
    '',
    `## Servicios`,
    ...getServices(lang).map((s) => `- [${s.title}](${url(servicePath(s.slug, lang))}): ${s.seoDescription}`),
    '',
    `## Trabajos`,
    ...getProjects(lang).map((p) => `- [${p.title}](${url(projectPath(p.slug, lang))}): ${[p.category, p.year].filter(Boolean).join(', ')}`),
    '',
    `## Contacto`,
    `- Email: ${contactEmail}`,
    `- [Formulario de contacto](${url(path('contact', lang))})`,
    '',
    `## English version`,
    `- [English version](${url(path('home', 'en'))})`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
