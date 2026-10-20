import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import ProjectCard from '@/components/project-card';
import ProjectGallery from '@/components/project-gallery';
import ProjectMedia from '@/components/project-media';
import { projects } from '@/lib/data';
import { disciplineLabels, getProject, getProjectImage, getRelatedProjects, isVideoProject } from '@/lib/projects';
import { cn, getStartTime, getYouTubeId } from '@/lib/utils';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const image = getProjectImage(project);
  return {
    title: project.title,
    description: project.description,
    openGraph: { title: project.title, description: project.description, images: image ? [image] : undefined },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const videos = project.media.filter((m) => m.type === 'video');
  const images = project.media.filter((m) => m.type === 'image').map((m) => m.url);
  const portrait = project.orientation === 'portrait';
  const related = getRelatedProjects(project);

  const credits = [
    ['Cliente', project.client],
    ['Año', project.year?.toString()],
    ['Categoría', project.category],
    ['Disciplina', disciplineLabels[project.discipline]],
    ['Formato', isVideoProject(project) ? 'Vídeo' : 'Fotografía'],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  return (
    <article>
      {/* Portada a pantalla completa */}
      <header className="relative h-[100svh] w-full overflow-hidden bg-canopy">
        <ProjectMedia project={project} sizes="100vw" priority playing />
        <div className="absolute inset-0 bg-gradient-to-b from-canopy/50 via-transparent to-canopy" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 sm:px-10 sm:pb-14">
          <p className="text-sm font-medium text-gold">{project.category}</p>
          <h1 className="mt-2 max-w-5xl font-headline text-5xl uppercase leading-[0.9] text-linen sm:text-7xl lg:text-8xl">
            {project.title}
          </h1>
        </div>
      </header>

      {/* Descripción y créditos */}
      <section className="grid gap-12 px-5 py-20 sm:px-10 sm:py-28 lg:grid-cols-[3fr_2fr] lg:gap-24">
        <div>
          <h2 className="font-headline text-2xl uppercase tracking-wide text-gold">Descripción</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-linen/80">{project.description}</p>
        </div>
        <div>
          <h2 className="font-headline text-2xl uppercase tracking-wide text-gold">Créditos</h2>
          <dl className="mt-5 divide-y divide-linen/10 border-y border-linen/10">
            {credits.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[8rem_1fr] gap-4 py-3 text-sm">
                <dt className="text-linen/50">{label}</dt>
                <dd className="text-linen">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Vídeos completos */}
      {videos.length > 0 && (
        <section id="video" className="px-2.5 pb-20 sm:px-10 sm:pb-28">
          <div
            className={cn(
              'mx-auto grid gap-6',
              portrait ? 'max-w-4xl sm:grid-cols-2' : 'max-w-6xl grid-cols-1',
            )}
          >
            {videos.map((video, index) => {
              const youtubeId = getYouTubeId(video.url);
              const label = video.title ?? `${project.title}${videos.length > 1 ? ` (${index + 1})` : ''}`;
              return (
                <figure key={video.url}>
                  <div className={cn('relative overflow-hidden bg-black', portrait ? 'aspect-[9/16]' : 'aspect-video')}>
                    {youtubeId ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                        title={label}
                        className="absolute inset-0 h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                      />
                    ) : (
                      <video
                        src={getStartTime(video.url) ? video.url : `${video.url}#t=0.1`}
                        className="absolute inset-0 h-full w-full object-contain"
                        controls
                        playsInline
                        preload="metadata"
                      />
                    )}
                  </div>
                  {video.title && (
                    <figcaption className="mt-3 font-headline text-xl uppercase tracking-wide text-linen">
                      {video.title}
                    </figcaption>
                  )}
                </figure>
              );
            })}
          </div>
        </section>
      )}

      {/* Galería */}
      {images.length > 0 && (
        <section className="px-2.5 pb-20 sm:px-10 sm:pb-28" aria-label="Galería">
          <ProjectGallery title={project.title} images={images} />
        </section>
      )}

      {/* Más proyectos */}
      <section className="border-t border-linen/10 px-2.5 py-20 sm:px-10 sm:py-28">
        <div className="mb-8 flex items-end justify-between gap-4 px-2.5 sm:px-0">
          <h2 className="font-headline text-4xl uppercase leading-none text-linen sm:text-5xl">Más proyectos</h2>
          <Link
            href="/trabajos"
            className="inline-flex shrink-0 items-center gap-2 font-headline text-lg uppercase tracking-wide text-linen/70 hover:text-gold"
          >
            Todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {related.map((p) => (
            <ProjectCard key={p.slug} project={p} className="aspect-[4/5]" />
          ))}
        </div>
      </section>
    </article>
  );
}
