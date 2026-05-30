import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Aviso Legal | Pablo Blázquez Gil',
  description: 'Aviso legal del portfolio de Pablo Blázquez Gil — Fotografía y Filmmaking.',
};

export default function LegalNoticePage() {
  return (
    <div className="min-h-screen w-full pt-28" style={{ backgroundColor: '#F9F8F6' }}>
      <div className="container mx-auto max-w-3xl px-6 sm:px-8 lg:px-12 py-16 sm:py-24">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-16 group text-basalt hover:text-gold transition-colors duration-400"
          style={{
            fontFamily: 'var(--font-body, Montserrat), sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1 duration-400" />
          Volver al portfolio
        </Link>

        {/* Header */}
        <div className="mb-14">
          <p
            className="font-body text-[10px] uppercase tracking-[0.4em] mb-4"
            style={{ color: '#D4AF37' }}
          >
            Información Legal
          </p>
          <div
            className="mb-6"
            style={{ display: 'block', width: '3rem', height: '1px', backgroundColor: '#D4AF37' }}
          />
          <h1
            className="font-headline text-4xl sm:text-5xl font-light"
            style={{ color: '#1C2826', letterSpacing: '0.15em' }}
          >
            Aviso Legal
          </h1>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(to right, #1C2826, rgba(28,40,38,0.1))', marginBottom: '3rem' }} />

        {/* Content */}
        <div className="space-y-10" style={{ color: '#4A4E51', fontFamily: 'var(--font-body, Montserrat), sans-serif', fontSize: '0.9rem', lineHeight: '1.9' }}>

          <section>
            <h2
              className="font-headline text-lg font-light mb-4"
              style={{ color: '#1C2826', letterSpacing: '0.15em' }}
            >
              1. Identificación del titular
            </h2>
            <p>
              En cumplimiento de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico, le informamos que el titular de este sitio web es <strong style={{ color: '#1C2826', fontWeight: 500 }}>Pablo Blázquez Gil</strong>.
            </p>
          </section>

          <section>
            <h2
              className="font-headline text-lg font-light mb-4"
              style={{ color: '#1C2826', letterSpacing: '0.15em' }}
            >
              2. Condiciones de uso
            </h2>
            <p>
              El acceso y/o uso de este portal le atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas.
            </p>
          </section>

          <section>
            <h2
              className="font-headline text-lg font-light mb-4"
              style={{ color: '#1C2826', letterSpacing: '0.15em' }}
            >
              3. Propiedad Intelectual e Industrial
            </h2>
            <p>
              Todos los contenidos de este sitio web (textos, fotografías, vídeos, logotipos, etc.) son propiedad de Pablo Blázquez Gil o de terceros que han autorizado su uso, y están protegidos por la legislación de propiedad intelectual e industrial. Queda prohibida la reproducción, distribución y comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización del titular.
            </p>
          </section>

          <section>
            <h2
              className="font-headline text-lg font-light mb-4"
              style={{ color: '#1C2826', letterSpacing: '0.15em' }}
            >
              4. Exclusión de garantías y responsabilidad
            </h2>
            <p>
              El titular no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
            </p>
          </section>

          <section>
            <h2
              className="font-headline text-lg font-light mb-4"
              style={{ color: '#1C2826', letterSpacing: '0.15em' }}
            >
              5. Legislación aplicable y jurisdicción
            </h2>
            <p>
              La relación entre el titular y el USUARIO se regirá por la normativa española vigente y cualquier controversia se someterá a los Juzgados y tribunales de la ciudad que corresponda.
            </p>
          </section>
        </div>

        {/* Bottom gold line */}
        <div
          className="mt-20"
          style={{ height: '1px', background: 'linear-gradient(to right, transparent, #D4AF37, transparent)' }}
        />
        <p
          className="text-center mt-6"
          style={{
            fontFamily: 'var(--font-body, Montserrat), sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(74,78,81,0.5)',
          }}
        >
          © {new Date().getFullYear()} Pablo Blázquez Gil
        </p>
      </div>
    </div>
  );
}
