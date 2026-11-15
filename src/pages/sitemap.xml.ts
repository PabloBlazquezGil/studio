import type { APIRoute } from 'astro';
import { langs, path, projectPath, routes, type Lang, type RouteKey } from '@/i18n/routes';
import { projects } from '@/lib/data';

/** Cada página aparece en los dos idiomas, y cada entrada enlaza a su traducción (hreflang). */
export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL('http://localhost:9002')).origin;
  const url = (p: string) => `${base}${p === '/' ? '/' : `${p}/`}`;

  const pages: ((lang: Lang) => string)[] = [
    ...(Object.keys(routes) as RouteKey[]).map((key) => (lang: Lang) => path(key, lang)),
    ...projects.map((p) => (lang: Lang) => projectPath(p.slug, lang)),
  ];

  const entries = pages.flatMap((page) =>
    langs.map((lang) => {
      const alternates = [
        ...langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(page(l))}"/>`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(page('es'))}"/>`,
      ];
      return `  <url>\n    <loc>${url(page(lang))}</loc>\n${alternates.join('\n')}\n  </url>`;
    }),
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
