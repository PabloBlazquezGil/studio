export type MediaItem = {
  type: 'image' | 'video';
  url: string;
  title?: string;
};

export type Discipline = 'deporte' | 'retrato' | 'eventos' | 'cine' | 'redes';

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  discipline: Discipline;
  year?: number;
  description: string;
  /** Imagen o vídeo que se muestra en las tarjetas y en la cabecera del proyecto. */
  cover: string;
  media: MediaItem[];
  /** Los vídeos verticales (reels) se presentan en formato 9:16. */
  orientation?: 'portrait' | 'landscape';
};

export type HeroSlide = {
  projectSlug: string;
  videoUrl: string;
};

export type Author = {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
};

export type Service = {
  title: string;
  description: string;
};

export type ClientLogo = {
  clientName: string;
  logoUrl: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type Comparison = {
  title: string;
  /** Foto sin editar (RAW revelado en plano). */
  before: string;
  /** La misma foto con la edición y el color final. */
  after: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  /** Cargo, empresa o proyecto. */
  role: string;
};
