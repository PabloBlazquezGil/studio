export type MediaItem = {
  type: 'image' | 'video';
  url: string;
  title?: string;
  /** Texto alternativo de la foto (lo leen los buscadores y los lectores de pantalla). Si falta, se genera uno a partir del proyecto. */
  alt?: string;
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
  /** Parte final de la URL: /servicios/<slug>. */
  slug: string;
  title: string;
  /** Frase corta para listados y para el formulario de contacto. */
  description: string;
  /** Título de la pestaña y de Google (sin el nombre, que se añade solo). Máx. ~55 caracteres. */
  seoTitle: string;
  /** Descripción para Google y redes sociales (120-160 caracteres). */
  seoDescription: string;
  /** Titular grande de la página del servicio. */
  headline: string;
  /** Párrafos de presentación del servicio. */
  intro: string[];
  /** Qué incluye el servicio. */
  includes: string[];
  /** Para quién es. */
  idealFor: string[];
  /** Proyectos que se muestran como ejemplo (por su slug), en este orden. */
  projectSlugs: string[];
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
