"use client";

import { useState } from 'react';
import type { Project } from '@/lib/types';
import HeroSection from '@/components/hero-section';
import PhotoGallerySection from '@/components/photo-gallery-section';
import VideoCardsSection from '@/components/video-cards-section';
import AboutSection from '@/components/about-section';
import ClientsSection from '@/components/clients-section';
import ProjectDetailOverlay from '@/components/project-detail-overlay';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase'; // import hooks
import { collection } from 'firebase/firestore'; // import collection
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const firestore = useFirestore();

  const projectsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'projects');
  }, [firestore]);

  const { data: projects, isLoading } = useCollection<Project>(projectsQuery);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseOverlay = () => {
    setSelectedProject(null);
  };

  if (isLoading) {
      return (
          <>
            <HeroSection />
            <div id="gallery" className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
              <div className="text-center mb-16">
                  <Skeleton className="h-12 w-1/2 mx-auto" />
                  <Skeleton className="h-6 w-3/4 mx-auto mt-4" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => <Skeleton key={i} className="aspect-[2/3] rounded-lg" />)}
              </div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
                <div className="text-center mb-16">
                    <Skeleton className="h-12 w-1/2 mx-auto" />
                    <Skeleton className="h-6 w-3/4 mx-auto mt-4" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[...Array(2)].map((_, i) => <Skeleton key={i} className="aspect-video w-full rounded-lg" />)}
                </div>
            </div>
            <AboutSection />
            <ClientsSection />
          </>
      )
  }

  const allProjects = projects || [];
  const photoProjects = allProjects.filter(p => !p.media.some(m => m.type === 'video')).slice(0, 6);
  const videoProjects = allProjects.filter(p => p.media.some(m => m.type === 'video')).slice(0, 2);


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
      
      <ProjectDetailOverlay
        project={selectedProject}
        onClose={handleCloseOverlay}
        allProjects={allProjects}
        onProjectChange={handleProjectClick}
      />
    </>
  );
}
