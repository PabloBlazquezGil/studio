/**
 * Idiomas y rutas de la web.
 * El español es el idioma por defecto y vive en la raíz (/trabajos); el inglés vive bajo /en
 * con las rutas traducidas (/en/work). Los slugs de los proyectos son los mismos en los dos idiomas.
 */
export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';
export const langs = Object.keys(languages) as Lang[];

/** Valor de `og:locale` de cada idioma. */
export const ogLocales: Record<Lang, string> = { es: 'es_ES', en: 'en_GB' };

export const routes = {
  home: { es: '/', en: '/en' },
  work: { es: '/trabajos', en: '/en/work' },
  services: { es: '/servicios', en: '/en/services' },
  about: { es: '/sobre-mi', en: '/en/about' },
  contact: { es: '/contacto', en: '/en/contact' },
  legal: { es: '/aviso-legal', en: '/en/legal-notice' },
  privacy: { es: '/politica-de-privacidad', en: '/en/privacy-policy' },
} satisfies Record<string, Record<Lang, string>>;
export type RouteKey = keyof typeof routes;

/** Idioma a partir de `Astro.currentLocale` (lo calcula Astro según la URL). */
export function toLang(locale: string | undefined): Lang {
  return locale === 'en' ? 'en' : 'es';
}

export function path(key: RouteKey, lang: Lang): string {
  return routes[key][lang];
}

export function projectPath(slug: string, lang: Lang): string {
  return `${routes.work[lang]}/${slug}`;
}

/** Página de un servicio. Los slugs de los servicios son los mismos en los dos idiomas. */
export function servicePath(slug: string, lang: Lang): string {
  return `${routes.services[lang]}/${slug}`;
}

/** Ruta sin la barra final (salvo la raíz), para comparar rutas igual en cualquier alojamiento. */
export function normalizePath(pathname: string): string {
  return pathname.replace(/(.)\/$/, '$1');
}

/** Idioma de una ruta. */
export function langFromPath(pathname: string): Lang {
  return /^\/en(\/|$)/.test(pathname) ? 'en' : 'es';
}

/**
 * La misma página en otro idioma. Devuelve `undefined` si la ruta no tiene equivalente (la 404).
 * Ejemplos: /trabajos/surf-en-malpica → /en/work/surf-en-malpica; /en/about → /sobre-mi
 */
export function translatePath(pathname: string, to: Lang): string | undefined {
  const current = normalizePath(pathname);
  const from = langFromPath(current);
  for (const key of Object.keys(routes) as RouteKey[]) {
    if (routes[key][from] === current) return routes[key][to];
  }
  const project = current.match(new RegExp(`^${routes.work[from]}/([^/]+)$`));
  if (project) return projectPath(project[1], to);
  const service = current.match(new RegExp(`^${routes.services[from]}/([^/]+)$`));
  if (service) return servicePath(service[1], to);
  return undefined;
}

/** ¿Es esta ruta la página `key` en cualquier idioma? */
export function isRoute(pathname: string, key: RouteKey): boolean {
  const current = normalizePath(pathname);
  return langs.some((lang) => routes[key][lang] === current);
}

/** ¿Es esta ruta la ficha de un proyecto en cualquier idioma? */
export function isProjectPath(pathname: string): boolean {
  const current = normalizePath(pathname);
  return langs.some((lang) => new RegExp(`^${routes.work[lang]}/[^/]+$`).test(current));
}
