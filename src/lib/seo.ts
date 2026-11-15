/**
 * Datos estructurados (schema.org en JSON-LD) y textos para buscadores.
 * Google los usa para entender quién eres, qué ofreces y qué hay en cada página.
 * Se pueden comprobar con https://validator.schema.org o la Prueba de resultados enriquecidos de Google.
 */
import { author, contactEmail, projects, services, socialLinks } from './data';
import { disciplineLabels, getProjectImage, isVideoProject } from './projects';
import { areaServed, jobTitle, location, siteName } from './site';
import type { MediaItem, Project, Service } from './types';
import { getYouTubeId, isVideoFile } from './utils';

type Json = Record<string, unknown>;

const abs = (path: string, site: URL) => new URL(path, site).href;
const ids = (site: URL) => ({
  website: abs('/#website', site),
  person: abs('/#person', site),
  business: abs('/#business', site),
});

const sameAs = socialLinks.filter((l) => l.href.startsWith('http')).map((l) => l.href);

/** Persona, negocio y web: van en todas las páginas y el resto de datos los referencian por su @id. */
export function siteGraph(site: URL): Json[] {
  const id = ids(site);
  const address =
    location.locality || location.region
      ? {
          '@type': 'PostalAddress',
          ...(location.locality && { addressLocality: location.locality }),
          ...(location.region && { addressRegion: location.region }),
          addressCountry: location.country,
        }
      : undefined;

  return [
    {
      '@type': 'WebSite',
      '@id': id.website,
      url: abs('/', site),
      name: siteName,
      inLanguage: 'es-ES',
      publisher: { '@id': id.person },
    },
    {
      '@type': 'Person',
      '@id': id.person,
      name: author.name,
      jobTitle,
      url: abs('/sobre-mi/', site),
      image: author.imageUrl,
      email: `mailto:${contactEmail}`,
      sameAs,
      knowsAbout: ['Fotografía', 'Vídeo', 'Dirección de fotografía', ...services.map((s) => s.title)],
      worksFor: { '@id': id.business },
    },
    {
      '@type': 'ProfessionalService',
      '@id': id.business,
      name: `${author.name} · Fotografía y vídeo`,
      description: 'Fotografía y vídeo profesional: deporte y surf, retrato, eventos, cortometrajes y reels para redes sociales.',
      url: abs('/', site),
      image: abs('/og.jpg', site),
      logo: abs('/apple-icon.png', site),
      email: contactEmail,
      founder: { '@id': id.person },
      sameAs,
      areaServed: areaServed.map((name) => ({ '@type': 'Country', name })),
      ...(address && { address }),
      knowsLanguage: 'es',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de fotografía y vídeo',
        itemListElement: services.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.title, url: abs(`/servicios/${s.slug}/`, site) },
        })),
      },
    },
  ];
}

export function breadcrumbs(site: URL, items: { name: string; path: string }[]): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Inicio', path: '/' }, ...items].map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: abs(item.path, site),
    })),
  };
}

/** Texto alternativo de una foto de un proyecto. */
export function imageAlt(project: Project, item: MediaItem | undefined, index: number, total: number): string {
  if (item?.alt) return item.alt;
  const client = project.client !== 'Cliente privado' ? ` para ${project.client}` : '';
  const count = total > 1 ? `, foto ${index + 1} de ${total}` : '';
  return `${project.title}: ${project.category.toLowerCase()}${client}${count}. Pablo Blázquez Gil`;
}

/** Texto alternativo de la portada de un proyecto. */
export function coverAlt(project: Project): string {
  const item = project.media.find((m) => m.url === project.cover);
  return item?.alt ?? imageAlt(project, undefined, 0, 1);
}

/** Descripción para Google de un proyecto: su texto más el tipo de trabajo y el autor. */
export function projectDescription(project: Project): string {
  const extra = ` ${project.category} por ${author.name}.`;
  const text = project.description.trim();
  if (text.length + extra.length <= 160) return text + extra;
  return text.length <= 160 ? text : `${text.slice(0, 157).replace(/\s+\S*$/, '')}…`;
}

/** Servicio al que pertenece un proyecto (el primero que lo enseña como ejemplo). */
export function serviceForProject(project: Project): Service | undefined {
  return services.find((s) => s.projectSlugs.includes(project.slug));
}

function videoObject(project: Project, video: MediaItem, index: number, total: number, site: URL): Json {
  const youtubeId = getYouTubeId(video.url);
  const name = video.title ? `${project.title}: ${video.title}` : total > 1 ? `${project.title} (${index + 1})` : project.title;
  const thumbnail = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : getProjectImage(project);
  return {
    '@type': 'VideoObject',
    name,
    description: project.description,
    ...(thumbnail && { thumbnailUrl: thumbnail }),
    ...(project.year && { uploadDate: String(project.year) }),
    ...(youtubeId
      ? { embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}`, url: `https://youtu.be/${youtubeId}` }
      : { contentUrl: video.url.split('#')[0] }),
    inLanguage: 'es',
    creator: { '@id': ids(site).person },
  };
}

/** Datos de una página de proyecto: obra, fotos y vídeos, y migas de pan. */
export function projectGraph(project: Project, site: URL): Json[] {
  const url = abs(`/trabajos/${project.slug}/`, site);
  const images = project.media.filter((m) => m.type === 'image');
  const videos = project.media.filter((m) => m.type === 'video' && (getYouTubeId(m.url) || isVideoFile(m.url)));
  const video = isVideoProject(project);

  const work: Json = {
    '@type': video ? 'CreativeWork' : 'ImageGallery',
    '@id': `${url}#work`,
    url,
    name: project.title,
    headline: project.title,
    description: project.description,
    genre: project.category,
    about: disciplineLabels[project.discipline],
    inLanguage: 'es',
    ...(project.year && { dateCreated: String(project.year) }),
    creator: { '@id': ids(site).person },
    author: { '@id': ids(site).person },
    ...(project.client !== 'Cliente privado' && { sourceOrganization: { '@type': 'Organization', name: project.client } }),
    ...(images.length > 0 && {
      image: images.map((m, i) => ({
        '@type': 'ImageObject',
        contentUrl: m.url,
        caption: imageAlt(project, m, i, images.length),
        creator: { '@id': ids(site).person },
        creditText: author.name,
        copyrightNotice: `© ${author.name}`,
      })),
    }),
    ...(videos.length > 0 && { video: videos.map((m, i) => videoObject(project, m, i, videos.length, site)) }),
  };

  return [
    work,
    breadcrumbs(site, [
      { name: 'Trabajos', path: '/trabajos/' },
      { name: project.title, path: `/trabajos/${project.slug}/` },
    ]),
  ];
}

/** Datos de una página de servicio. */
export function serviceGraph(service: Service, site: URL): Json[] {
  const url = abs(`/servicios/${service.slug}/`, site);
  const examples = service.projectSlugs.flatMap((slug) => projects.filter((p) => p.slug === slug));
  return [
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      url,
      name: service.title,
      serviceType: service.title,
      description: service.seoDescription,
      provider: { '@id': ids(site).business },
      areaServed: areaServed.map((name) => ({ '@type': 'Country', name })),
      audience: service.idealFor.map((name) => ({ '@type': 'Audience', audienceType: name })),
      ...(examples.length > 0 && {
        subjectOf: examples.map((p) => ({ '@type': 'CreativeWork', name: p.title, url: abs(`/trabajos/${p.slug}/`, site) })),
      }),
    },
    breadcrumbs(site, [
      { name: 'Servicios', path: '/servicios/' },
      { name: service.title, path: `/servicios/${service.slug}/` },
    ]),
  ];
}

/** Lista de trabajos (para /trabajos). */
export function projectListGraph(site: URL): Json[] {
  return [
    {
      '@type': 'CollectionPage',
      url: abs('/trabajos/', site),
      name: 'Trabajos de fotografía y vídeo',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: projects.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: abs(`/trabajos/${p.slug}/`, site),
          name: p.title,
        })),
      },
    },
    breadcrumbs(site, [{ name: 'Trabajos', path: '/trabajos/' }]),
  ];
}

/** Convierte los datos en el contenido de un <script type="application/ld+json"> sin riesgo de cerrar la etiqueta. */
export function toJsonLd(graph: Json[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}
