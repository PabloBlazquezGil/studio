# Pablo Blázquez Gil · Portfolio

Portfolio de fotografía y vídeo hecho con Next.js 16 (App Router), React 19 y Tailwind CSS. Se despliega en Vercel sin configuración extra.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:9002
npm run lint
npm run typecheck
npm run build
```

## Estructura

| Ruta | Qué es |
|---|---|
| `/` | Carrusel de vídeos a pantalla completa, rejilla de proyectos destacados, sobre mí y clientes |
| `/trabajos` | Todos los proyectos con filtros y vista cuadrícula o lista (`?filtro=deporte&vista=lista`) |
| `/trabajos/[slug]` | Ficha de cada proyecto: portada, descripción, créditos, vídeos, galería y proyectos relacionados |
| `/sobre-mi` | Biografía, servicios y clientes |
| `/contacto` | Datos de contacto y formulario (abre el programa de correo con `mailto:`) |

## Cómo añadir o editar contenido

Todo el contenido está en [`src/lib/data.ts`](src/lib/data.ts):

- **`projects`**: cada proyecto con su `slug` (la URL), título, cliente, categoría, disciplina, portada (`cover`, imagen o vídeo) y medios. El orden de la lista es el orden en la web. En la home, las posiciones 4 y 10 se muestran como tarjetas anchas.
- **`heroSlides`**: los clips del carrusel de la home.
- **`author`**, **`services`**, **`clientLogos`**, **`socialLinks`**.

Los vídeos admiten `#t=5` al final de la URL para empezar en el segundo 5. Las imágenes se sirven desde `thundershoot.com` y `img.youtube.com`; para usar otro dominio, añádelo en `next.config.ts`.

## Formulario de contacto

`src/components/contact-form.tsx` abre el cliente de correo del visitante. `src/app/actions.ts` contiene una Server Action con validación lista para conectar a un servicio de envío (por ejemplo Resend) cuando se active.
