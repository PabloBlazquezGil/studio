/**
 * Datos estructurados (schema.org en JSON-LD) y textos para buscadores, en el idioma de cada página.
 * Google los usa para entender quién eres, qué ofreces y qué hay en cada página.
 * Se pueden comprobar con https://validator.schema.org o la Prueba de resultados enriquecidos de Google.
 */
import { path, projectPath, servicePath, type Lang } from '@/i18n/routes';
import { useTranslations } from '@/i18n/ui';
import { getAuthor, getProjects, getServices } from './content';
import { contactEmail, socialLinks } from './data';
import { getDisciplineLabels, getProjectImage, isVideoProject } from './projects';
import { areaServed, jobTitle, location, siteName } from './site';
import type { MediaItem, Project, Service } from './types';
import { getYouTubeId, isVideoFile } from './utils';

type Json = Record<string, unknown>;

const inLanguage: Record<Lang, string> = { es: 'es-ES', en: 'en-GB' };

/** URL absoluta con barra final, igual que las del sitemap y el canonical. */
const abs = (p: string, site: URL) => new URL(p === '/' || p.endsWith('/') ? p : `${p}/`, site).href;

// La persona, el negocio y la web son los mismos en los dos idiomas: un único @id.
const ids = (site: URL) => ({
  website: new URL('/#website', site).href,
  person: new URL('/#person', site).href,
  business: new URL('/#business', site).href,
});

const sameAs = socialLinks.filter((l) => l.href.startsWith('http')).map((l) => l.href);
const area = () => areaServed.map((name) => ({ '@type': 'AdministrativeArea', name }));

/** Persona, negocio y web: van en todas las páginas y el resto de datos los referencian por su @id. */
export function siteGraph(site: URL, lang: Lang): Json[] {
  const t = useTranslations(lang).seo;
  const id = ids(site);
  const author = getAuthor(lang);
  const services = getServices(lang);
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
      url: abs(path('home', lang), site),
      name: siteName,
      inLanguage: Object.values(inLanguage),
      publisher: { '@id': id.person },
    },
    {
      '@type': 'Person',
      '@id': id.person,
      name: author.name,
      jobTitle: jobTitle[lang],
      url: abs(path('about', lang), site),
      image: author.imageUrl,
      email: `mailto:${contactEmail}`,
      sameAs,
      homeLocation: { '@type': 'AdministrativeArea', name: location.region || areaServed[0] },
      knowsAbout: [...t.knowsAbout, ...services.map((s) => s.title)],
      worksFor: { '@id': id.business },
    },
    {
      '@type': 'ProfessionalService',
      '@id': id.business,
      name: `${author.name} · ${t.business}`,
      description: t.businessDescription,
      url: abs(path('home', lang), site),
      image: new URL('/og-portfolio.jpg', site).href,
      logo: new URL('/apple-icon.png', site).href,
      email: contactEmail,
      founder: { '@id': id.person },
      sameAs,
      areaServed: area(),
      ...(address && { address }),
      knowsLanguage: ['es', 'en'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: t.catalog,
        itemListElement: services.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.title, url: abs(servicePath(s.slug, lang), site) },
        })),
      },
    },
  ];
}

export function breadcrumbs(site: URL, lang: Lang, items: { name: string; path: string }[]): Json {
  const home = { name: useTranslations(lang).nav.home, path: path('home', lang) };
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [home, ...items].map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: abs(item.path, site),
    })),
  };
}

const isPrivate = (client: string) => /^(cliente privado|private client)$/i.test(client.trim());

/** Texto alternativo de una foto de un proyecto. */
export function imageAlt(project: Project, item: MediaItem | undefined, index: number, total: number, lang: Lang): string {
  if (item?.alt) return item.alt;
  const client = isPrivate(project.client) ? undefined : project.client;
  return useTranslations(lang).seo.photoAlt(project.title, project.category, client, index + 1, total);
}

/** Texto alternativo de la portada de un proyecto. */
export function coverAlt(project: Project, lang: Lang): string {
  const item = project.media.find((m) => m.url === project.cover);
  return item?.alt ?? imageAlt(project, undefined, 0, 1, lang);
}

/** Descripción para Google de un proyecto: su texto más el tipo de trabajo y el autor (si cabe en 160 caracteres). */
export function projectDescription(project: Project, lang: Lang): string {
  const extra = ` ${useTranslations(lang).seo.by(project.category, getAuthor(lang).name)}`;
  const text = project.description.trim();
  if (text.length + extra.length <= 160) return text + extra;
  return text.length <= 160 ? text : `${text.slice(0, 157).replace(/\s+\S*$/, '')}…`;
}

/** Servicio al que pertenece un proyecto (el primero que lo enseña como ejemplo). */
export function serviceForProject(project: Project, lang: Lang): Service | undefined {
  return getServices(lang).find((s) => s.projectSlugs.includes(project.slug));
}

function videoObject(project: Project, video: MediaItem, index: number, total: number, site: URL, lang: Lang): Json {
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
    inLanguage: inLanguage[lang],
    creator: { '@id': ids(site).person },
  };
}

/** Datos de una página de proyecto: obra, fotos y vídeos, y migas de pan. */
export function projectGraph(project: Project, site: URL, lang: Lang): Json[] {
  const t = useTranslations(lang);
  const author = getAuthor(lang);
  const url = abs(projectPath(project.slug, lang), site);
  const images = project.media.filter((m) => m.type === 'image');
  const videos = project.media.filter((m) => m.type === 'video' && (getYouTubeId(m.url) || isVideoFile(m.url)));

  const work: Json = {
    '@type': isVideoProject(project) ? 'CreativeWork' : 'ImageGallery',
    '@id': `${url}#work`,
    url,
    name: project.title,
    headline: project.title,
    description: project.description,
    genre: project.category,
    about: getDisciplineLabels(lang)[project.discipline],
    inLanguage: inLanguage[lang],
    ...(project.year && { dateCreated: String(project.year) }),
    creator: { '@id': ids(site).person },
    author: { '@id': ids(site).person },
    ...(!isPrivate(project.client) && { sourceOrganization: { '@type': 'Organization', name: project.client } }),
    ...(images.length > 0 && {
      image: images.map((m, i) => ({
        '@type': 'ImageObject',
        contentUrl: m.url,
        caption: imageAlt(project, m, i, images.length, lang),
        creator: { '@id': ids(site).person },
        creditText: author.name,
        copyrightNotice: `© ${author.name}`,
      })),
    }),
    ...(videos.length > 0 && { video: videos.map((m, i) => videoObject(project, m, i, videos.length, site, lang)) }),
  };

  return [
    work,
    breadcrumbs(site, lang, [
      { name: t.nav.work, path: path('work', lang) },
      { name: project.title, path: projectPath(project.slug, lang) },
    ]),
  ];
}

/** Datos de una página de servicio. */
export function serviceGraph(service: Service, site: URL, lang: Lang): Json[] {
  const t = useTranslations(lang);
  const url = abs(servicePath(service.slug, lang), site);
  const projects = getProjects(lang);
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
      areaServed: area(),
      audience: service.idealFor.map((name) => ({ '@type': 'Audience', audienceType: name })),
      ...(examples.length > 0 && {
        subjectOf: examples.map((p) => ({
          '@type': 'CreativeWork',
          name: p.title,
          url: abs(projectPath(p.slug, lang), site),
        })),
      }),
    },
    breadcrumbs(site, lang, [
      { name: t.nav.services, path: path('services', lang) },
      { name: service.title, path: servicePath(service.slug, lang) },
    ]),
  ];
}

/** Lista de servicios (para /servicios). */
export function serviceListGraph(site: URL, lang: Lang, faq: string[][] = []): Json[] {
  const t = useTranslations(lang);
  return [
    {
      '@type': 'CollectionPage',
      url: abs(path('services', lang), site),
      name: t.services.metaTitle,
      inLanguage: inLanguage[lang],
      about: { '@id': ids(site).business },
    },
    ...(faq.length > 0
      ? [
          {
            '@type': 'FAQPage',
            inLanguage: inLanguage[lang],
            mainEntity: faq.map(([name, text]) => ({
              '@type': 'Question',
              name,
              acceptedAnswer: { '@type': 'Answer', text },
            })),
          },
        ]
      : []),
    breadcrumbs(site, lang, [{ name: t.nav.services, path: path('services', lang) }]),
  ];
}

/** Lista de trabajos (para /trabajos). */
export function projectListGraph(site: URL, lang: Lang): Json[] {
  const t = useTranslations(lang);
  return [
    {
      '@type': 'CollectionPage',
      url: abs(path('work', lang), site),
      name: t.seo.workList,
      inLanguage: inLanguage[lang],
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: getProjects(lang).map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: abs(projectPath(p.slug, lang), site),
          name: p.title,
        })),
      },
    },
    breadcrumbs(site, lang, [{ name: t.nav.work, path: path('work', lang) }]),
  ];
}

/** Sobre mí y contacto. */
export function pageGraph(type: 'ProfilePage' | 'ContactPage', key: 'about' | 'contact', site: URL, lang: Lang): Json[] {
  const t = useTranslations(lang);
  const target = type === 'ProfilePage' ? { mainEntity: { '@id': ids(site).person } } : { about: { '@id': ids(site).business } };
  return [
    { '@type': type, url: abs(path(key, lang), site), inLanguage: inLanguage[lang], ...target },
    breadcrumbs(site, lang, [{ name: t.nav[key], path: path(key, lang) }]),
  ];
}

/** Convierte los datos en el contenido de un <script type="application/ld+json"> sin riesgo de cerrar la etiqueta. */
export function toJsonLd(graph: Json[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}
