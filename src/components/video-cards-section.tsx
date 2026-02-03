"use client";

import type { Project } from "@/lib/types";
import { useRef, useState, useEffect } from "react";
import { Play } from "lucide-react";
import ScrollReveal from "./scroll-reveal";

interface VideoCardProps {
    project: Project;
    onProjectClick: (project: Project) => void;
}

function VideoCard({ project, onProjectClick }: VideoCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const videoUrl = project.media.find(m => m.type === 'video')?.url || '';

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isHovering) {
            video.play().catch(error => {
                // Autoplay may be blocked by the browser.
                console.warn("Video autoplay was prevented.", error);
            });
        } else {
            video.pause();
            video.currentTime = 0; // Reset video to the beginning to show poster
        }
    }, [isHovering]);

    return (
        <div
            onMouseEnter={() => {
                const video = videoRef.current;
                if (video && video.currentTime < 5) {
                    video.currentTime = 5;
                }
                setIsHovering(true);
            }}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => onProjectClick(project)}
            className="group relative aspect-video w-full rounded-lg overflow-hidden shadow-2xl cursor-pointer"
        >
            <video
                ref={videoRef}
                src={videoUrl}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                loop
                muted
                playsInline
                poster={project.imageUrl}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
                 <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                    <h3 className="font-headline text-2xl md:text-3xl">{project.title}</h3>
                    <p className="text-sm uppercase tracking-wider opacity-80">{project.category}</p>
                </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 scale-0 group-hover:scale-100">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1 md:ml-2" />
                </div>
            </div>
        </div>
    );
}

interface VideoCardsSectionProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export default function VideoCardsSection({ projects, onProjectClick }: VideoCardsSectionProps) {
    return (
        <section className="py-24 sm:py-32 bg-background">
            <ScrollReveal className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-foreground">Proyectos de Vídeo</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Explora una colección de trabajos cinematográficos, donde cada fotograma cuenta una historia.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <ScrollReveal key={project.id} delay={index * 150}>
                            <VideoCard project={project} onProjectClick={onProjectClick} />
                        </ScrollReveal>
                    ))}
                </div>
            </ScrollReveal>
        </section>
    );
}
