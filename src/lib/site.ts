/** URL pública de la web (la define `site` en astro.config.mjs a partir de SITE_URL). */
export const siteName = 'Pablo Blázquez Gil';
export const defaultTitle = 'Pablo Blázquez Gil | Fotógrafo y videógrafo';
export const defaultDescription =
  'Fotógrafo y videógrafo. Fotografía deportiva y de surf, retrato y photobook, eventos, cortometrajes y reels para redes sociales con mirada de cine.';

/** Profesión tal como aparece en Google (datos estructurados). */
export const jobTitle = 'Fotógrafo y videógrafo';

/**
 * Dónde trabajas, para Google. Rellena `locality` y `region` con tu ciudad y provincia
 * (por ejemplo 'A Coruña' y 'Galicia') y aparecerán en los datos estructurados y en las búsquedas locales.
 * Mientras estén vacíos no se publica ninguna dirección.
 */
export const location = {
  locality: '',
  region: '',
  country: 'ES',
};

/** Zonas en las que ofreces tus servicios (datos estructurados). */
export const areaServed = ['España'];
