import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Política de Privacidad | Pablo Blázquez Gil',
  description: 'Política de privacidad del portfolio de Pablo Blázquez Gil — Fotografía y Filmmaking.',
};

export default function PrivacyPolicyPage() {
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
            Política de Privacidad
          </h1>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(to right, #1C2826, rgba(28,40,38,0.1))', marginBottom: '3rem' }} />

        {/* Content */}
        <div
          className="space-y-10"
          style={{
            color: '#4A4E51',
            fontFamily: 'var(--font-body, Montserrat), sans-serif',
            fontSize: '0.9rem',
            lineHeight: '1.9',
          }}
        >
          <p>
            Esta Política de Privacidad describe cómo se recopila, utiliza y comparte su información personal cuando visita o realiza una consulta a través de este sitio web.
          </p>

          <section>
            <h2
              className="font-headline text-lg font-light mb-4"
              style={{ color: '#1C2826', letterSpacing: '0.15em' }}
            >
              Información Personal que Recopilamos
            </h2>
            <p>
              Cuando visita el Sitio, recopilamos automáticamente cierta información sobre su dispositivo, incluida información sobre su navegador web, dirección IP, zona horaria y algunas de las cookies que están instaladas en su dispositivo.
            </p>
            <p className="mt-4">
              Además, cuando utiliza el formulario de contacto, recopilamos la información que nos proporciona, incluyendo su nombre y dirección de correo electrónico.
            </p>
          </section>

          <section>
            <h2
              className="font-headline text-lg font-light mb-4"
              style={{ color: '#1C2826', letterSpacing: '0.15em' }}
            >
              ¿Cómo utilizamos su Información Personal?
            </h2>
            <p>
              Utilizamos la Información de Contacto que recopilamos para comunicarnos con usted en respuesta a sus consultas. No utilizamos esta información para ningún otro propósito ni la compartimos con terceros con fines de marketing.
            </p>
          </section>

          <section>
            <h2
              className="font-headline text-lg font-light mb-4"
              style={{ color: '#1C2826', letterSpacing: '0.15em' }}
            >
              Sus Derechos
            </h2>
            <p>
              Si usted es residente del Espacio Económico Europeo, tiene derecho a acceder a la información personal que tenemos sobre usted y a solicitar que su información personal sea corregida, actualizada o eliminada. Si desea ejercer este derecho, póngase en contacto con nosotros a través del formulario disponible en este sitio.
            </p>
          </section>

          <section>
            <h2
              className="font-headline text-lg font-light mb-4"
              style={{ color: '#1C2826', letterSpacing: '0.15em' }}
            >
              Retención de Datos
            </h2>
            <p>
              Cuando nos contacte a través del Sitio, mantendremos su Información de Contacto para nuestros registros a menos que y hasta que nos pida que eliminemos esta información.
            </p>
          </section>

          <section>
            <h2
              className="font-headline text-lg font-light mb-4"
              style={{ color: '#1C2826', letterSpacing: '0.15em' }}
            >
              Cambios
            </h2>
            <p>
              Podemos actualizar esta política de privacidad de vez en cuando para reflejar, por ejemplo, cambios en nuestras prácticas o por otras razones operativas, legales o reglamentarias.
            </p>
          </section>

          <section>
            <h2
              className="font-headline text-lg font-light mb-4"
              style={{ color: '#1C2826', letterSpacing: '0.15em' }}
            >
              Contáctenos
            </h2>
            <p>
              Para obtener más información sobre nuestras prácticas de privacidad o si tiene alguna pregunta, contáctenos a través del{' '}
              <a
                href="/#contact"
                className="text-gold hover:opacity-75 transition-opacity duration-400"
              >
                formulario de contacto
              </a>
              {' '}disponible en este sitio.
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
