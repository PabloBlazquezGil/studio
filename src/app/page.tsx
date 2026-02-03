"use client";

import { useState } from 'react';
import type { Project } from '@/lib/types';
import { projects } from '@/lib/data';
import HeroSection from '@/components/hero-section';
import PhotoGallerySection from '@/components/photo-gallery-section';
import VideoCardsSection from '@/components/video-cards-section';
import AboutSection from '@/components/about-section';
import ClientsSection from '@/components/clients-section';
import dynamic from 'next/dynamic';

const ProjectDetailOverlay = dynamic(() => import('@/components/project-detail-overlay'), {
  ssr: false
});

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseOverlay = () => {
    setSelectedProject(null);
  };

  const allProjects = projects || [];
  const photoProjects = allProjects.filter(p => !p.media.some(m => m.type === 'video'));
  const videoProjects = allProjects.filter(p => p.media.some(m => m.type === 'video'));


  return (
    <>
      <HeroSection />
      
      <div id="gallery">
        <PhotoGallerySection projects={photoProjects} onProjectClick={handleProjectClick} />
      </div>
      
      <VideoCardsSection projects={videoProjects} onProjectClick={handleProjectClick} />

      <div id="about">
        <AboutSection />
      </div>

      <ClientsSection />
      
      {selectedProject && (
        <ProjectDetailOverlay
          project={selectedProject}
          onClose={handleCloseOverlay}
          allProjects={allProjects}
          onProjectChange={handleProjectClick}
        />
      )}
    </>
  );
}
