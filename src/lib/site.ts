/** Nombre de la web. El título y la descripción por defecto de cada idioma están en src/i18n/ui.ts (`site`). */
export const siteName = 'Pablo Blázquez Gil';

/** Profesión tal como aparece en Google (datos estructurados). */
export const jobTitle = { es: 'Fotógrafo y videógrafo', en: 'Photographer and videographer' };

/**
 * Dónde trabajas, para Google (datos estructurados y búsquedas locales).
 * Añade tu ciudad en `locality` (por ejemplo 'A Coruña') si quieres que también aparezca.
 */
export const location = {
  locality: 'Pontecesures',
  region: 'Galicia',
  country: 'ES',
};

/** Zonas en las que ofreces tus servicios (datos estructurados). */
export const areaServed = ['Galicia'];

/**
 * Verificación de propiedad en Google Search Console y Bing Webmaster Tools (gratis, sin ficha de negocio).
 * Se leen de variables de entorno del alojamiento (así no hay que tocar el código ni inventar nada):
 *   GOOGLE_SITE_VERIFICATION = el valor de `content` de la metaetiqueta que da Search Console
 *   BING_SITE_VERIFICATION   = el valor de `content` de la metaetiqueta que da Bing Webmaster Tools
 * Si están vacías, no se añade nada a la web. Pasos completos en docs/buscadores.md.
 * (Alternativa sin variables: pega aquí el código entre las comillas.)
 */
export const verification = {
  google: process.env.GOOGLE_SITE_VERIFICATION || '', // ← PEGAR AQUÍ o en la variable de entorno
  bing: process.env.BING_SITE_VERIFICATION || '', // ← PEGAR AQUÍ o en la variable de entorno
};

/**
 * Otros perfiles públicos tuyos para `sameAs` (datos estructurados): ayudan a Google y a las IA a saber que
 * son la misma persona. Instagram y LinkedIn salen ya de `socialLinks` en data.ts; añade aquí solo los que
 * existan de verdad (YouTube, Vimeo, Behance…). Vacío por defecto: no se inventa ningún perfil.
 * Ejemplo: 'https://www.youtube.com/@tucanal'
 */
export const extraProfiles: string[] = [];
