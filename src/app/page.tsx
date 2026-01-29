"use client";

import { useState } from 'react';
import type { Project } from '@/lib/types';
import HeroSection from '@/components/hero-section';
import PhotoGallerySection from '@/components/photo-gallery-section';
import VideoCardsSection from '@/components/video-cards-section';
import AboutSection from '@/components/about-section';
import ClientsSection from '@/components/clients-section';
import ProjectDetailOverlay from '@/components/project-detail-overlay';
import { projects as mockProjects } from '@/lib/data';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseOverlay = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <HeroSection />
      
      <div id="gallery">
        <PhotoGallerySection projects={mockProjects.slice(0, 6)} onProjectClick={handleProjectClick} />
      </div>
      
      <VideoCardsSection projects={mockProjects.slice(6, 8)} onProjectClick={handleProjectClick} />

      <div id="about">
        <AboutSection />
      </div>

      <ClientsSection />
      
      <ProjectDetailOverlay
        project={selectedProject}
        onClose={handleCloseOverlay}
        allProjects={mockProjects}
        onProjectChange={handleProjectClick}
      />
    </>
  );
}
