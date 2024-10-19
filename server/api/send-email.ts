import nodemailer from 'nodemailer';
import { readBody } from 'h3';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '~/types/supabase';

// Crear cliente de Supabase
const supabase = createClient<Database>(
  process.env.SUPABASE_URL as string, 
  process.env.SUPABASE_KEY as string
);

export default defineEventHandler(async (event) => {
  // Leer el cuerpo de la solicitud POST, que contiene el `eventId`, `services` y `total`
  const body = await readBody(event);
  const { eventId, services, total } = body;

  // Obtener el correo de la tabla `reservations` usando el `eventId`
  const { data, error } = await supabase
    .from('reservations')
    .select('email')
    .eq('id', eventId)
    .single();  // Esperamos obtener solo un resultado

  if (error || !data) {
    console.error('Error al obtener el correo de la base de datos:', error);
    return { success: false, message: 'No se pudo obtener el correo de la base de datos.' };
  }

  const email = data.email;  // Correo obtenido de la base de datos

  // Configuración de Nodemailer para enviar el correo
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Generar el desglose de los servicios seleccionados
  const servicesList = services
    .map((service: any) => `<li>${service.name}: ₡${service.price}</li>`)
    .join('');

  // Contenido del correo
  const mailOptions = {
    from: `"Rancho Fernández" <${process.env.EMAIL_USER}>`,
    to: email,  // Correo obtenido de la base de datos
    subject: 'Cotización de Servicios para tu Evento',
    html: `
      <h3>Gracias por tu reservación en Rancho Fernández</h3>
      <p>Estos son los servicios seleccionados para tu evento:</p>
      <ul>
        ${servicesList}
      </ul>
      <p><strong>Total: ₡${total}</strong></p>
      <p>Si tienes alguna duda, no dudes en contactarnos.</p>
    `,
  };

  // Enviar el correo
  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Correo enviado correctamente.' };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return { success: false, message: 'Error al enviar el correo.' };
  }
});