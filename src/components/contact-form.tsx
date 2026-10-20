'use client';

import { useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name    = formData.get('name')    as string;
    const email   = formData.get('email')   as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Por favor, completa todos los campos.',
      });
      return;
    }

    const subject = encodeURIComponent(`Contacto Web — ${name}`);
    const body    = encodeURIComponent(
      `Hola Pablo,\n\nMi nombre es ${name}.\nMi correo de contacto es: ${email}\n\nMensaje:\n${message}`
    );

    window.location.href = `mailto:pabloblazquezgil@gmail.com?subject=${subject}&body=${body}`;

    toast({
      title: '¡Abriendo cliente de correo!',
      description: 'Se ha abierto tu cliente de correo para enviar el mensaje.',
    });

    formRef.current?.reset();
  };

  const fieldClass =
    'w-full border border-linen/15 bg-linen/5 px-4 py-3 text-sm text-linen outline-none transition-colors placeholder:text-linen/30 focus:border-gold focus:bg-gold/5';
  const labelClass = 'mb-2 block text-xs font-medium text-linen/60';

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 text-left">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>Nombre</label>
          <input id="name" name="name" type="text" placeholder="Tu nombre" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input id="email" name="email" type="email" placeholder="tu@email.com" required className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Mensaje</label>
        <textarea
          id="message"
          name="message"
          placeholder="Cuéntame tu proyecto: qué necesitas, fechas y lugar."
          rows={6}
          required
          className={`${fieldClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gold px-8 py-3.5 font-headline text-lg uppercase tracking-wide text-canopy transition-colors hover:bg-linen sm:w-auto"
      >
        Enviar mensaje
      </button>
    </form>
  );
}
