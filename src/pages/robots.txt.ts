import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL('http://localhost:9002')).origin;
  return new Response(`User-Agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
