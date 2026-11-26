import type {
  Author,
  Comparison,
  HeroSlide,
  Project,
  Service,
  SocialLink,
  Testimonial,
} from './types';

const WP = 'https://archivos.thundershoot.com';

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

/**
 * Servicios. Cada uno tiene su propia página en /servicios/<slug> pensada para aparecer en Google
 * cuando alguien busca ese tipo de trabajo. `projectSlugs` decide qué trabajos se enseñan como ejemplo.
 */
export const services: Service[] = [
  {
    slug: 'fotografia-deportiva',
    title: 'Fotografía deportiva',
    description:
      'Surf, tenis y deportes de acción. Me muevo con la acción para capturar la intensidad, el gesto y la luz de cada momento.',
    seoTitle: 'Fotógrafo deportivo y de surf en Galicia',
    seoDescription:
      'Fotografía deportiva en Galicia: surf, tenis y deportes de acción. Fotos con intensidad y buena luz para deportistas, clubes y marcas.',
    headline: 'Fotografía deportiva',
    intro: [
      'En el deporte todo pasa en una fracción de segundo: el giro en la ola, el golpe en la red, la cara justo antes de llegar. Mi trabajo es estar en el sitio adecuado, con la luz a favor, para que ese instante quede bien contado.',
      'He fotografiado surf en playas como Furnas, La Lanzada o Malpica y competición de tenis en pista. Me adapto al ritmo de cada disciplina y a lo que necesites hacer con las fotos después: redes, web, prensa o un recuerdo para el deportista.',
    ],
    includes: [
      'Sesiones de surf y deportes al aire libre',
      'Cobertura de partidos, torneos y entrenamientos',
      'Retratos de deportistas y equipos',
      'Selección y edición de color de las mejores fotos',
      'Entrega en alta resolución y en formatos para redes',
    ],
    idealFor: ['Surfistas y deportistas', 'Clubes y escuelas', 'Marcas deportivas', 'Organizadores de eventos'],
    projectSlugs: ['surf-playa-de-furnas', 'tenis-en-freixo', 'surf-la-lanzada', 'surf-en-malpica'],
  },
  {
    slug: 'retrato-y-photobook',
    title: 'Retrato y photobook',
    description:
      'Sesiones para actores, actrices y profesionales que necesitan un book con personalidad, cuidando la luz y la dirección en cada toma.',
    seoTitle: 'Fotógrafo de retrato y photobook en Galicia',
    seoDescription:
      'Retrato y photobook en Galicia para actores, actrices y profesionales. Luz cuidada y dirección en cada toma para un book con personalidad.',
    headline: 'Retrato y photobook',
    intro: [
      'Un buen book no es una colección de fotos bonitas: es lo que ve un director de casting o un cliente antes de conocerte. Por eso cada sesión empieza hablando de qué quieres transmitir y para quién son las fotos.',
      'Durante la sesión te guío con la pose, la expresión y la luz para que no tengas que pensar en la cámara. Probamos estilos distintos para que salgas con un book variado y que se parezca a ti.',
    ],
    includes: [
      'Preparación de la sesión: estilo, vestuario y localización',
      'Dirección durante la sesión',
      'Varios estilos y looks en una misma sesión',
      'Retoque y edición de color de las fotos elegidas',
      'Entrega lista para agencias, castings y redes',
    ],
    idealFor: ['Actores y actrices', 'Modelos', 'Profesionales y emprendedores', 'Artistas y músicos'],
    projectSlugs: ['photobook-helenajes', 'photobook-actriz'],
  },
  {
    slug: 'eventos-y-divulgacion',
    title: 'Eventos y divulgación',
    description:
      'Cobertura en foto y vídeo de congresos, jornadas y eventos científicos o corporativos, con piezas listas para comunicar.',
    seoTitle: 'Fotografía y vídeo de eventos en Galicia',
    seoDescription:
      'Foto y vídeo de congresos, jornadas y eventos científicos o corporativos en Galicia. Tráileres, resúmenes y piezas listas para comunicar.',
    headline: 'Eventos y divulgación',
    intro: [
      'Un evento dura unas horas, pero lo que se cuenta de él puede seguir trabajando para ti durante meses. Cubro congresos, jornadas y actos institucionales pensando desde el principio en cómo se van a usar las imágenes.',
      'He trabajado con el Centro de Astrobiología (CAB, CSIC-INTA) en el tráiler del congreso PhDays y en el vídeo del Día Internacional de la Mujer y la Niña en la Ciencia. Sé moverme en un evento sin molestar y sacar las historias que hay detrás de cada ponencia.',
    ],
    includes: [
      'Fotografía del evento, ponentes y asistentes',
      'Tráileres y vídeos resumen',
      'Entrevistas y piezas de divulgación',
      'Clips cortos para redes durante o después del evento',
      'Entrega organizada para prensa, web y redes',
    ],
    idealFor: ['Centros de investigación', 'Universidades', 'Empresas e instituciones', 'Organizadores de congresos'],
    projectSlugs: ['phdays', 'dia-de-la-mujer-y-la-nina-en-la-ciencia'],
  },
  {
    slug: 'video-y-cortometraje',
    title: 'Vídeo y cortometraje',
    description: 'Dirección de fotografía, cámara y montaje para piezas narrativas, tráileres y vídeo de marca.',
    seoTitle: 'Videógrafo y director de fotografía en Galicia',
    seoDescription:
      'Videógrafo en Galicia: dirección de fotografía, cámara y montaje para cortometrajes, tráileres y vídeo de marca, con mirada de cine.',
    headline: 'Vídeo y cortometraje',
    intro: [
      'Me gusta contar historias con la cámara. Trabajo como director de fotografía, operador de cámara y montador, por separado o en el mismo proyecto, para piezas narrativas, tráileres y vídeo de marca.',
      'En el festival Fervenza 48H rodamos y montamos un cortometraje completo en menos de 48 horas, en el que fui director de fotografía, cámara y editor. Esa forma de trabajar, rápida pero cuidando cada plano, es la que llevo a cada encargo.',
    ],
    includes: [
      'Dirección de fotografía e iluminación',
      'Operador de cámara',
      'Montaje y etalonaje',
      'Tráileres y vídeos promocionales',
      'Vídeo corporativo y de marca',
    ],
    idealFor: ['Productoras y cortometrajistas', 'Marcas y empresas', 'Festivales y proyectos culturales', 'Instituciones'],
    projectSlugs: ['fervenza-48h', 'phdays', 'dia-de-la-mujer-y-la-nina-en-la-ciencia'],
  },
  {
    slug: 'reels-para-redes-sociales',
    title: 'Reels para redes sociales',
    description:
      'Piezas verticales con enfoque cinematográfico para marcas y negocios que quieren destacar en Instagram y TikTok.',
    seoTitle: 'Reels para redes sociales en Galicia',
    seoDescription:
      'Reels y vídeo vertical para marcas y negocios en Galicia, con enfoque de cine. Piezas para Instagram y TikTok que enseñan tu trabajo.',
    headline: 'Reels para redes sociales',
    intro: [
      'En redes tienes un par de segundos para que alguien deje de deslizar. Grabo y monto reels verticales con mirada de cine para que tu marca se vea tan cuidada como tu trabajo.',
      'Para Adria Floristería hice dos reels sobre la preparación de bodas en Casa Beatnik y el Pazo San Lorenzo, enseñando el detalle del estilismo floral y el montaje de los espacios. Cada pieza se piensa en formato vertical desde la grabación, no se recorta después.',
    ],
    includes: [
      'Idea y guion de cada pieza',
      'Grabación en formato vertical 9:16',
      'Montaje con ritmo para redes',
      'Música, textos y subtítulos',
      'Entrega lista para Instagram, TikTok y YouTube Shorts',
    ],
    idealFor: ['Comercios y negocios locales', 'Bodas y eventos', 'Hostelería y turismo', 'Marcas personales'],
    projectSlugs: ['adria-floristeria'],
  },
  {
    slug: 'postproduccion',
    title: 'Postproducción',
    description: 'Edición, etalonaje y entrega en los formatos que necesites, lista para publicar.',
    seoTitle: 'Edición y postproducción de foto y vídeo',
    seoDescription:
      'Edición de fotos, montaje de vídeo y etalonaje, también de material grabado por otros. Entrega lista para web, redes o pantalla grande.',
    headline: 'Postproducción',
    intro: [
      'La mitad de una buena imagen se hace después de disparar. Me encargo de la edición fotográfica, el montaje y el etalonaje para que todas las piezas de un proyecto tengan el mismo color y la misma intención.',
      'Me ocupo de la postproducción de lo que grabo yo y también de fotos y vídeos que ya tengas, grabados por ti o por otro equipo. Lo entrego en el formato que necesites para web, redes o proyección.',
    ],
    includes: [
      'Edición y retoque de fotos, también de material ajeno',
      'Edición y montaje de vídeo',
      'Etalonaje y corrección de color',
      'Sonido, música y subtítulos',
      'Exportación para web, redes y proyección',
    ],
    idealFor: ['Marcas y empresas', 'Productoras', 'Creadores de contenido', 'Fotógrafos y videógrafos'],
    projectSlugs: ['fervenza-48h', 'surf-playa-de-furnas', 'adria-floristeria', 'photobook-helenajes'],
  },
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

export const contactEmail = 'pablo.blazquez@thundershoot.com';

export const socialLinks: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com/pabloblazquezgil' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/pabloblazquezgil' },
  { label: 'Email', href: `mailto:${contactEmail}` },
];


/** Titular de la web para el aviso legal (art. 10 LSSI). Sin domicilio por ahora, a petición del titular. */
export const legalHolder = {
  name: 'Pablo Blázquez Gil',
  nif: '45879019E',
  email: contactEmail,
  activity: 'Fotografía y vídeo profesional',
  updated: { es: '26 de noviembre de 2026', en: '26 November 2026' },
};
