import Link from 'next/link';
import PageIntro from '@/components/page-intro';

export default function NotFound() {
  return (
    <div className="min-h-[70vh]">
      <PageIntro eyebrow="Error 404" title="Página no encontrada">
        <Link
          href="/trabajos"
          className="mt-10 inline-block border border-linen/30 px-6 py-3 font-headline text-lg uppercase tracking-wide text-linen hover:border-gold hover:text-gold"
        >
          Ver trabajos
        </Link>
      </PageIntro>
    </div>
  );
}
