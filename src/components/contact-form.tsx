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

  /* ── Shared style tokens ─────────────────────────────────────── */
  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'rgba(249,248,246,0.05)',
    border: '1px solid rgba(249,248,246,0.12)',
    color: '#F9F8F6',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.85rem',
    fontWeight: 400,
    padding: '0.85rem 1.1rem',
    outline: 'none',
    transition: 'border-color 0.4s ease, background-color 0.4s ease',
    borderRadius: 0,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: 'rgba(249,248,246,0.5)',
    marginBottom: '0.5rem',
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = '#D4AF37';
    e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.05)';
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(249,248,246,0.12)';
    e.currentTarget.style.backgroundColor = 'rgba(249,248,246,0.05)';
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 text-left">

      {/* Row: Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" style={labelStyle}>Nombre</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Tu nombre"
            required
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <label htmlFor="email" style={labelStyle}>Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="tu@email.com"
            required
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" style={labelStyle}>Mensaje</label>
        <textarea
          id="message"
          name="message"
          placeholder="¿En qué puedo ayudarte?"
          rows={6}
          required
          style={{
            ...inputStyle,
            resize: 'none',
          } as React.CSSProperties}
          onFocus={handleFocus as any}
          onBlur={handleBlur as any}
        />
      </div>

      {/* Submit — gold primary button */}
      <div className="pt-2">
        <button
          type="submit"
          className="btn-primary w-full sm:w-auto"
          style={{ minWidth: '14rem', justifyContent: 'center', display: 'inline-block', textAlign: 'center' }}
        >
          Enviar Mensaje
        </button>
      </div>
    </form>
  );
}
