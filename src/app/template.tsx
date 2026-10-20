/**
 * Transición entre páginas: al entrar en cada página, una cortina del color de fondo
 * con una línea dorada se retira hacia arriba y el contenido aparece debajo.
 * (Un template se vuelve a montar en cada navegación, a diferencia del layout.)
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-[70] animate-curtain bg-canopy motion-reduce:hidden"
        aria-hidden
      >
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gold" />
      </div>
      <div className="animate-page-in motion-reduce:animate-none">{children}</div>
    </>
  );
}
