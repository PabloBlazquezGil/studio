# SEO del portfolio

Qué hace la web por sí sola y qué conviene revisar de vez en cuando.

## Automático en cada página

- Título y descripción propios en cada idioma (`BaseLayout.astro`, textos en `src/i18n/ui.ts`). Los proyectos usan «Título · Categoría» y su descripción; los servicios, `seoTitle` y `seoDescription` de `src/lib/data.ts` (español) y `src/i18n/content.en.ts` (inglés).
- `hreflang` entre la versión en español y en inglés de cada página, también en el sitemap.
- `canonical`, Open Graph y Twitter cards con imagen y texto alternativo. Las redes no muestran AVIF, así que los proyectos que solo tienen fotos AVIF comparten `/og-portfolio.jpg`.
- Datos estructurados schema.org (`src/lib/seo.ts`): `WebSite`, `Person` y `ProfessionalService` en todas las páginas; `ImageGallery`/`CreativeWork` + `VideoObject` en los proyectos; `Service` en los servicios; migas de pan (`BreadcrumbList`).
- `sitemap.xml` con todas las páginas y las fotos de cada proyecto (sitemap de imágenes) y `robots.txt`.
- Visibilidad en asistentes de IA: `robots.txt` permite de forma explícita a los rastreadores de ChatGPT, Claude, Perplexity y Gemini (lista en `src/pages/robots.txt.ts`), y `/llms.txt` (`src/pages/llms.txt.ts`) resume la web en texto plano con los datos de `data.ts`. Se actualiza solo al añadir proyectos o servicios.
- Textos alternativos generados a partir del proyecto. Para una foto concreta, añade `alt: '...'` a su entrada en `data.ts`.

## Cómo añadir cosas

- **Proyecto nuevo:** se añade solo al sitemap, a los datos estructurados y a /trabajos. Para que salga como ejemplo en un servicio, añade su `slug` a `projectSlugs` del servicio.
- **Servicio nuevo:** añade una entrada a `services` en `data.ts` y su traducción, en el mismo orden, en `servicesEn` de `src/i18n/content.en.ts`. Tendrá su página en `/servicios/<slug>` y `/en/services/<slug>`.
- **Ciudad / zona:** `location` y `areaServed` en `src/lib/site.ts` (base en Pontecesures, atiende toda Galicia).

## Requisito

`SITE_URL` debe estar definida en el alojamiento (por ejemplo `https://tudominio.com`). Sin ella, canonical, sitemap e imágenes sociales apuntan a otra dirección.

## Comprobar

- https://validator.schema.org — pega la URL de una página.
- https://search.google.com/test/rich-results — prueba de resultados enriquecidos de Google.
- Google Search Console (gratis): da de alta el dominio y envía `https://tudominio.com/sitemap.xml`.

## Pendiente (necesita datos tuyos)

- Ficha de Google Business Profile (gratis, como negocio sin local que atiende en toda Galicia) y su enlace en `socialLinks`: Google Maps y los asistentes de IA leen mucho esas fuentes.
- Preguntas frecuentes por servicio (plazos, qué incluye, cómo se entrega): con tus respuestas reales se pueden publicar con datos estructurados `FAQPage`.
- Testimonios reales de clientes cuando los tengas.
