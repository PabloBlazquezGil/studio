'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { budgetRanges, contactEmail, services } from '@/lib/data';
import { cn } from '@/lib/utils';

const steps = ['Qué necesitas', 'Cuándo y dónde', 'Presupuesto', 'Tus datos'] as const;

const fieldClass =
  'w-full border border-linen/15 bg-linen/5 px-4 py-3 text-sm text-linen outline-none transition-colors placeholder:text-linen/30 focus:border-gold focus:bg-gold/5';
const labelClass = 'mb-2 block text-xs font-medium text-linen/60';

/**
 * Briefing por pasos. Al terminar abre el programa de correo del visitante (mailto:)
 * con todas las respuestas ya escritas en el mensaje.
 */
export function ContactForm() {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [types, setTypes] = useState<string[]>([]);
  const [when, setWhen] = useState('');
  const [where, setWhere] = useState('');
  const [budget, setBudget] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const canContinue = [types.length > 0, true, budget !== '', name !== '' && email !== ''][step];

  const toggleType = (type: string) =>
    setTypes((current) => (current.includes(type) ? current.filter((t) => t !== type) : [...current, type]));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < steps.length - 1) {
      if (canContinue) setStep(step + 1);
      return;
    }
    if (!name || !email) {
      toast({ variant: 'destructive', title: 'Error', description: 'Por favor, completa tu nombre y tu email.' });
      return;
    }

    const subject = encodeURIComponent(`Contacto Web — ${name}`);
    const body = encodeURIComponent(
      [
        'Hola Pablo,',
        '',
        `Mi nombre es ${name}.`,
        `Mi correo de contacto es: ${email}`,
        '',
        `Qué necesito: ${types.join(', ')}`,
        `Fecha: ${when || 'Por concretar'}`,
        `Lugar: ${where || 'Por concretar'}`,
        `Presupuesto orientativo: ${budget}`,
        '',
        'Mensaje:',
        message || '(sin mensaje adicional)',
      ].join('\n'),
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

    toast({
      title: '¡Abriendo cliente de correo!',
      description: 'Se ha abierto tu cliente de correo para enviar el mensaje.',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="text-left">
      {/* Progreso */}
      <ol className="mb-10 grid grid-cols-4 gap-2" aria-label="Pasos del briefing">
        {steps.map((label, index) => (
          <li key={label} aria-current={index === step ? 'step' : undefined}>
            <span className={cn('block h-0.5 transition-colors duration-500', index <= step ? 'bg-gold' : 'bg-linen/15')} />
            <span className={cn('mt-2 hidden text-xs sm:block', index === step ? 'text-linen' : 'text-linen/40')}>
              {String(index + 1).padStart(2, '0')} {label}
            </span>
          </li>
        ))}
      </ol>

      <div key={step} className="min-h-[18rem] animate-in fade-in slide-in-from-right-4 duration-500">
        {step === 0 && (
          <fieldset>
            <legend className="font-headline text-3xl font-bold uppercase text-linen sm:text-4xl">¿Qué necesitas?</legend>
            <p className="mt-2 text-sm text-linen/60">Puedes elegir varias opciones.</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {services.map(({ title }) => {
                const selected = types.includes(title);
                return (
                  <button
                    key={title}
                    type="button"
                    onClick={() => toggleType(title)}
                    aria-pressed={selected}
                    className={cn(
                      'inline-flex items-center gap-2 border px-4 py-2.5 font-headline text-lg uppercase tracking-wide transition-colors',
                      selected ? 'border-gold bg-gold text-canopy' : 'border-linen/20 text-linen hover:border-gold',
                    )}
                  >
                    {selected && <Check className="h-4 w-4" />}
                    {title}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset className="space-y-5">
            <legend className="font-headline text-3xl font-bold uppercase text-linen sm:text-4xl">¿Cuándo y dónde?</legend>
            <p className="text-sm text-linen/60">Si aún no lo sabes, puedes dejarlo en blanco.</p>
            <div>
              <label htmlFor="when" className={labelClass}>Fecha aproximada</label>
              <input id="when" value={when} onChange={(e) => setWhen(e.target.value)} placeholder="Ej.: finales de marzo" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="where" className={labelClass}>Lugar</label>
              <input id="where" value={where} onChange={(e) => setWhere(e.target.value)} placeholder="Ej.: A Coruña" className={fieldClass} />
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend className="font-headline text-3xl font-bold uppercase text-linen sm:text-4xl">Presupuesto orientativo</legend>
            <p className="mt-2 text-sm text-linen/60">Me ayuda a proponerte la mejor opción.</p>
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {budgetRanges.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setBudget(range)}
                  aria-pressed={budget === range}
                  className={cn(
                    'border px-4 py-3 text-left font-headline text-xl uppercase tracking-wide transition-colors',
                    budget === range ? 'border-gold bg-gold text-canopy' : 'border-linen/20 text-linen hover:border-gold',
                  )}
                >
                  {range}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset className="space-y-5">
            <legend className="font-headline text-3xl font-bold uppercase text-linen sm:text-4xl">Tus datos</legend>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>Nombre</label>
                <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" required className={fieldClass} />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Email</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" required className={fieldClass} />
              </div>
            </div>
            <div>
              <label htmlFor="message" className={labelClass}>Cuéntame algo más (opcional)</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="La idea, el estilo que buscas, referencias…"
                className={cn(fieldClass, 'resize-none')}
              />
            </div>
          </fieldset>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="inline-flex items-center gap-2 font-headline text-lg uppercase tracking-wide text-linen/60 hover:text-linen"
          >
            <ArrowLeft className="h-4 w-4" /> Atrás
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={!canContinue}
          className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-headline text-lg uppercase tracking-wide text-canopy transition-colors hover:bg-linen disabled:cursor-not-allowed disabled:opacity-40"
        >
          {step < steps.length - 1 ? 'Siguiente' : 'Enviar por email'} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
