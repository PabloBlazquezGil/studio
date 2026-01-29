import type { Project } from '@/lib/types';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { X } from 'lucide-react';
import Image from 'next/image';

interface ProjectDetailOverlayProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailOverlay({ project, onClose }: ProjectDetailOverlayProps) {
  if (!project) return null;

  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-none w-full h-full p-0 bg-background/95 backdrop-blur-sm border-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0">
        <button onClick={onClose} className="absolute top-4 right-4 z-50 text-foreground hover:text-primary transition-colors">
          <X className="w-8 h-8" />
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 h-full overflow-y-auto lg:overflow-hidden">
          <div className="lg:col-span-2 h-full min-h-[50vh] flex items-center justify-center p-4">
            <Carousel className="w-full h-full">
              <CarouselContent className="h-full">
                {project.media.map((mediaItem, index) => (
                  <CarouselItem key={index} className="h-full flex items-center justify-center">
                    <div className="relative w-full h-full max-h-[90vh]">
                      {mediaItem.type === 'image' ? (
                        <Image
                          src={mediaItem.url}
                          alt={`${project.title} media ${index + 1}`}
                          fill
                          className="object-contain"
                          sizes="100vw"
                        />
                      ) : (
                        <video
                          src={mediaItem.url}
                          className="w-full h-full object-contain"
                          controls
                          autoPlay
                          loop
                        />
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {project.media.length > 1 && (
                <>
                  <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                  <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
                </>
              )}
            </Carousel>
          </div>
          <div className="lg:col-span-1 p-8 sm:p-12 flex flex-col justify-center border-l border-border/20">
            <h2 className="font-headline text-4xl sm:text-5xl text-primary">{project.title}</h2>
            <p className="mt-2 text-lg font-semibold uppercase tracking-wider text-muted-foreground">{project.category}</p>
            <div className="w-16 h-1 bg-primary my-8" />
            <p className="text-lg leading-relaxed">{project.description}</p>
            <div className="mt-8 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="font-bold text-muted-foreground">Cliente:</span>
                <span className="text-right">{project.client}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-muted-foreground">Año:</span>
                <span className="text-right">{project.year}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
