# Buscadores sin ficha de Google Business Profile

Pasos para que Google encuentre y entienda la web sin necesitar la ficha de negocio. Todo es gratis.
El código de verificación **lo da Google al darte de alta**: no se puede inventar ni deducir.

## 1. Google Search Console

1. Entra en https://search.google.com/search-console con tu cuenta de Google y pulsa **Añadir propiedad**.
2. Elige **Prefijo de la URL** (no «Dominio») y escribe la dirección final de la web, tal cual (con `https://`).
3. En los métodos de verificación elige **Etiqueta HTML**. Google te enseña algo así:
   `<meta name="google-site-verification" content="ESTE_ES_EL_CODIGO" />`
4. Copia **solo** lo que va dentro de `content="..."`.
5. Pégalo en Hostinger (o en Vercel, si sigue sirviendo producción) como variable de entorno
   **`GOOGLE_SITE_VERIFICATION`** y vuelve a desplegar. (Alternativa: pégalo entre comillas en `verification.google` de `src/lib/site.ts`.)
6. Cuando la web esté publicada con el código, vuelve a Search Console y pulsa **Verificar**.
7. En **Sitemaps** escribe `sitemap.xml` y envía. Debería salir «Correcto» con las páginas descubiertas.
8. En **Inspección de URLs** pega la home y pulsa **Solicitar indexación**. Repite con `/servicios/`, `/trabajos/` y un par de proyectos.

Otra opción de Google: descargar un fichero `googleXXXXXXXX.html` y guardarlo tal cual en la carpeta `public/` del repo. Con la etiqueta HTML no hace falta.

## 2. Estado técnico (revisado)

- **`/sitemap.xml`**: lista cada página en español e inglés con `hreflang`, más las fotos de cada proyecto. Se genera solo con los datos de `data.ts`. Es válido para enviarlo tal cual.
- **`/robots.txt`**: permite todo, permite a los rastreadores de IA y apunta al sitemap con `SITE_URL`.
- **Requisito:** `SITE_URL` debe estar definida en el alojamiento con el dominio final. Si no, sitemap, canonical y robots apuntan a `localhost` y Search Console rechazará el sitemap. Comprueba abriendo `https://TU-DOMINIO/sitemap.xml` y mirando que las direcciones sean las del dominio.

## 3. Qué hace la web por ti sin ficha

- Datos estructurados (`Person`, `ProfessionalService`, `WebSite`) con base en Pontecesures, `areaServed` Galicia (dentro de España), contacto y enlaces `sameAs` a tus perfiles.
- Los perfiles de `sameAs` salen de `socialLinks` (`src/lib/data.ts`, hoy Instagram y LinkedIn) y de `extraProfiles` (`src/lib/site.ts`, vacío). Cuando crees YouTube, Vimeo o Behance, añade su URL real a `extraProfiles`.
- Sin ficha de negocio no hay reseñas de Google. No se han añadido reseñas ni valoraciones falsas, y no se debe hacer: sería motivo de sanción. Los testimonios reales irán en `testimonials` de `data.ts` cuando existan.

## 4. Después de verificar

- Mira en Search Console, a la semana, **Rendimiento** (qué búsquedas te traen visitas) y **Páginas** (qué está sin indexar y por qué).
- Cuando alguien enlace la web (directorios, perfiles, prensa local), mejora más que cualquier cambio técnico. Ver `docs/perfiles-y-directorios.md`.
