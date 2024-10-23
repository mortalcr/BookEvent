import { createClient } from "@supabase/supabase-js";
import type { Database } from "~/types/supabase";

const supabase = createClient<Database>(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

interface Service {
  reservation_date_user: string;
  email_user: string;
  eventID: number;
  values: values[];
  guests: number;
}

interface values {
  created_at: string;
  description: string;
  id: number;
  name: string;
  price: number;
}

export default defineEventHandler(async (event) => {
  try {
    // BUG: #HERE => what happens if the connection is lost between #HERE and #THERE
    // NO PASA NADA

    const body: Service = await readBody(event);

    const { reservation_date_user, email_user, values, guests } = body;

    const { data, error } = await supabase
      .from("reservations")
      .insert({
        reservation_date: reservation_date_user,
        email: email_user,
      })
      .select();

    if (error) {
      console.error(error);
      return;
    }

    await bookServices(data[0].id, values, guests);

    // Calcular el total de los servicios seleccionados
    const total = values.reduce((acc, service) => acc + service.price, 0);

    return {
      success: true,
      message: [data[0].id, total],
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: [0] };
  }
});

// Función para guardar los servicios seleccionados

const bookServices = async (
  eventID: number,
  values: values[],
  guests: number
) => {
  // BUG: #THERE => !
  let total_amount = 0;
  for (let i = 0; i < values.length; i++) {
    total_amount += values[i].price;
    const { error } = await supabase.from("reservation_services").insert({
      reservation_id: eventID || 0,
      service_id: values[i].id,
    });
    if (error) {
      console.error(error);
    }
  }

  await supabase
    .from("reservations")
    .update({ total_amount: total_amount, guests: guests })
    .eq("id", eventID);
};
