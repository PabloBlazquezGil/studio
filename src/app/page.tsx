"use client";

import { useState } from 'react';
import type { Project } from '@/lib/types';
import HeroSection from '@/components/hero-section';
import PhotoGallerySection from '@/components/photo-gallery-section';
import VideoCardsSection from '@/components/video-cards-section';
import AboutSection from '@/components/about-section';
import ClientsSection from '@/components/clients-section';
import ProjectDetailOverlay from '@/components/project-detail-overlay';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="aspect-[2/3] rounded-lg" />
      ))}
    </div>
  )
}

function VideoProjectsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="aspect-video rounded-lg" />
            ))}
        </div>
    )
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const firestore = useFirestore();

  const projectsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'projects');
  }, [firestore]);

  const { data: projects, isLoading: projectsLoading } = useCollection<Project>(projectsQuery);
  
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
        {projectsLoading ? (
            <section className="py-24 sm:py-32 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <Skeleton className="h-12 w-3/4 mx-auto" />
                        <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
                    </div>
                    <ProjectsSkeleton />
                </div>
            </section>
        ) : (
            <PhotoGallerySection projects={photoProjects} onProjectClick={handleProjectClick} />
        )}
      </div>
      
      {projectsLoading ? (
        <section className="py-24 sm:py-32 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <Skeleton className="h-12 w-3/4 mx-auto" />
                    <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
                </div>
                <VideoProjectsSkeleton />
            </div>
        </section>
      ) : (
        <VideoCardsSection projects={videoProjects} onProjectClick={handleProjectClick} />
      )}


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
