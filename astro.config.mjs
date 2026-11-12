// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

/**
 * URL pública de la web (para sitemap.xml, robots.txt, canonical e imagen social).
 * Defínela con la variable de entorno SITE_URL en el panel de Hostinger.
 */
const site =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined);
if (!site && process.env.NODE_ENV === 'production') {
  console.warn('[aviso] SITE_URL no está definida: el sitemap y la imagen social apuntarán a localhost.');
}

export default defineConfig({
  site: site ?? 'http://localhost:9002',
  output: 'static',
  server: { port: 9002 },
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
