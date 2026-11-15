import type { Author, Project, Service } from '@/lib/types';

/**
 * Contenido en inglés. Solo lleva los textos: las fotos, vídeos y el orden salen de src/lib/data.ts.
 * Al añadir un proyecto en data.ts, añade aquí su traducción con el mismo slug.
 * Si falta, la versión inglesa muestra el texto en español.
 */
export type ProjectTranslation = Partial<Pick<Project, 'title' | 'client' | 'category' | 'description'>> & {
  /** Títulos de los vídeos, en el mismo orden que en data.ts. */
  videoTitles?: string[];
};

export const projectsEn: Record<string, ProjectTranslation> = {
  'surf-playa-de-furnas': {
    title: 'Surfing at Furnas Beach',
    client: 'Private client',
    category: 'Sports photography',
    description:
      'A high-intensity surf session shot in the demanding conditions and unique light of Furnas beach.',
  },
  'dia-de-la-mujer-y-la-nina-en-la-ciencia': {
    title: 'International Day of Women and Girls in Science',
    category: 'Science outreach event',
    description:
      'A commemorative film for the International Day of Women and Girls in Science, highlighting the vital role women play in astrobiology and space research. Made for the Centro de Astrobiología (CAB, CSIC-INTA).',
  },
  'photobook-actriz': {
    title: 'Actress Photobook',
    client: 'Private client',
    category: 'Portrait',
    description:
      'A photo session for a personal photobook, exploring different looks, lighting and expressions to capture her true essence.',
  },
  'fervenza-48h': {
    client: 'Fervenza 48H Festival',
    category: 'Short film',
    description:
      'A short film made for the Fervenza 48H festival in Cabanas, Galicia. A full filmmaking challenge covering pre-production, shooting and post-production in under 48 hours. On this piece I was director of photography, camera operator and editor.',
  },
  'adria-floristeria': {
    category: 'Social media reels',
    description:
      'Two social media reels about the preparation and meticulous work behind their wedding services. A cinematic, detail-driven approach that showcases the art of floral styling, venue design and the elegance of wedding-day preparations.',
  },
  'tenis-en-freixo': {
    title: 'Tennis in Freixo',
    category: 'Sports photography',
    description: 'Capturing the intensity, speed and precision of every shot during a tennis session on the Freixo courts.',
  },
  'photobook-helenajes': {
    title: 'HelenaJes Photobook',
    category: 'Portrait',
    description: 'A photobook session for actress HelenaJes, capturing her range and essence for her professional portfolio.',
  },
  phdays: {
    category: 'Scientific event',
    description:
      'Trailer for the PhDays conference, an event that brings together PhD students to present cutting-edge research in astrobiology.',
  },
  'surf-la-lanzada': {
    title: 'Surfing at La Lanzada',
    client: 'Private client',
    category: 'Sports photography',
    description: 'Capturing the beauty of surfing and the power of the ocean at the iconic beach of La Lanzada.',
  },
  'surf-en-malpica': {
    title: 'Surfing in Malpica',
    client: 'Private client',
    category: 'Sports photography',
    description: 'Capturing the energy and passion of surfing on the waves of Malpica.',
  },
};

export const authorEn: Pick<Author, 'title' | 'bio'> = {
  title: 'A storyteller behind the lens',
  bio: `My name is Pablo Blázquez Gil. Driven by a passion for visual storytelling, I have spent more than a decade honing my craft, turning fleeting moments into timeless stories. My work blends cinematic craft with genuine emotion, finding beauty in both the grand and the subtle.\n\nFrom commercial campaigns to personal projects, I approach every frame with intention and a desire to connect with the viewer on a deeper level. Let's create something unforgettable together.`,
};

/** Mismo orden que `services` en data.ts. */
export const servicesEn: Service[] = [
  {
    title: 'Sports photography',
    description:
      'Surf, tennis and action sports. I move with the action to capture the intensity, the gesture and the light of every moment.',
  },
  {
    title: 'Portraits & photobooks',
    description:
      'Sessions for actors and professionals who need a book with personality, with careful attention to light and direction in every shot.',
  },
  {
    title: 'Events & science outreach',
    description:
      'Photo and video coverage of conferences, open days and scientific or corporate events, with pieces ready to share.',
  },
  {
    title: 'Video & short film',
    description: 'Cinematography, camera work and editing for narrative pieces, trailers and brand films.',
  },
  {
    title: 'Social media reels',
    description:
      'Vertical pieces with a cinematic edge for brands and businesses that want to stand out on Instagram and TikTok.',
  },
  {
    title: 'Post-production',
    description: 'Editing, colour grading and delivery in whatever formats you need, ready to publish.',
  },
];

/** Mismo orden que `budgetRanges` en data.ts. */
export const budgetRangesEn = ['Under €300', '€300 – €800', '€800 – €1,500', 'Over €1,500', 'Not sure yet'];

export const marqueeWordsEn = ['Surf', 'Sports', 'Portrait', 'Events', 'Film', 'Reels'];
