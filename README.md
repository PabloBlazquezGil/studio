# Pablo Blázquez Gil · Portfolio

Portfolio de fotografía y vídeo hecho con [Astro](https://astro.build) (salida 100 % estática), Tailwind CSS 4, GSAP y Lenis. Las pocas partes que necesitan estado (formulario de contacto, visor de fotos, comparador antes/después) son islas de React; el resto es HTML estático con scripts pequeños.

## Desarrollo

Requiere Node 24 (`.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:9002
npm run check      # tipos y errores de Astro
npm run build      # genera la web estática en dist/
npm run preview    # sirve dist/ en local
```

## Despliegue en Hostinger (desde GitHub)

Igual que cualquier proyecto Astro estático: en hPanel, aplicación Node.js desde GitHub con

| Ajuste | Valor |
|---|---|
| Framework | Astro |
| Versión de Node | 24 |
| Comando de build | `npm run build` |
| Carpeta de salida | `dist` |
| Variable de entorno | `SITE_URL` = dominio final, por ejemplo `https://tudominio.com` |

`SITE_URL` la usan `sitemap.xml`, `robots.txt`, las URL canónicas y la imagen para redes sociales. Si falta, apuntan a `localhost`.
`public/.htaccess` hace que Hostinger muestre `404.html` en las páginas que no existen.

## Estructura

| Ruta | Qué es |
|---|---|
| `/` | Carrusel de vídeos a pantalla completa, rejilla de proyectos destacados, reels, sobre mí |
| `/trabajos/` | Todos los proyectos con filtros y vista cuadrícula o lista (`?filtro=deporte&vista=lista`) |
| `/trabajos/[slug]/` | Ficha de cada proyecto: portada, descripción, créditos, vídeos, galería y proyectos relacionados |
| `/sobre-mi/` | Biografía y servicios |
| `/contacto/` | Datos de contacto y briefing por pasos (abre el programa de correo con `mailto:`) |
| `/aviso-legal/`, `/politica-de-privacidad/` | Páginas legales |
| `/sitemap.xml`, `/robots.txt` | SEO, generados en el build |

```
src/
  pages/        rutas (una por archivo) + sitemap.xml.ts y robots.txt.ts
  layouts/      BaseLayout.astro: <head> con SEO, cabecera, pie y transición de página
  components/   componentes Astro; components/react/ = islas de React; ui/ = toasts
  scripts/      motion.ts (Lenis + GSAP + aparición) y loop-video.ts (vídeos en bucle)
  lib/data.ts   todo el contenido
```

## Cómo añadir o editar contenido

Todo el contenido está en [`src/lib/data.ts`](src/lib/data.ts):

- **`projects`**: cada proyecto con su `slug` (la URL), título, cliente, categoría, disciplina, portada (`cover`, imagen o vídeo) y medios. El orden de la lista es el orden en la web. En la home, las posiciones 4 y 10 se muestran como tarjetas anchas.
- **`heroSlides`**: los clips del carrusel de la home.
- **`author`**, **`services`**, **`socialLinks`**.
- **`comparisons`** y **`testimonials`**: vacíos a propósito; mientras lo estén, sus secciones no se muestran.

Los vídeos admiten `#t=5` al final de la URL para empezar en el segundo 5. Las imágenes y vídeos se sirven desde `thundershoot.com` y YouTube; Astro no los descarga ni los procesa en el build.

## Formulario de contacto

`src/components/react/ContactForm.tsx` abre el cliente de correo del visitante (`mailto:`). Un envío real (por ejemplo con Resend) necesita un servidor, que una web estática no tiene. `docs/resend-action.example.ts` conserva la validación y el esqueleto que había en la versión de Next por si algún día se conecta a un servicio externo.
