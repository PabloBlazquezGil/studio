import { Copyright } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-background border-t border-border/20" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-center text-center text-muted-foreground">
        <Copyright className="w-4 h-4 mr-2" />
        <p>
          {currentYear} Pablo Blázquez Gil. Todos los Derechos Reservados.
        </p>
      </div>
    </footer>
  );
}
