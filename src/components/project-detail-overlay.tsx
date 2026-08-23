'use client';

import { useState, useRef, useEffect } from 'react';
import type { Project } from '@/lib/types';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { User, Calendar, ArrowLeft, ArrowRight, X, ZoomIn, Play } from 'lucide-react';
import Image from 'next/image';
import { getYouTubeId } from '@/lib/utils';

const isImage = (url: string) => !/\.(mp4|webm|ogg)/i.test(url.split('#')[0].split('?')[0]);

/* ─────────────────────────────────────────────────────────────────
   Navigation thumbnail
───────────────────────────────────────────────────────────────── */
interface ProjectNavigationLinkProps {
  project: Project;
  type: 'prev' | 'next';
  onClick: () => void;
}

function ProjectNavigationLink({ project, type, onClick }: ProjectNavigationLinkProps) {
  const isPrev = type === 'prev';

  return (
    <button
      onClick={onClick}
      className={`relative h-48 sm:h-56 group cursor-pointer text-left w-full overflow-hidden ${
        isPrev ? 'border-r border-gold/10' : ''
      }`}
      style={{ transition: 'background-color 0.4s ease' }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.04)')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
      {isImage(project.imageUrl) ? (
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover opacity-15 group-hover:opacity-25 transition-opacity duration-500"
          sizes="50vw"
        />
      ) : (
        <video
          src={project.imageUrl}
          className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:opacity-25 transition-opacity duration-500"
          muted
          playsInline
          preload="metadata"
        />
      )}
      <div className="absolute inset-0 bg-canopy/80 group-hover:bg-canopy/70 transition-all duration-500" />
      {/* Gold accent line */}
      <div
        className={`absolute top-0 ${isPrev ? 'left-0' : 'right-0'} h-full w-[1px] bg-gold/0 group-hover:bg-gold/30 transition-all duration-500`}
      />
      <div className={`relative z-10 h-full flex flex-col justify-center p-8 sm:p-10 ${isPrev ? 'items-start' : 'items-end'}`}>
        <div className={`flex items-center gap-4 ${isPrev ? 'flex-row' : 'flex-row-reverse'}`}>
          <div
            className="w-10 h-10 flex items-center justify-center border border-gold/30 group-hover:border-gold/70 transition-all duration-400"
            style={{ backgroundColor: 'rgba(212,175,55,0.05)' }}
          >
            {isPrev
              ? <ArrowLeft className="w-4 h-4 text-gold transition-transform group-hover:-translate-x-1 duration-400" />
              : <ArrowRight className="w-4 h-4 text-gold transition-transform group-hover:translate-x-1 duration-400" />}
          </div>
          <div className={isPrev ? 'text-left' : 'text-right'}>
            <p
              className="font-body text-[9px] uppercase tracking-[0.3em] mb-1"
              style={{ color: 'rgba(249,248,246,0.35)' }}
            >
              {isPrev ? 'Anterior' : 'Siguiente'}
            </p>
            <h3
              className="font-headline text-base sm:text-lg font-light"
              style={{ color: '#F9F8F6', letterSpacing: '0.1em' }}
            >
              {project.title}
            </h3>
          </div>
        </div>
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Main overlay
───────────────────────────────────────────────────────────────── */
interface ProjectDetailOverlayProps {
  project: Project | null;
  onClose: () => void;
  allProjects: Project[];
  onProjectChange: (project: Project) => void;
}

export default function ProjectDetailOverlay({ project, onClose, allProjects, onProjectChange }: ProjectDetailOverlayProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const fullVideoRef = useRef<HTMLVideoElement>(null);

  if (!project) return null;

  const mainMedia = project.media[0];
  const youtubeId = mainMedia && mainMedia.type === 'video' ? getYouTubeId(mainMedia.url) : null;
  const isPortraitProject = project.layoutType === 'portrait';
  const heroVideoUrl = isPortraitProject && !isImage(project.imageUrl) ? project.imageUrl : (mainMedia && mainMedia.type === 'video' ? mainMedia.url : '');
  const heroStartTime = (() => {
    const match = heroVideoUrl.match(/#t=([0-9]+(?:\.[0-9]+)?)/);
    return match ? parseFloat(match[1]) : 0;
  })();

  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const prevProject  = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject  = allProjects[(currentIndex + 1) % allProjects.length];

  const imageMedia = project.media.filter(item => item.type === 'image');
  const showGallery = imageMedia.length > 0;

  const videoMedia = project.media.filter(item => item.type === 'video');

  return (
    <>
      <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
        <DialogContent
          showCloseButton={false}
          className="max-w-none w-full h-full p-0 border-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
          style={{ backgroundColor: '#1C2826' }}
        >
          <div className="h-full w-full overflow-y-auto scroll-smooth">

            {/* ── Back / Close button ─────────────────────────────── */}
            <button
              onClick={onClose}
              aria-label="Volver al portfolio"
              className="absolute top-6 left-6 sm:top-8 sm:left-8 z-30 flex items-center gap-2 group"
              style={{
                fontFamily: 'var(--font-body, Montserrat), sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(249,248,246,0.55)',
                transition: 'color 0.4s ease',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#D4AF37')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(249,248,246,0.55)')}
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-400" />
              <span>Volver al portfolio</span>
            </button>

            {/* ── Hero ───────────────────────────────────────────── */}
            <header className="relative h-[70vh] w-full">
              <div className="absolute inset-0">
                {mainMedia.type === 'image' || youtubeId || (isPortraitProject && isImage(project.imageUrl)) ? (
                  <Image
                    src={isPortraitProject
                      ? project.imageUrl
                      : (youtubeId
                        ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
                        : mainMedia.url)}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                  />
                ) : (
                  <video
                    ref={heroVideoRef}
                    key={`hero-${project.id}-${heroVideoUrl}`}
                    src={heroVideoUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={isImage(project.imageUrl) ? project.imageUrl : undefined}
                    onLoadedMetadata={() => {
                      if (heroVideoRef.current && heroStartTime > 0) {
                        heroVideoRef.current.currentTime = heroStartTime;
                      }
                    }}
                    onTimeUpdate={() => {
                      if (heroVideoRef.current && heroStartTime > 0 && heroVideoRef.current.currentTime < heroStartTime) {
                        heroVideoRef.current.currentTime = heroStartTime;
                      }
                    }}
                  />
                )}
              </div>

              {/* Cinematic gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C2826] via-[#1C2826]/60 to-transparent" />

              {/* Top gold line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent z-10" />

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-14">
                {/* Category badge */}
                <span
                  className="inline-block mb-5 w-fit font-body text-[8px] uppercase tracking-[0.35em] px-3 py-1.5"
                  style={{
                    backgroundColor: 'rgba(212,175,55,0.1)',
                    border: '1px solid rgba(212,175,55,0.4)',
                    color: '#D4AF37',
                  }}
                >
                  {project.category}
                </span>
                <DialogTitle
                  className="font-headline text-4xl sm:text-5xl lg:text-7xl font-light"
                  style={{ color: '#F9F8F6', letterSpacing: '0.12em' }}
                >
                  {project.title}
                </DialogTitle>
                <DialogDescription className="sr-only">{project.description}</DialogDescription>
              </div>
            </header>

            {/* ── Meta & Description ─────────────────────────────── */}
            <main className="container mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 py-14 md:py-20">

              {/* Meta row */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 pb-10"
                style={{ borderBottom: '1px solid rgba(212,175,55,0.15)' }}
              >
                {project.client && (
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                    <div>
                      <p
                        className="font-body text-[9px] uppercase tracking-[0.25em] mb-1"
                        style={{ color: '#D4AF37' }}
                      >
                        Cliente
                      </p>
                      <p className="font-body text-sm" style={{ color: 'rgba(249,248,246,0.75)' }}>
                        {project.client}
                      </p>
                    </div>
                  </div>
                )}
                {project.year && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                    <div>
                      <p
                        className="font-body text-[9px] uppercase tracking-[0.25em] mb-1"
                        style={{ color: '#D4AF37' }}
                      >
                        Año
                      </p>
                      <p className="font-body text-sm" style={{ color: 'rgba(249,248,246,0.75)' }}>
                        {project.year}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="max-w-3xl mb-16">
                <p
                  className="font-body text-base leading-[1.9]"
                  style={{ color: 'rgba(249,248,246,0.6)' }}
                >
                  {project.description}
                </p>
              </div>

              {/* ── Full video / Videos section ─────────────────────── */}
              {videoMedia.length > 0 && (
                <div className="mb-16">
                  <div className="mb-8">
                    <p className="label-eyebrow mb-3">Producción</p>
                    <div className="divider-gold mb-6" />
                    <h2
                      className="font-headline text-3xl sm:text-4xl font-light"
                      style={{ color: '#F9F8F6', letterSpacing: '0.15em' }}
                    >
                      {videoMedia.length > 1 ? 'Vídeos del Proyecto' : 'Vídeo Completo'}
                    </h2>
                  </div>
                  
                  <div className={`grid gap-8 ${
                    videoMedia.length === 1
                      ? isPortraitProject
                        ? 'max-w-[450px] mx-auto grid-cols-1'
                        : 'grid-cols-1'
                      : isPortraitProject
                        ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
                        : 'grid-cols-1'
                  }`}>
                    {videoMedia.map((mediaItem, index) => {
                      const ytId = getYouTubeId(mediaItem.url);
                      const mediaStartTime = (() => {
                        const match = mediaItem.url.match(/#t=([0-9]+(?:\.[0-9]+)?)/);
                        return match ? parseFloat(match[1]) : 0;
                      })();

                      return (
                        <div key={index} className="flex flex-col gap-4">
                          {mediaItem.title && (
                            <h3 
                              className="font-headline text-lg sm:text-xl font-light tracking-[0.1em]"
                              style={{ color: '#F9F8F6' }}
                            >
                              {mediaItem.title}
                            </h3>
                          )}
                          <div 
                            className={`relative overflow-hidden shadow-2xl ${
                              isPortraitProject ? 'aspect-[9/16]' : 'aspect-video'
                            }`} 
                            style={{ border: '1px solid rgba(212,175,55,0.15)' }}
                          >
                            {ytId ? (
                              <iframe
                                src={`https://www.youtube.com/embed/${ytId}?autoplay=0&rel=0&modestbranding=1`}
                                className="absolute inset-0 w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                title={mediaItem.title || `${project.title} — vídeo ${index + 1}`}
                              />
                            ) : (
                              <video
                                key={`video-${project.id}-${index}-${mediaItem.url}`}
                                src={mediaItem.url}
                                className="w-full h-full object-cover"
                                controls
                                poster={isImage(project.imageUrl) ? project.imageUrl : undefined}
                                onLoadedMetadata={(e) => {
                                  if (mediaStartTime > 0) {
                                    e.currentTarget.currentTime = mediaStartTime;
                                  }
                                }}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── Photo gallery ──────────────────────────────────── */}
              {showGallery && (
                <div>
                  <div className="mb-10">
                    <p className="label-eyebrow mb-3">Galería</p>
                    <div className="divider-gold mb-6" />
                    <h2
                      className="font-headline text-3xl sm:text-4xl font-light"
                      style={{ color: '#F9F8F6', letterSpacing: '0.15em' }}
                    >
                      Galería del Proyecto
                    </h2>
                  </div>
                  <div className="columns-1 sm:columns-2 gap-3 md:gap-4 space-y-3 md:space-y-4">
                    {imageMedia.map((mediaItem, index) => (
                      <div key={index} className="break-inside-avoid">
                        <button
                          onClick={() => setPreviewImage(mediaItem.url)}
                          className="block w-full relative group overflow-hidden cursor-pointer"
                          style={{ border: '1px solid rgba(212,175,55,0.08)' }}
                        >
                          <Image
                            src={mediaItem.url}
                            alt={`${project.title} — imagen ${index + 1}`}
                            width={0}
                            height={0}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="h-auto w-full transition-transform duration-700 ease-in-out group-hover:scale-105"
                          />
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-canopy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                            <div
                              className="w-12 h-12 flex items-center justify-center"
                              style={{
                                border: '1px solid rgba(212,175,55,0.6)',
                                backgroundColor: 'rgba(212,175,55,0.1)',
                              }}
                            >
                              <ZoomIn className="w-5 h-5" style={{ color: '#D4AF37' }} />
                            </div>
                          </div>
                          {/* Gold bottom edge on hover */}
                          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold/0 group-hover:bg-gold/50 transition-all duration-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </main>

            {/* ── Navigation ─────────────────────────────────────── */}
            <footer className="w-full mt-16 sm:mt-24" style={{ borderTop: '1px solid rgba(212,175,55,0.12)' }}>
              {/* Gold top accent */}
              <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <ProjectNavigationLink project={prevProject} type="prev" onClick={() => onProjectChange(prevProject)} />
                <ProjectNavigationLink project={nextProject} type="next" onClick={() => onProjectChange(nextProject)} />
              </div>
            </footer>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Lightbox ─────────────────────────────────────────────── */}
      <Dialog open={!!previewImage} onOpenChange={(open) => !open && setPreviewImage(null)}>
        <DialogContent
          showCloseButton={false}
          className="max-w-none w-screen h-screen p-4 sm:p-8 border-0 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(10,15,14,0.96)', backdropFilter: 'blur(8px)' }}
        >
          <DialogTitle className="sr-only">Vista previa de la imagen</DialogTitle>
          <DialogDescription className="sr-only">Imagen ampliada del proyecto: {project.title}</DialogDescription>
          {previewImage && (
            <Image
              src={previewImage}
              alt="Vista previa de la imagen"
              fill
              className="object-contain"
              sizes="100vw"
            />
          )}
          <button
            onClick={() => setPreviewImage(null)}
            aria-label="Cerrar vista previa"
            className="absolute top-5 right-5 z-50 w-10 h-10 flex items-center justify-center"
            style={{
              border: '1px solid rgba(212,175,55,0.4)',
              backgroundColor: 'rgba(28,40,38,0.8)',
              color: '#D4AF37',
              transition: 'all 0.4s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(212,175,55,0.15)';
              (e.currentTarget as HTMLElement).style.borderColor = '#D4AF37';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(28,40,38,0.8)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.4)';
            }}
          >
            <X className="w-4 h-4" />
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
