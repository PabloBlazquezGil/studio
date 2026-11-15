import type { APIRoute } from 'astro';
import { langs, path, projectPath, routes, servicePath, type Lang, type RouteKey } from '@/i18n/routes';
import { projects, services } from '@/lib/data';

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Cada página aparece en los dos idiomas, y cada entrada enlaza a su traducción (hreflang).
 * Las fichas de proyecto llevan además sus fotos (sitemap de imágenes para Google Imágenes).
 */
export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL('http://localhost:9002')).origin;
  const url = (p: string) => `${base}${p === '/' ? '/' : `${p}/`}`;

  const pages: { page: (lang: Lang) => string; images: string[] }[] = [
    ...(Object.keys(routes) as RouteKey[]).map((key) => ({ page: (lang: Lang) => path(key, lang), images: [] })),
    ...services.map((s) => ({ page: (lang: Lang) => servicePath(s.slug, lang), images: [] })),
    ...projects.map((p) => ({
      page: (lang: Lang) => projectPath(p.slug, lang),
      images: p.media.filter((m) => m.type === 'image').map((m) => m.url),
    })),
  ];

  const entries = pages.flatMap(({ page, images }) =>
    langs.map((lang) => {
      const lines = [
        ...langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(page(l))}"/>`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(page('es'))}"/>`,
        ...images.map((i) => `    <image:image><image:loc>${escape(i)}</image:loc></image:image>`),
      ];
      return `  <url>\n    <loc>${url(page(lang))}</loc>\n${lines.join('\n')}\n  </url>`;
    }),
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
