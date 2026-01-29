import { ContactForm } from '@/components/contact-form';
import { Copyright } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-secondary border-t border-border/20" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-headline text-4xl sm:text-5xl text-foreground">
            Hablemos
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            ¿Tienes un proyecto en mente o simplemente quieres saludar? Rellena el formulario y me pondré en contacto contigo.
          </p>
        </div>
        <div className="max-w-3xl mx-auto mt-12">
          <ContactForm />
        </div>
      </div>
      <div className="bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-center text-center text-muted-foreground">
              <Copyright className="w-4 h-4 mr-2" />
              <p>
              {currentYear} Pablo Blázquez Gil. Todos los Derechos Reservados.
              </p>
          </div>
      </div>
    </footer>
  );
}
