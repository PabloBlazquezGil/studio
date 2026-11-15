import type { APIRoute } from 'astro';
import { projects, services } from '@/lib/data';
import type { Project } from '@/lib/types';

const pages = ['', '/trabajos', '/servicios', '/sobre-mi', '/contacto', '/aviso-legal', '/politica-de-privacidad'];

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Fotos de cada proyecto para Google Imágenes (sitemap de imágenes). */
function projectImages(project: Project): string[] {
  const urls = project.media.filter((m) => m.type === 'image').map((m) => m.url);
  return urls.map((url) => `    <image:image><image:loc>${escape(url)}</image:loc></image:image>`);
}

export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL('http://localhost:9002')).origin;
  const entries = [
    ...pages.map((p) => ({ loc: `${base}${p}/`, images: [] as string[] })),
    ...services.map((s) => ({ loc: `${base}/servicios/${s.slug}/`, images: [] as string[] })),
    ...projects.map((p) => ({ loc: `${base}/trabajos/${p.slug}/`, images: projectImages(p) })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries
  .map(({ loc, images }) => `  <url>\n    <loc>${escape(loc)}</loc>\n${images.map((i) => `${i}\n`).join('')}  </url>`)
  .join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
