'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor, completa todos los campos.",
      });
      return;
    }

    const subject = encodeURIComponent(`Contacto Web - ${name}`);
    const body = encodeURIComponent(`Hola Pablo,\n\nMi nombre es ${name}.\nMi correo de contacto es: ${email}\n\nMensaje:\n${message}`);

    // Abre el cliente de correo por defecto
    window.location.href = `mailto:pabloblazquezgil@gmail.com?subject=${subject}&body=${body}`;

    toast({
      title: "¡Abriendo cliente de correo!",
      description: "Se ha abierto tu cliente de correo para enviar el mensaje.",
    });

    formRef.current?.reset();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" name="name" placeholder="Tu nombre" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="tu@email.com" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Mensaje</Label>
        <Textarea id="message" name="message" placeholder="¿En qué puedo ayudarte?" rows={5} required className="resize-none" />
      </div>
      <div className="text-center pt-2">
        <Button type="submit" size="lg" className="w-full md:w-auto px-8 rounded-full font-medium transition-all">
          Enviar Mensaje
        </Button>
      </div>
    </form>
  );
}
