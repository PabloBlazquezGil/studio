import type { APIRoute } from 'astro';
import { projects } from '@/lib/data';

const pages = ['', '/trabajos', '/sobre-mi', '/contacto', '/aviso-legal', '/politica-de-privacidad'];

export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL('http://localhost:9002')).origin;
  const urls = [...pages.map((p) => `${p}/`), ...projects.map((p) => `/trabajos/${p.slug}/`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${base}${u}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
