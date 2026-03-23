"use client";

import type { Project } from "@/lib/types";
import { useRef, useState, useEffect } from "react";
import { Play } from "lucide-react";
import ScrollReveal from "./scroll-reveal";

interface VideoCardProps {
    project: Project;
    onProjectClick: (project: Project) => void;
    featured?: boolean;
}

function VideoCard({ project, onProjectClick, featured = false }: VideoCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const videoUrl = project.media.find(m => m.type === 'video')?.url || '';

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (isHovering) {
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    }, [isHovering]);

    return (
        <div
            onMouseEnter={() => {
                const video = videoRef.current;
                if (video) video.currentTime = 5;
                setIsHovering(true);
            }}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => onProjectClick(project)}
            className={`group relative overflow-hidden shadow-2xl cursor-pointer rounded-lg ${
                featured ? 'aspect-video' : 'aspect-video'
            }`}
        >
            <video
                ref={videoRef}
                src={videoUrl}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                loop
                muted
                playsInline
                preload="metadata"
            />
            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* White border on hover */}
            <div className="absolute inset-0 border border-transparent group-hover:border-white/20 transition-all duration-500 pointer-events-none rounded-lg" />

            {/* Top: category badge */}
            <div className="absolute top-4 left-4">
                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-sm">
                    {project.category}
                </span>
            </div>

            {/* Bottom info */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                    <p className="text-[10px] text-white/60 uppercase tracking-[0.25em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.client && `Para: ${project.client}`}
                    </p>
                    <h3 className="font-headline text-2xl md:text-3xl font-light tracking-tight">{project.title}</h3>
                </div>
            </div>

            {/* Play button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-16 h-16 md:w-20 md:h-20 border border-white/40 rounded-full flex items-center justify-center transition-all duration-500 scale-0 group-hover:scale-100 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:scale-110">
                    <Play className="w-6 h-6 md:w-7 md:h-7 text-white ml-1 pl-1" fill="currentColor" />
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
    if (!projects || projects.length === 0) return null;

    return (
        <section className="py-24 sm:py-32 bg-background">
            <ScrollReveal className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-4">
                    <div>
                        <p className="text-white/70 uppercase tracking-[0.3em] text-xs font-light mb-3">Producción</p>
                        <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-foreground font-light tracking-tight">Vídeo</h2>
                    </div>
                    <p className="text-muted-foreground max-w-xs text-sm leading-relaxed text-left sm:text-right">
                        Pasa el cursor sobre cada pieza para ver un adelanto en movimiento.
                    </p>
                </div>

                {/* Grid: first is featured if only 2 */}
                <div className={`grid gap-6 ${projects.length === 1 ? 'grid-cols-1 max-w-4xl mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
                    {projects.map((project, index) => (
                        <ScrollReveal key={project.id} delay={index * 150}>
                            <VideoCard
                                project={project}
                                onProjectClick={onProjectClick}
                                featured={projects.length === 1}
                            />
                        </ScrollReveal>
                    ))}
                </div>
            </ScrollReveal>
        </section>
    );
}
