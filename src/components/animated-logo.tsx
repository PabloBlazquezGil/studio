import Image from 'next/image';

/**
 * AnimatedLogo
 * - Navbar / mobile: muestra sólo el isotipo cuadrado
 * - El nombre completo queda reservado para el Hero y el Footer
 * - Sobre fondos oscuros (#1C2826) el logo se renderiza con filtro dorado
 */
export default function AnimatedLogo() {
  return (
    <div className="flex items-center gap-3 group">
      {/* Isotipo cuadrado */}
      <div
        className="relative w-10 h-10 overflow-hidden border border-gold/30 flex items-center justify-center bg-canopy"
        style={{ transition: 'border-color 0.4s ease' }}
      >
        <Image
          src="https://thundershoot.com/wp-content/uploads/2026/05/Logo-Pablo-Blazquez.png"
          alt="PBG — Pablo Blázquez Gil"
          fill
          className="object-contain p-1"
          priority
          unoptimized
        />
      </div>

      {/* Nombre + tagline — visible en pantallas medianas+ */}
      <div className="hidden md:block leading-none">
        <span
          className="block font-headline text-[11px] tracking-[0.3em] text-foreground uppercase"
          style={{ letterSpacing: '0.25em' }}
        >
          Pablo Blázquez Gil
        </span>
        <span
          className="block font-body text-[8px] tracking-[0.25em] uppercase mt-[3px]"
          style={{ color: '#D4AF37', letterSpacing: '0.25em' }}
        >
          Fotografía &amp; Filmmaking
        </span>
      </div>
    </div>
  );
}
