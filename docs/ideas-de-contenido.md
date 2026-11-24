# Ideas de contenido y búsquedas objetivo

Cada idea es un trabajo (o grupo de trabajos) que ya existe o que puedes hacer, convertido en una ficha del portfolio que responde a una búsqueda real. Las búsquedas son **hipótesis de lo que escribiría un cliente**, no datos de volumen: confírmalas en Search Console cuando tengas datos (Rendimiento > Consultas).

| # | Idea / caso | Búsqueda objetivo | Qué enseñar | Ficha ya existente |
|---|---|---|---|---|
| 1 | Fotografía de torneo o competición local | fotógrafo de eventos deportivos en Galicia | Fotos de acción, entrega rápida, qué incluye | `tenis-en-freixo` |
| 2 | Surf en playas gallegas | fotógrafo de surf en Galicia, fotos de surf Lanzada / Malpica / Furnas | Serie por playa, cómo se trabaja en el agua y la arena | `surf-la-lanzada`, `surf-en-malpica`, `surf-playa-de-furnas` |
| 3 | Cobertura de evento científico o divulgativo | fotógrafo y vídeo para congresos y jornadas en Galicia | Antes/después, resumen en vídeo, plazos | `phdays`, `dia-de-la-mujer-y-la-nina-en-la-ciencia` |
| 4 | Reels para negocio local | vídeo para redes sociales negocio Galicia, reels para floristería / restaurante | Un reel por sector, formato vertical, entrega lista | `adria-floristeria` |
| 5 | Photobook o book de actriz/actor | book de fotos para actores en Galicia, photobook | Proceso: preparación, sesión, selección | `photobook-actriz`, `photobook-helenajes` |
| 6 | Vídeo para turismo rural y alojamientos | vídeo promocional casa rural / pazo Galicia | Casos de las piezas de Casa Beatnik y Pazo San Lorenzo | nueva ficha propia (hoy son vídeos dentro de `adria-floristeria`) |
| 7 | Cortometraje y concurso 48 horas | cortometraje Galicia, rodaje 48 horas | Cómo se hace un corto en 48 h | `fervenza-48h` |
| 8 | Fotógrafo/videógrafo en tu zona | fotógrafo en Pontecesures, videógrafo Ría de Arousa | Una página corta con zona, tipo de trabajo, ejemplos y contacto (solo si hay trabajos reales de la zona) | nueva |

Prioriza 1, 2 y 3: ya tienes el material y son las búsquedas con intención de contratar. No enlaces a fichas «de relleno»: Google penaliza páginas casi iguales.

## Cómo publicar una ficha nueva

La web ya genera ficha, sitemap, datos estructurados y versión en inglés para cada proyecto. Para un caso nuevo:

1. Añade el proyecto a `projects` en `src/lib/data.ts` (modelo abajo).
2. Añade su traducción en `projectsEn` de `src/i18n/content.en.ts` con el mismo `slug`.
3. Si es ejemplo de un servicio, añade su `slug` a `projectSlugs` de ese servicio.
4. `npm run build` y revisa que aparece en `/trabajos/` y en `/sitemap.xml`.
5. En Search Console, **Inspección de URLs** > **Solicitar indexación** de la ficha nueva.

```ts
{
  slug: 'torneo-de-ejemplo',            // parte final de la URL; sin tildes, con guiones
  title: 'Nombre real del trabajo',
  client: 'Cliente real o «Cliente privado»',
  category: 'Fotografía deportiva',
  discipline: 'deporte',                 // deporte | retrato | eventos | cine | redes
  year: 2026,
  description: 'Dos o tres frases: qué era, dónde (ciudad o playa de Galicia) y qué entregaste. Responde a la búsqueda objetivo.',
  cover: `${WP}/RUTA/portada.jpg`,
  media: [{ type: 'image', url: `${WP}/RUTA/foto-1.jpg`, alt: 'Descripción concreta de la foto' }],
},
```

Cuanto más concreto el texto (lugar, tipo de evento, qué se entregó), mejor responde a la búsqueda. No inventes clientes, cifras ni opiniones.

No se ha creado un blog: para un portfolio, las fichas de proyecto cumplen esa función y no obligan a mantener otra sección. Si más adelante quieres artículos de guía («cómo preparar un reportaje de un torneo»), se añade como sección nueva con sus rutas en español e inglés.
