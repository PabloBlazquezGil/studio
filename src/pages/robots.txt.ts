import type { APIRoute } from 'astro';

/**
 * Rastreadores de buscadores y de asistentes de IA que se permiten de forma explícita.
 * Todos pueden leer toda la web: así aparece en Google, Bing y en las respuestas de ChatGPT, Claude,
 * Perplexity o Gemini. Para bloquear alguno, cambia su `Allow: /` por `Disallow: /`.
 */
const bots = [
  'OAI-SearchBot', // búsqueda de ChatGPT
  'GPTBot', // entrenamiento de OpenAI
  'ChatGPT-User', // ChatGPT abriendo una página a petición de un usuario
  'ClaudeBot', // Anthropic
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended', // Gemini
  'Applebot-Extended',
  'CCBot',
];

export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL('http://localhost:9002')).origin;
  const groups = ['User-agent: *\nAllow: /', ...bots.map((b) => `User-agent: ${b}\nAllow: /`)];
  return new Response(`${groups.join('\n\n')}\n\nSitemap: ${base}/sitemap.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
