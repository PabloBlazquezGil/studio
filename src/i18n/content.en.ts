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
      'A commemorative film for the International Day of Women and Girls in Science, highlighting the vital role women play in astrobiology and space research. Made during my time at the Centro de Astrobiología (CAB, CSIC-INTA).',
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

/** Mismo orden que `services` en data.ts. El slug y los proyectos de ejemplo salen de data.ts. */
export type ServiceTranslation = Omit<Service, 'slug' | 'projectSlugs'>;

export const servicesEn: ServiceTranslation[] = [
  {
    title: 'Sports photography',
    description:
      'Surf, tennis and action sports. I move with the action to capture the intensity, the gesture and the light of every moment.',
    seoTitle: 'Sports and surf photographer in Galicia',
    seoDescription:
      'Sports photography in Galicia, Spain: surf, tennis and action sports. Intense images in great light for athletes, clubs and brands.',
    headline: 'Sports photography',
    intro: [
      'In sport everything happens in a split second: the turn on the wave, the shot at the net, the face just before the finish. My job is to be in the right place, with the light on my side, so that moment is told properly.',
      "I've photographed surfing at beaches such as Furnas, La Lanzada and Malpica, and competitive tennis on court. I adapt to the pace of each sport and to what you need the photos for afterwards: social media, web, press or a keepsake for the athlete.",
    ],
    includes: [
      'Surf and outdoor sports sessions',
      'Coverage of matches, tournaments and training',
      'Portraits of athletes and teams',
      'Selection and colour editing of the best shots',
      'Delivery in high resolution and social media formats',
    ],
    idealFor: ['Surfers and athletes', 'Clubs and schools', 'Sports brands', 'Event organisers'],
  },
  {
    title: 'Portraits & photobooks',
    description:
      'Sessions for actors and professionals who need a book with personality, with careful attention to light and direction in every shot.',
    seoTitle: 'Portrait and photobook photographer in Galicia',
    seoDescription:
      'Portrait and photobook sessions in Galicia for actors, actresses and professionals. Careful light and direction for a book with personality.',
    headline: 'Portraits & photobooks',
    intro: [
      "A good book isn't just a collection of nice photos: it's what a casting director or a client sees before they meet you. That's why every session starts with a conversation about what you want to convey and who the photos are for.",
      "During the shoot I guide you on pose, expression and light so you don't have to think about the camera. We try different looks so you leave with a varied book that feels like you.",
    ],
    includes: [
      'Session planning: style, wardrobe and location',
      'Direction during the shoot',
      'Several looks in a single session',
      'Retouching and colour editing of the selected photos',
      'Delivery ready for agencies, castings and social media',
    ],
    idealFor: ['Actors and actresses', 'Models', 'Professionals and entrepreneurs', 'Artists and musicians'],
  },
  {
    title: 'Events & science outreach',
    description:
      'Photo and video coverage of conferences, open days and scientific or corporate events, with pieces ready to share.',
    seoTitle: 'Event photography and video in Galicia',
    seoDescription:
      'Photo and video coverage of conferences, open days and scientific or corporate events in Galicia. Trailers, recaps and ready-to-share pieces.',
    headline: 'Events & science outreach',
    intro: [
      'An event lasts a few hours, but the story told about it can keep working for you for months. I cover conferences, open days and institutional events with a clear idea from the start of how the images will be used.',
      "During my time at the Centro de Astrobiología (CAB, CSIC-INTA) I made, among other pieces, the trailer for the PhDays conference and the film for the International Day of Women and Girls in Science. I know how to move around an event without getting in the way and find the stories behind each talk.",
    ],
    includes: [
      'Photography of the event, speakers and attendees',
      'Trailers and recap videos',
      'Interviews and outreach pieces',
      'Short clips for social media during or after the event',
      'Organised delivery for press, web and social media',
    ],
    idealFor: ['Research centres', 'Universities', 'Companies and institutions', 'Conference organisers'],
  },
  {
    title: 'Video & short film',
    description: 'Cinematography, camera work and editing for narrative pieces, trailers and brand films.',
    seoTitle: 'Videographer and cinematographer in Galicia',
    seoDescription:
      'Videographer in Galicia, Spain: cinematography, camera and editing for short films, trailers and brand videos, with a cinematic eye.',
    headline: 'Video & short film',
    intro: [
      'I love telling stories with a camera. I work as director of photography, camera operator and editor, separately or on the same project, for narrative pieces, trailers and brand films.',
      'At the Fervenza 48H festival we shot and edited a complete short film in under 48 hours, with me as director of photography, camera operator and editor. That way of working, fast but caring about every shot, is what I bring to every job.',
    ],
    includes: [
      'Cinematography and lighting',
      'Camera operation',
      'Editing and colour grading',
      'Trailers and promotional videos',
      'Corporate and brand video',
    ],
    idealFor: ['Production companies and filmmakers', 'Brands and companies', 'Festivals and cultural projects', 'Institutions'],
  },
  {
    title: 'Social media reels',
    description:
      'Vertical pieces with a cinematic edge for brands and businesses that want to stand out on Instagram and TikTok.',
    seoTitle: 'Social media reels in Galicia',
    seoDescription:
      'Reels and vertical video for brands and businesses in Galicia, with a cinematic edge. Pieces for Instagram and TikTok that show your work.',
    headline: 'Social media reels',
    intro: [
      "On social media you have a couple of seconds before someone keeps scrolling. I shoot and edit vertical reels with a cinematic eye so your brand looks as polished as your work.",
      'For Adria Floristería I made two reels about wedding preparations at Casa Beatnik and Pazo San Lorenzo, showing the detail of the floral styling and the venue set-up. Each piece is planned in vertical format from the shoot, not cropped afterwards.',
    ],
    includes: [
      'Concept and script for each piece',
      'Filming in 9:16 vertical format',
      'Social-media-paced editing',
      'Music, text and subtitles',
      'Delivery ready for Instagram, TikTok and YouTube Shorts',
    ],
    idealFor: ['Shops and local businesses', 'Weddings and events', 'Hospitality and tourism', 'Personal brands'],
  },
  {
    title: 'Post-production',
    description: 'Editing, colour grading and delivery in whatever formats you need, ready to publish.',
    seoTitle: 'Photo and video editing and post-production',
    seoDescription:
      "Photo editing, video editing and colour grading, including footage shot by others. Delivered ready for web, social media or the big screen.",
    headline: 'Post-production',
    intro: [
      'Half of a great image is made after the shutter clicks. I handle photo editing, video editing and colour grading so every piece of a project shares the same look and intent.',
      "I post-produce what I shoot and also photos and footage you already have, whether you shot them yourself or another crew did. I deliver in whatever format you need for web, social media or projection.",
    ],
    includes: [
      'Photo editing and retouching, including third-party material',
      'Video editing',
      'Colour grading and correction',
      'Sound, music and subtitles',
      'Export for web, social media and projection',
    ],
    idealFor: ['Brands and companies', 'Production companies', 'Content creators', 'Photographers and videographers'],
  },
];

/** Mismo orden que `budgetRanges` en data.ts. */
export const budgetRangesEn = ['Under €300', '€300 – €800', '€800 – €1,500', 'Over €1,500', 'Not sure yet'];

export const marqueeWordsEn = ['Surf', 'Sports', 'Portrait', 'Events', 'Film', 'Reels'];
