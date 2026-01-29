"use client"

import type { Project } from "@/lib/types";
import { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import ScrollReveal from "./scroll-reveal";

interface ParallaxVideoCardProps {
    project: Project;
    onProjectClick: (project: Project) => void;
}

function ParallaxVideoCard({ project, onProjectClick }: ParallaxVideoCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
        if (cardRef.current) {
            cardRef.current.style.transform = `perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)`;
        }
        setIsHovering(false);
    };
    
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handlePause = () => {
            if (isHovering) {
                videoElement.pause();
                setIsPlaying(false);
            }
        };

        if(!isHovering) {
            videoElement.pause();
            setIsPlaying(false);
        }

        document.addEventListener('visibilitychange', handlePause);
        
        return () => {
            document.removeEventListener('visibilitychange', handlePause);
        }

    }, [isHovering]);


    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const togglePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    }
    
    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            onClick={() => onProjectClick(project)}
            className="relative aspect-video w-full max-w-3xl mx-auto rounded-lg overflow-hidden transition-transform duration-300 ease-out cursor-pointer shadow-2xl"
            style={{ transformStyle: "preserve-3d" }}
        >
            <video
                ref={videoRef}
                src={project.imageUrl}
                className="absolute inset-0 w-full h-full object-cover"
                loop
                muted
                playsInline
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10 flex flex-col justify-end h-full p-8 text-white">
                <h3 className="font-headline text-3xl">{project.title}</h3>
                <p className="text-sm uppercase tracking-wider">{project.category}</p>
            </div>
            {isHovering && (
                <button 
                    onClick={togglePlay} 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-opacity duration-300"
                >
                    {isPlaying ? <Pause className="w-8 h-8 text-primary-foreground"/> : <Play className="w-8 h-8 text-primary-foreground ml-1"/>}
                </button>
            )}
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
                <div className="flex flex-col gap-16">
                    {projects.map((project, index) => (
                        <ScrollReveal key={project.id} delay={index * 150}>
                            <ParallaxVideoCard project={project} onProjectClick={onProjectClick} />
                        </ScrollReveal>
                    ))}
                </div>
            </ScrollReveal>
        </section>
    );
}
