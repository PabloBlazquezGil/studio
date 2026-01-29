'use client';

import { useFormStatus } from 'react-dom';
import { sendEmail } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useEffect, useRef, useActionState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full md:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {pending ? 'Enviando...' : 'Enviar Mensaje'}
    </Button>
  );
}

export function ContactForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(sendEmail, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (Object.keys(state.errors).length === 0) {
        toast({
            title: "¡Éxito!",
            description: state.message,
        });
        formRef.current?.reset();
      } else {
        // Find the first error message to display
        const firstErrorKey = Object.keys(state.errors)[0] as keyof typeof state.errors;
        const firstErrorMessage = state.errors[firstErrorKey]?.[0];

        toast({
            variant: "destructive",
            title: "Error de validación",
            description: firstErrorMessage || "Por favor, corrige los errores en el formulario.",
        });
      }
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={dispatch} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" name="name" placeholder="Tu nombre" required aria-describedby="name-error" />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name && <p className="text-sm text-destructive mt-1">{state.errors.name[0]}</p>}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="tu@email.com" required aria-describedby="email-error" />
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email && <p className="text-sm text-destructive mt-1">{state.errors.email[0]}</p>}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Mensaje</Label>
        <Textarea id="message" name="message" placeholder="¿En qué puedo ayudarte?" rows={5} required aria-describedby="message-error" />
        <div id="message-error" aria-live="polite" aria-atomic="true">
            {state.errors?.message && <p className="text-sm text-destructive mt-1">{state.errors.message[0]}</p>}
        </div>
      </div>
      <div className="text-center">
        <SubmitButton />
      </div>
    </form>
  );
}
