import type { Project } from '@/lib/types';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { X, User, Calendar } from 'lucide-react';
import Image from 'next/image';
import { Badge } from './ui/badge';

interface ProjectDetailOverlayProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailOverlay({ project, onClose }: ProjectDetailOverlayProps) {
  if (!project) return null;

  const mainMedia = project.media[0];

  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-none w-full h-full p-0 bg-background border-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0">
        
        <button 
          onClick={onClose} 
          className="fixed top-4 right-4 z-[60] text-white bg-black/50 rounded-full p-2 hover:bg-primary transition-colors" 
          aria-label="Cerrar"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="h-full w-full overflow-y-auto scroll-smooth">
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
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full text-white p-8 md:p-12">
              <Badge variant="secondary" className="mb-4 w-fit">{project.category}</Badge>
              <h1 className="font-headline text-4xl sm:text-5xl lg:text-7xl text-white">
                 <DialogTitle>{project.title}</DialogTitle>
              </h1>
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
                <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                        <p className="font-bold text-foreground">Año</p>
                        <p>{project.year}</p>
                    </div>
                </div>
            </div>

            <div className="text-lg leading-relaxed text-muted-foreground max-w-3xl">
              <DialogDescription>{project.description}</DialogDescription>
            </div>
            
            {project.media.length > 0 && (
                <div className="mt-16">
                    <h2 className="font-headline text-3xl sm:text-4xl text-foreground mb-8">Galería del Proyecto</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        {project.media.map((mediaItem, index) => (
                            <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg bg-muted">
                                {mediaItem.type === 'image' ? (
                                <Image
                                    src={mediaItem.url}
                                    alt={`${project.title} media ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                ) : (
                                <video
                                    src={mediaItem.url}
                                    className="w-full h-full object-cover"
                                    controls
                                />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
          </main>
        </div>

      </DialogContent>
    </Dialog>
  );
}
