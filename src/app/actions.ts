'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string({required_error: "El nombre es obligatorio."}).min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string({required_error: "El email es obligatorio."}).email({ message: "Por favor, introduce un email válido." }),
  message: z.string({required_error: "El mensaje es obligatorio."}).min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
});

export type State = {
    errors: {
        name?: string[];
        email?: string[];
        message?: string[];
    };
    message: string | null;
}

export async function sendEmail(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error de validación.',
    };
  }

  // En un escenario real, aquí usarías un servicio como Resend, Nodemailer,
  // o SendGrid para enviar el correo. Como no puedo configurar eso, simulo el envío.
  // La siguiente sección está comentada como ejemplo.
  /*
  try {
    const { name, email, message } = validatedFields.data;
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Acme <onboarding@resend.dev>',
    //   to: ['pabloblazquezgil@gmail.com'],
    //   subject: `Nuevo mensaje de contacto de ${name}`,
    //   reply_to: email,
    //   text: message,
    // });
    return {
      errors: {},
      message: '¡Gracias por tu mensaje! Te responderé lo antes posible.',
    };
  } catch (error) {
    console.error('Error al enviar el email:', error);
    return {
      errors: {},
      message: 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.',
    };
  }
  */

  console.log('--- Nuevo Mensaje de Contacto ---');
  console.log(`Nombre: ${validatedFields.data.name}`);
  console.log(`Email: ${validatedFields.data.email}`);
  console.log(`Mensaje: ${validatedFields.data.message}`);
  console.log('------------------------------------');
  
  return {
    errors: {},
    message: '¡Gracias por tu mensaje! Te responderé lo antes posible.',
  };
}
