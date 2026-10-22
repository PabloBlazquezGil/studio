import Image from 'next/image';
import SplitHeading from '@/components/motion/split-heading';
import { clientLogos } from '@/lib/data';
import type { ClientLogo } from '@/lib/types';

/** Repeticiones por mitad de la cinta, para que pocos logos llenen pantallas anchas sin huecos. */
const REPEAT = 4;

/**
 * Cinta infinita de logos de clientes en blanco sobre el fondo oscuro (archivos en /public/logos).
 * La cinta se pausa al pasar el ratón y queda quieta con movimiento reducido.
 */
export default function ClientLogos() {
  if (clientLogos.length === 0) return null;

  const track = Array.from({ length: REPEAT }, () => clientLogos).flat();

  return (
    <section className="overflow-hidden border-t border-linen/10 py-24 sm:py-32" aria-labelledby="clientes">
      <div className="px-5 sm:px-10">
        <p id="clientes" className="text-sm font-medium text-gold">
          Clientes
        </p>
        <SplitHeading lines={['Con la', '*confianza de*']} className="mt-3 text-5xl font-bold leading-[0.9] text-linen sm:text-7xl" />
      </div>

      <div className="group relative mt-14 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-12 motion-reduce:px-5">
          <LogoList logos={track} />
          <LogoList logos={track} hidden className="motion-reduce:hidden" />
        </div>
      </div>
    </section>
  );
}

function LogoList({ logos, hidden = false, className = '' }: { logos: ClientLogo[]; hidden?: boolean; className?: string }) {
  return (
    <ul className={`flex shrink-0 items-center gap-16 pr-16 sm:gap-24 sm:pr-24 motion-reduce:contents ${className}`} aria-hidden={hidden || undefined}>
      {logos.map((logo, index) => {
        // Con movimiento reducido solo se ve la primera tanda, sin repeticiones.
        const repeated = index >= clientLogos.length;
        return (
          <li
            key={`${logo.clientName}-${index}`}
            className={`relative h-24 w-52 shrink-0 opacity-80 transition-opacity duration-500 hover:opacity-100 sm:h-28 sm:w-64 ${repeated ? 'motion-reduce:hidden' : ''}`}
            aria-hidden={!hidden && repeated ? true : undefined}
          >
            <Image src={logo.logoUrl} alt={hidden || repeated ? '' : logo.clientName} fill sizes="256px" className="object-contain" />
          </li>
        );
      })}
    </ul>
  );
}
