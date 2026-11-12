# Migración de Next.js a Astro: lista de comprobación

Comparado contra `main` (Next 16 + Tailwind 4) con las dos versiones compiladas y servidas en local, a 390 y 1280 px.
Los medios (archivos.thundershoot.com y YouTube) no se pueden cargar desde el entorno de pruebas: las imágenes se sustituyeron por una imagen de relleno y los vídeos no se reprodujeron. Maquetación, medidas y comportamiento sí se comprobaron; el aspecto real de las fotos y los vídeos hay que verlo en la vista previa con red.

## Páginas y rutas

- [x] `/`, `/trabajos`, `/trabajos/[slug]` (10 proyectos), `/sobre-mi`, `/contacto`, `/aviso-legal`, `/politica-de-privacidad`
- [x] 404 propia (`404.html` + `.htaccess` para Hostinger)
- [x] 457 enlaces internos revisados en el HTML generado: ninguno roto
- [~] Las URL llevan barra final (`/trabajos/`); el servidor redirige `/trabajos` a `/trabajos/` automáticamente

## Diseño y estilos

- [x] Colores canopy `#1C2826`, gold `#D4AF37`, linen `#F9F8F6`, tipografías Barlow Condensed e Inter (ahora autoalojadas con Fontsource en vez de next/font)
- [x] Capturas a 390 y 1280 px de las 8 rutas, con las dos versiones una al lado de la otra: misma maquetación y alturas de página idénticas (salvo /contacto, que tenía 96 px de más por el contenedor de avisos y ya está corregido). La comparación píxel a píxel de página completa no es fiable en /trabajos porque la cabecera fija y las animaciones de aparición caen en puntos distintos de la captura; ahí se comparó a ojo y con medidas
- [x] Logo Encuadre en cabecera, pie y favicon (`icon.svg`, `apple-icon.png`, `favicon.ico` ahora en `public/`)
- [x] Secciones vacías (`comparisons`, `testimonials`) siguen ocultas
- [x] Sin menciones a Alvo Estudio ni Toxogel; sin logos de clientes (se quitaron en la PR #7)

## Animaciones y movimiento

- [x] Scroll suave con Lenis, sincronizado con ScrollTrigger; desactivado con «reducir movimiento»
- [x] Titulares que se revelan letra a letra (`SplitHeading`)
- [x] Parallax en tarjetas y foto de «Sobre mí»
- [x] Texto gigante en movimiento (marquee)
- [x] Zoom y oscurecido del carrusel al bajar
- [x] Aparición al entrar en pantalla (`Reveal`); ahora el contenido solo se oculta si JavaScript va a mostrarlo
- [x] Cortina dorada al entrar en cada página (en Astro se reproduce en cada carga de página)

## Componentes interactivos

- [x] Cabecera transparente sobre vídeo y sólida al bajar; menú móvil (abre, cierra al navegar, bloquea el scroll)
- [x] Carrusel de la home: 7 s por clip, barras tipo stories, salto al tocar, solo se cargan el clip actual y el siguiente
- [x] Vídeos en bucle que solo cargan cerca de la pantalla y respetan `#t=`
- [x] /trabajos: 7 filtros con los mismos recuentos que antes, vista cuadrícula y lista, estado en la URL (`?filtro=deporte&vista=lista`), vista previa que sigue al cursor
- [x] Visor de fotos (← → Esc) en las fichas
- [x] Comparador antes/después (isla de React; no se muestra mientras `comparisons` esté vacío)
- [x] Briefing de 4 pasos con validación y aviso (toast)

## Contacto

- [x] Formulario con `mailto:` y aviso «Abriendo cliente de correo»; correo y redes en la página y el pie
- [x] La Server Action de Resend no puede existir en una web estática: queda de ejemplo en `docs/resend-action.example.ts`

## SEO

- [x] `<title>` con plantilla «… | Pablo Blázquez Gil», descripción, Open Graph (título, descripción, sitio, idioma, imagen 2048×1518 con alt), imagen propia por proyecto
- [x] `sitemap.xml` (6 páginas + 10 proyectos) y `robots.txt` con la ruta del sitemap, ambos con `SITE_URL`
- [+] Añadidos: canonical, `og:url` y Twitter Card; 404 con `noindex`
- [+] Corregido: los títulos de las páginas legales salían duplicados («Aviso Legal | Pablo Blázquez Gil | Pablo Blázquez Gil»)
- [ ] Datos estructurados (JSON-LD): no existían antes y no se han añadido

## Imágenes y vídeos

- [x] Mismos archivos (ahora en archivos.thundershoot.com) y YouTube, vídeos de YouTube con `youtube-nocookie`
- [~] Cambia: `next/image` redimensionaba las imágenes remotas; ahora se sirven tal cual (lazy, `decoding=async`, primera con prioridad). Las fotos ya están en AVIF/JPG en el origen

## Responsive

- [x] 390 y 1280 px: sin desbordamiento horizontal en ninguna ruta, mismas alturas de página que antes

## Herramientas

- [x] Node 24 (`.nvmrc` y `engines`), `npm run build` sin errores, `npm run check` (`astro check`) con 0 errores
- [~] Se elimina ESLint de Next (`npm run lint`); el chequeo de tipos pasa a `npm run check`
