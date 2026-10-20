import type {
  Author,
  ClientLogo,
  Comparison,
  HeroSlide,
  Project,
  Service,
  SocialLink,
  Testimonial,
} from './types';

const WP = 'https://thundershoot.com/wp-content/uploads';

/**
 * Proyectos del portfolio.
 * El orden de esta lista es el orden en el que aparecen en la home y en /trabajos.
 * En la home, las posiciones 4 y 10 se muestran como tarjetas anchas (ver `BentoGrid`).
 */
export const projects: Project[] = [
  {
    slug: 'surf-playa-de-furnas',
    title: 'Surf en la Playa de Furnas',
    client: 'Cliente privado',
    category: 'Fotografía deportiva',
    discipline: 'deporte',
    year: 2026,
    description:
      'Sesión de surf de alta intensidad capturada bajo las desafiantes condiciones y la luz única de la playa de Furnas.',
    cover: `${WP}/2026/05/PBG01768.avif`,
    media: [
      { type: 'image', url: `${WP}/2026/05/PBG01768.avif` },
      { type: 'image', url: `${WP}/2026/05/PBG01773.avif` },
      { type: 'image', url: `${WP}/2026/05/PBG01778.avif` },
      { type: 'image', url: `${WP}/2026/05/PBG01699.avif` },
      { type: 'image', url: `${WP}/2026/05/PBG01716.avif` },
      { type: 'image', url: `${WP}/2026/05/PBG01738.avif` },
      { type: 'image', url: `${WP}/2026/05/PBG01742.avif` },
      { type: 'image', url: `${WP}/2026/05/PBG01744-2.avif` },
      { type: 'image', url: `${WP}/2026/05/PBG01758.avif` },
    ],
  },
  {
    slug: 'dia-de-la-mujer-y-la-nina-en-la-ciencia',
    title: 'Día de la Mujer y la Niña en la Ciencia',
    client: 'Centro de Astrobiología (CAB, CSIC-INTA)',
    category: 'Evento de divulgación',
    discipline: 'eventos',
    year: 2024,
    description:
      'Vídeo conmemorativo para el Día Internacional de la Mujer y la Niña en la Ciencia, destacando el crucial papel de las mujeres en la astrobiología y la investigación espacial. Creado para el Centro de Astrobiología (CAB, CSIC-INTA).',
    cover: `${WP}/2024/11/Dia-de-la-Mujer-y-la-Nina-en-la-Ciencia-11_02_2024-Centro-de-Astrobiologia-CAB-CSIC-INTA.mp4#t=5`,
    media: [
      {
        type: 'video',
        url: `${WP}/2024/11/Dia-de-la-Mujer-y-la-Nina-en-la-Ciencia-11_02_2024-Centro-de-Astrobiologia-CAB-CSIC-INTA.mp4#t=5`,
      },
    ],
  },
  {
    slug: 'photobook-actriz',
    title: 'Photobook Actriz',
    client: 'Cliente privado',
    category: 'Retrato',
    discipline: 'retrato',
    year: 2026,
    description:
      'Sesión fotográfica para un photobook personal, explorando diferentes estilos, luces y expresiones para capturar su verdadera esencia.',
    cover: `${WP}/2026/05/PBG01270-scaled.jpg`,
    media: [
      { type: 'image', url: `${WP}/2026/05/PBG01270-scaled.jpg` },
      { type: 'image', url: `${WP}/2026/05/PBG01148-scaled.jpg` },
      { type: 'image', url: `${WP}/2026/05/PBG01125-scaled.jpg` },
      { type: 'image', url: `${WP}/2026/05/PBG01051-scaled.jpg` },
      { type: 'image', url: `${WP}/2026/05/PBG01031-scaled.jpg` },
      { type: 'image', url: `${WP}/2026/05/PBG00922-scaled.jpg` },
    ],
  },
  {
    slug: 'fervenza-48h',
    title: 'Fervenza 48H',
    client: 'Festival Fervenza 48H',
    category: 'Cortometraje',
    discipline: 'cine',
    year: 2025,
    description:
      'Cortometraje realizado para el festival Fervenza 48H en el concello de Cabanas. Un reto cinematográfico completo que abarcó preproducción, producción y postproducción en un plazo récord de menos de 48 horas. En esta obra desempeñé el rol de director de fotografía, cámara y editor.',
    cover: 'https://img.youtube.com/vi/f-erOiwac60/maxresdefault.jpg',
    media: [{ type: 'video', url: 'https://youtu.be/f-erOiwac60' }],
  },
  {
    slug: 'adria-floristeria',
    title: 'Adria Floristería',
    client: 'Adria Floristería',
    category: 'Reels para redes sociales',
    discipline: 'redes',
    year: 2026,
    description:
      'Creación de dos reels para redes sociales sobre la preparación y su minucioso trabajo en servicios de bodas. Un enfoque cinematográfico y detallista que destaca el arte del estilismo floral, el diseño de espacios y la elegancia de los preparativos matrimoniales.',
    cover: `${WP}/2026/06/SHORT-FILM-CASA-BEATNIK-1080.mp4`,
    media: [
      { type: 'video', url: `${WP}/2026/06/SHORT-FILM-CASA-BEATNIK-1080.mp4`, title: 'Casa Beatnik' },
      { type: 'video', url: `${WP}/2026/06/Short-Film-San-Lorenzo-1.mp4`, title: 'Pazo San Lorenzo' },
    ],
    orientation: 'portrait',
  },
  {
    slug: 'tenis-en-freixo',
    title: 'Tenis en Freixo',
    client: 'Club de Tenis Freixo',
    category: 'Fotografía deportiva',
    discipline: 'deporte',
    year: 2026,
    description:
      'Capturando la intensidad, velocidad y precisión en cada golpe durante la sesión de tenis en las pistas de Freixo.',
    cover: `${WP}/2026/05/Interclub-Portosiavo-118.avif`,
    media: [
      { type: 'image', url: `${WP}/2026/05/Interclub-Portosiavo-118.avif` },
      { type: 'image', url: `${WP}/2026/05/Interclub-Portosiavo-112.avif` },
      { type: 'image', url: `${WP}/2026/05/Interclub-Portosiavo-65.avif` },
      { type: 'image', url: `${WP}/2026/05/Interclub-Portosiavo-54.avif` },
      { type: 'image', url: `${WP}/2026/05/Interclub-Portosiavo-38.avif` },
      { type: 'image', url: `${WP}/2026/05/Interclub-Portosiavo-35.avif` },
      { type: 'image', url: `${WP}/2026/05/Interclub-Portosiavo-29.avif` },
      { type: 'image', url: `${WP}/2026/05/Interclub-Portosiavo-24.avif` },
      { type: 'image', url: `${WP}/2026/05/Interclub-Portosiavo-3.avif` },
      { type: 'image', url: `${WP}/2026/05/Interclub-Portosiavo-156.avif` },
    ],
  },
  {
    slug: 'photobook-helenajes',
    title: 'Photobook HelenaJes',
    client: 'HelenaJes',
    category: 'Retrato',
    discipline: 'retrato',
    year: 2026,
    description:
      'Sesión de photobook para la actriz HelenaJes, capturando su versatilidad y esencia para su portfolio profesional.',
    cover: `${WP}/2026/02/PBG07394-scaled.avif`,
    media: [
      { type: 'image', url: `${WP}/2026/02/PBG07394-scaled.avif` },
      { type: 'image', url: `${WP}/2026/02/PBG07352-Editar-scaled.avif` },
      { type: 'image', url: `${WP}/2026/02/PBG07289-Editar-scaled.avif` },
      { type: 'image', url: `${WP}/2026/02/PBG07294-Editar-scaled.avif` },
      { type: 'image', url: `${WP}/2026/02/PBG07343-Editar-scaled.avif` },
      { type: 'image', url: `${WP}/2026/02/PBG07275-Editar-scaled.avif` },
      { type: 'image', url: `${WP}/2026/02/PBG07358-Editar-scaled.avif` },
      { type: 'image', url: `${WP}/2026/02/PBG07376-Editar-scaled.avif` },
      { type: 'image', url: `${WP}/2026/02/PBG07389-Editar-scaled.avif` },
      { type: 'image', url: `${WP}/2026/02/PBG07390-Editar-scaled.avif` },
      { type: 'image', url: `${WP}/2026/02/PBG07393-Editar-scaled.avif` },
    ],
  },
  {
    slug: 'phdays',
    title: 'PhDays',
    client: 'Centro de Astrobiología (CAB, CSIC-INTA)',
    category: 'Evento científico',
    discipline: 'eventos',
    description:
      'Tráiler del congreso PhDays, un evento que reúne a estudiantes de doctorado para presentar sus investigaciones de vanguardia en el campo de la astrobiología.',
    cover: `${WP}/2024/11/Trailer-PhDays2023-Centro-de-Astrobiologia.mp4#t=5`,
    media: [{ type: 'video', url: `${WP}/2024/11/Trailer-PhDays2023-Centro-de-Astrobiologia.mp4#t=5` }],
  },
  {
    slug: 'surf-la-lanzada',
    title: 'Surf en La Lanzada',
    client: 'Cliente privado',
    category: 'Fotografía deportiva',
    discipline: 'deporte',
    year: 2026,
    description: 'Capturando la belleza del surf y la fuerza del océano en la emblemática playa de La Lanzada.',
    cover: `${WP}/2026/05/La-Lanzada-14-2.avif`,
    media: [
      { type: 'image', url: `${WP}/2026/05/La-Lanzada-14-2.avif` },
      { type: 'image', url: `${WP}/2026/05/La-Lanzada-11-2.avif` },
      { type: 'image', url: `${WP}/2026/05/La-Lanzada-10-2.avif` },
      { type: 'image', url: `${WP}/2026/05/La-Lanzada-3-2.avif` },
    ],
  },
  {
    slug: 'surf-en-malpica',
    title: 'Surf en Malpica',
    client: 'Cliente privado',
    category: 'Fotografía deportiva',
    discipline: 'deporte',
    year: 2026,
    description: 'Capturando la energía y la pasión del surf en las olas de Malpica.',
    cover: `${WP}/2026/02/PBG07245_2048px.avif`,
    media: [
      { type: 'image', url: `${WP}/2026/02/PBG07245_2048px.avif` },
      { type: 'image', url: `${WP}/2026/02/PBG06887_2048px.avif` },
      { type: 'image', url: `${WP}/2026/02/PBG06897_2048px-2.avif` },
      { type: 'image', url: `${WP}/2026/02/PBG07002_2048px.avif` },
      { type: 'image', url: `${WP}/2026/02/PBG07096_2048px.avif` },
      { type: 'image', url: `${WP}/2026/02/PBG07176_2048px.avif` },
    ],
  },
];

/** Clips del carrusel a pantalla completa de la home. */
export const heroSlides: HeroSlide[] = [
  {
    projectSlug: 'dia-de-la-mujer-y-la-nina-en-la-ciencia',
    videoUrl: `${WP}/2024/11/Dia-de-la-Mujer-y-la-Nina-en-la-Ciencia-11_02_2024-Centro-de-Astrobiologia-CAB-CSIC-INTA.mp4#t=5`,
  },
  {
    projectSlug: 'adria-floristeria',
    videoUrl: `${WP}/2026/06/SHORT-FILM-CASA-BEATNIK-1080.mp4`,
  },
  {
    projectSlug: 'phdays',
    videoUrl: `${WP}/2024/11/Trailer-PhDays2023-Centro-de-Astrobiologia.mp4#t=5`,
  },
  {
    projectSlug: 'adria-floristeria',
    videoUrl: `${WP}/2026/06/Short-Film-San-Lorenzo-1.mp4`,
  },
];

export const author: Author = {
  name: 'Pablo Blázquez Gil',
  title: 'Un narrador detrás del lente',
  bio: `Mi nombre es Pablo Blázquez Gil. Con una pasión por la narrativa visual, he pasado más de una década perfeccionando mi arte, transformando momentos fugaces en historias atemporales. Mi trabajo es una mezcla de arte cinematográfico y emoción auténtica, buscando la belleza tanto en lo grandioso como en lo sutil.\n\nDesde campañas comerciales hasta proyectos personales, abordo cada fotograma con intención y el deseo de conectar con el espectador a un nivel más profundo. Creemos algo inolvidable juntos.`,
  imageUrl: `${WP}/2026/02/1710610037469-scaled.jpg`,
};

export const services: Service[] = [
  {
    title: 'Fotografía deportiva',
    description:
      'Surf, tenis y deportes de acción. Me muevo con la acción para capturar la intensidad, el gesto y la luz de cada momento.',
  },
  {
    title: 'Retrato y photobook',
    description:
      'Sesiones para actores, actrices y profesionales que necesitan un book con personalidad, cuidando la luz y la dirección en cada toma.',
  },
  {
    title: 'Eventos y divulgación',
    description:
      'Cobertura en foto y vídeo de congresos, jornadas y eventos científicos o corporativos, con piezas listas para comunicar.',
  },
  {
    title: 'Vídeo y cortometraje',
    description:
      'Dirección de fotografía, cámara y montaje para piezas narrativas, tráileres y vídeo de marca.',
  },
  {
    title: 'Reels para redes sociales',
    description:
      'Piezas verticales con enfoque cinematográfico para marcas y negocios que quieren destacar en Instagram y TikTok.',
  },
  {
    title: 'Postproducción',
    description: 'Edición, etalonaje y entrega en los formatos que necesites, lista para publicar.',
  },
];

export const clientLogos: ClientLogo[] = [
  { clientName: 'Centro de Astrobiología', logoUrl: `${WP}/2025/02/0.png` },
  { clientName: 'CSIC', logoUrl: `${WP}/2025/01/LOGO_PNG.png` },
  { clientName: 'INTA', logoUrl: `${WP}/2024/11/images-2.png` },
  { clientName: 'EANA', logoUrl: `${WP}/2024/11/EANA_logo-2.png.webp` },
];

/**
 * Comparador antes/después de color. Añade pares de la misma foto (sin editar y editada)
 * y la sección aparecerá en la home. Mientras esté vacío, la sección no se muestra.
 */
export const comparisons: Comparison[] = [];

/**
 * Opiniones de clientes. Mientras esté vacío, la sección no se muestra.
 * Ejemplo: { quote: '...', name: 'Nombre', role: 'Club de Tenis Freixo' }
 */
export const testimonials: Testimonial[] = [];

/** Rangos de presupuesto que se ofrecen en el briefing de /contacto. Ajústalos a tus tarifas. */
export const budgetRanges = ['Menos de 300 €', '300 – 800 €', '800 – 1.500 €', 'Más de 1.500 €', 'Aún no lo sé'];

/** Palabras del texto en movimiento de la home. */
export const marqueeWords = ['Surf', 'Deporte', 'Retrato', 'Eventos', 'Cine', 'Reels'];

export const contactEmail = 'pabloblazquezgil@gmail.com';

export const socialLinks: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com/pabloblazquezgil' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/pabloblazquezgil' },
  { label: 'Email', href: `mailto:${contactEmail}` },
];

export const logoUrl = `${WP}/2026/05/Logo-Pablo-Blazquez.png`;
