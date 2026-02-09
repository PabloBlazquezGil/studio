'use client';

import { useState } from 'react';
import type { Project } from '@/lib/types';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { User, Calendar, ArrowLeft, ArrowRight, X, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface ProjectNavigationLinkProps {
  project: Project;
  type: 'prev' | 'next';
  onClick: () => void;
}

function ProjectNavigationLink({ project, type, onClick }: ProjectNavigationLinkProps) {
  const isPrev = type === 'prev';
  const imageSrc = project.imageUrl;

  return (
    <button
        onClick={onClick}
        className={`relative h-56 sm:h-64 group cursor-pointer text-left w-full ${isPrev ? 'sm:border-r' : ''} border-border/20`}
    >
      <Image
          src={imageSrc}
          alt={project.title}
          fill
          className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
          sizes="50vw"
      />
      <div className="absolute inset-0 bg-background/70 group-hover:bg-background/60 transition-all duration-300" />
      <div className={`relative z-10 h-full flex flex-col justify-center p-8 text-foreground ${isPrev ? 'items-start' : 'items-end'}`}>
          <div className={`flex items-center gap-4 ${isPrev ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className="flex-shrink-0">
                  {isPrev 
                    ? <ArrowLeft className="w-8 h-8 text-primary transition-transform group-hover:-translate-x-2" /> 
                    : <ArrowRight className="w-8 h-8 text-primary transition-transform group-hover:translate-x-2" />}
              </div>
              <div className={isPrev ? 'text-left' : 'text-right'}>
                  <p className="text-sm uppercase tracking-wider text-muted-foreground">{isPrev ? 'Anterior' : 'Siguiente'}</p>
                  <h3 className="font-headline text-2xl mt-1">{project.title}</h3>
              </div>
          </div>
      </div>
    </button>
  );
}

interface ProjectDetailOverlayProps {
  project: Project | null;
  onClose: () => void;
  allProjects: Project[];
  onProjectChange: (project: Project) => void;
}

export default function ProjectDetailOverlay({ project, onClose, allProjects, onProjectChange }: ProjectDetailOverlayProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  if (!project) return null;

  const mainMedia = project.media[0];
  
  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  
  const imageMedia = project.media.filter((item) => item.type === 'image');
  const showGallery = imageMedia.length > 0;

  return (
    <>
      <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
        <DialogContent showCloseButton={false} className="max-w-none w-full h-full p-0 bg-background border-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0">
          
          <div className="h-full w-full overflow-y-auto scroll-smooth">
            <Button 
              variant="ghost"
              onClick={onClose} 
              className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20 text-white hover:text-primary hover:bg-white/10"
              aria-label="Volver al portfolio"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Volver al portfolio</span>
            </Button>
            {/* Hero Section */}
            <header className="relative h-[70vh] w-full">
              <div className="absolute inset-0">
                {mainMedia.type === 'image' ? (
                  <Image
                    src={mainMedia.url}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                  />
                ) : (
                  <video
                    src={mainMedia.url}
                    className="w-full h-full object-cover bg-black"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={project.imageUrl}
                  />
                )}
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />

              <div className="relative z-10 flex flex-col justify-end h-full text-white p-8 md:p-12">
                <Badge variant="secondary" className="mb-4 w-fit">{project.category}</Badge>
                <DialogTitle className="font-headline text-4xl sm:text-5xl lg:text-7xl text-white">
                   {project.title}
                </DialogTitle>
                <DialogDescription className="sr-only">{project.description}</DialogDescription>
              </div>
            </header>
            
            {/* Content Section */}
            <main className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-b border-border pb-8">
                  <div className="flex items-center gap-3 text-muted-foreground">
                      <User className="w-5 h-5 text-primary" />
                      <div>
                          <p className="font-bold text-foreground">Cliente</p>
                          <p>{project.client}</p>
                      </div>
                  </div>
                  {project.year && (
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                            <p className="font-bold text-foreground">Año</p>
                            <p>{project.year}</p>
                        </div>
                    </div>
                  )}
              </div>

              <div className="text-lg leading-relaxed text-muted-foreground max-w-3xl">
                <p>{project.description}</p>
              </div>
              
              {mainMedia.type === 'video' && (
                <div className="mt-16">
                    <h2 className="font-headline text-3xl sm:text-4xl text-foreground mb-8">Vídeo Completo</h2>
                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg bg-muted">
                        <video
                            src={mainMedia.url.split('#')[0]}
                            className="w-full h-full object-cover"
                            controls
                            poster={project.imageUrl}
                        />
                    </div>
                </div>
              )}
              
              {showGallery && (
                  <div className="mt-16">
                      <h2 className="font-headline text-3xl sm:text-4xl text-foreground mb-8">Galería del Proyecto</h2>
                      <div className="columns-1 sm:columns-2 gap-4 md:gap-6 space-y-4 md:space-y-6">
                          {imageMedia.map((mediaItem, index) => (
                              <div key={index} className="break-inside-avoid">
                                <button
                                    onClick={() => setPreviewImage(mediaItem.url)}
                                    className="block w-full relative group rounded-lg overflow-hidden shadow-lg bg-muted cursor-pointer"
                                >
                                    <Image
                                        src={mediaItem.url}
                                        alt={`${project.title} media ${index + 1}`}
                                        width={0}
                                        height={0}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="h-auto w-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                      <div className="p-3 bg-primary/90 rounded-full">
                                          <ZoomIn className="w-6 h-6 text-primary-foreground" />
                                      </div>
                                    </div>
                                </button>
                              </div>
                          ))}
                      </div>
                  </div>
              )}
            </main>

            {/* Navigation Section */}
            <footer className="w-full border-t border-border/20 mt-16 sm:mt-24">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <ProjectNavigationLink project={prevProject} type="prev" onClick={() => onProjectChange(prevProject)} />
                <ProjectNavigationLink project={nextProject} type="next" onClick={() => onProjectChange(nextProject)} />
              </div>
            </footer>
          </div>
        </DialogContent>
      </Dialog>

      {/* Lightbox Dialog */}
      <Dialog open={!!previewImage} onOpenChange={(open) => !open && setPreviewImage(null)}>
        <DialogContent showCloseButton={false} className="max-w-none w-screen h-screen p-4 sm:p-8 bg-black/90 backdrop-blur-sm border-0 flex items-center justify-center">
            <DialogTitle className="sr-only">Vista previa de la imagen</DialogTitle>
            <DialogDescription className="sr-only">Imagen ampliada del proyecto: {project.title}</DialogDescription>
            {previewImage && <Image
                src={previewImage}
                alt="Vista previa de la imagen"
                fill
                className="object-contain"
                sizes="100vw"
            />}
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 z-50 text-white hover:text-primary bg-black/20 hover:bg-black/40 h-12 w-12 rounded-full"
                aria-label="Cerrar vista previa"
              >
                <X className="w-6 h-6" />
              </Button>
            </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
