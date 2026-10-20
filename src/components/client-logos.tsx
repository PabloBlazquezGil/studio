import Image from 'next/image';
import { clientLogos } from '@/lib/data';

/** Franja clara con los logos de clientes en gris, que recuperan el color al pasar el ratón. */
export default function ClientLogos() {
  if (clientLogos.length === 0) return null;

  return (
    <section className="bg-linen px-5 py-16 sm:px-10 sm:py-20">
      <p className="text-center text-sm font-medium text-canopy/60">Con la confianza de</p>
      <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-2 items-center gap-x-12 gap-y-10 sm:grid-cols-4">
        {clientLogos.map((logo) => (
          <li key={logo.clientName} className="flex justify-center">
            <Image
              src={logo.logoUrl}
              alt={logo.clientName}
              width={160}
              height={64}
              className="h-14 w-auto object-contain opacity-60 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
