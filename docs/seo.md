# SEO del portfolio

Qué hace la web por sí sola y qué conviene revisar de vez en cuando.

## Automático en cada página

- Título y descripción propios (`BaseLayout.astro`). Los proyectos usan «Título · Categoría» y su descripción; los servicios, `seoTitle` y `seoDescription` de `src/lib/data.ts`.
- `canonical`, Open Graph y Twitter cards con imagen y texto alternativo. Las redes no muestran AVIF, así que los proyectos que solo tienen fotos AVIF comparten `/og.jpg`.
- Datos estructurados schema.org (`src/lib/seo.ts`): `WebSite`, `Person` y `ProfessionalService` en todas las páginas; `ImageGallery`/`CreativeWork` + `VideoObject` en los proyectos; `Service` en los servicios; migas de pan (`BreadcrumbList`).
- `sitemap.xml` con todas las páginas y las fotos de cada proyecto (sitemap de imágenes) y `robots.txt`.
- Textos alternativos generados a partir del proyecto. Para una foto concreta, añade `alt: '...'` a su entrada en `data.ts`.

## Cómo añadir cosas

- **Proyecto nuevo:** se añade solo al sitemap, a los datos estructurados y a /trabajos. Para que salga como ejemplo en un servicio, añade su `slug` a `projectSlugs` del servicio.
- **Servicio nuevo:** añade una entrada a `services` en `data.ts` y tendrá su página en `/servicios/<slug>`.
- **Ciudad / zona:** rellena `location` y `areaServed` en `src/lib/site.ts`. Mientras estén vacíos no se publica ninguna dirección.

## Requisito

`SITE_URL` debe estar definida en el alojamiento (por ejemplo `https://tudominio.com`). Sin ella, canonical, sitemap e imágenes sociales apuntan a otra dirección.

## Comprobar

- https://validator.schema.org — pega la URL de una página.
- https://search.google.com/test/rich-results — prueba de resultados enriquecidos de Google.
- Google Search Console (gratis): da de alta el dominio y envía `https://tudominio.com/sitemap.xml`.
