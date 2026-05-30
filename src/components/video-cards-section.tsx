"use client";

import type { Project } from "@/lib/types";
import { useRef, useState, useEffect } from "react";
import { Play } from "lucide-react";
import ScrollReveal from "./scroll-reveal";
import { getYouTubeId } from "@/lib/utils";
import Image from "next/image";

interface VideoCardProps {
  project: Project;
  onProjectClick: (project: Project) => void;
  featured?: boolean;
}

function VideoCard({ project, onProjectClick, featured = false }: VideoCardProps) {
  const videoRef   = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const videoUrl  = project.media.find(m => m.type === 'video')?.url || '';
  const youtubeId = getYouTubeId(videoUrl);

  useEffect(() => {
    if (youtubeId) return;
    const video = videoRef.current;
    if (!video) return;
    if (isHovering) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isHovering, youtubeId]);

  return (
    <div
      onMouseEnter={() => {
        if (!youtubeId) {
          const video = videoRef.current;
          if (video) video.currentTime = 5;
        }
        setIsHovering(true);
      }}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => onProjectClick(project)}
      className={`group relative overflow-hidden shadow-2xl cursor-pointer ${
        featured ? 'aspect-video' : 'aspect-video'
      }`}
    >
      {/* ── Media layer ──────────────────────────────────────────── */}
      {youtubeId ? (
        <div className="absolute inset-0 w-full h-full bg-canopy">
          <Image
            src={project.imageUrl || `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      ) : (
        <video
          ref={videoRef}
          src={videoUrl}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          loop
          muted
          playsInline
          preload="metadata"
        />
      )}

      {/* ── Canopy gradient overlay ──────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-t from-canopy/90 via-canopy/30 to-transparent" />

      {/* ── Gold border on hover ─────────────────────────────────── */}
      <div
        className="absolute inset-0 border border-transparent group-hover:border-gold/40 transition-all duration-500 pointer-events-none"
      />

      {/* ── Category badge — top-left ───────────────────────────── */}
      <div className="absolute top-5 left-5">
        <span
          className="font-body text-[8px] uppercase tracking-[0.3em] px-3 py-1.5"
          style={{
            backgroundColor: 'rgba(28,40,38,0.6)',
            border: '1px solid rgba(212,175,55,0.35)',
            color: '#D4AF37',
            backdropFilter: 'blur(8px)',
          }}
        >
          {project.category}
        </span>
      </div>

      {/* ── Bottom info ──────────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-9 text-linen">
        <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
          <p
            className="font-body text-[9px] uppercase tracking-[0.3em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ color: '#D4AF37' }}
          >
            {project.client && `Para: ${project.client}`}
          </p>
          {/* Gold line */}
          <div
            className="h-[1px] mb-4 transition-all duration-500 opacity-0 group-hover:opacity-100"
            style={{ backgroundColor: '#D4AF37', width: '2.5rem' }}
          />
          <h3
            className="font-headline text-2xl md:text-3xl font-light"
            style={{ letterSpacing: '0.12em', color: '#F9F8F6' }}
          >
            {project.title}
          </h3>
        </div>
      </div>

      {/* ── Play button — gold ring ──────────────────────────────── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div
          className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transition-all duration-500 scale-0 group-hover:scale-100 group-hover:hover:scale-110"
          style={{
            border: '1px solid rgba(212,175,55,0.6)',
            backgroundColor: 'rgba(212,175,55,0.12)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <Play
            className="w-6 h-6 md:w-7 md:h-7 ml-0.5"
            style={{ color: '#D4AF37' }}
            fill="currentColor"
          />
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
    <section className="py-28 sm:py-36 bg-background">
      <ScrollReveal className="container mx-auto px-6 sm:px-8 lg:px-16">

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-20 gap-6">
          <div>
            <p className="label-eyebrow mb-4">Producción</p>
            <div className="divider-gold mb-6" />
            <h2
              className="font-headline text-4xl sm:text-5xl lg:text-6xl text-foreground font-light"
              style={{ letterSpacing: '0.18em' }}
            >
              Vídeo
            </h2>
          </div>
          <p
            className="font-body text-sm leading-[1.8] max-w-xs text-left sm:text-right"
            style={{ color: 'rgba(249,248,246,0.5)' }}
          >
            Pasa el cursor sobre cada pieza para ver un adelanto en movimiento.
          </p>
        </div>

        {/* ── Grid ─────────────────────────────────────────────────── */}
        <div className={`grid gap-4 ${projects.length === 1 ? 'grid-cols-1 max-w-5xl mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
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
