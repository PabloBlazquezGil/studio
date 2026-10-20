import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageIntro from '@/components/page-intro';
import WorkIndex from '@/components/work-index';

export const metadata: Metadata = {
  title: 'Trabajos',
  description: 'Proyectos de fotografía y vídeo: surf y deporte, retrato, eventos, cortometrajes y reels para redes sociales.',
};

export default function WorkPage() {
  return (
    <>
      <PageIntro eyebrow="Portfolio" title="Trabajos" />
      <section className="px-2.5 pb-24 sm:px-10">
        <Suspense>
          <WorkIndex />
        </Suspense>
      </section>
    </>
  );
}
