import type { MetadataRoute } from 'next';
import { projects } from '@/lib/data';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/trabajos', '/sobre-mi', '/contacto', '/aviso-legal', '/politica-de-privacidad'];
  return [
    ...pages.map((path) => ({ url: `${siteUrl}${path}` })),
    ...projects.map((p) => ({ url: `${siteUrl}/trabajos/${p.slug}` })),
  ];
}
