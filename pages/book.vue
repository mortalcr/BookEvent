<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Selecciona y reserva nuestros servicios</h1>

    <div class="grid md:grid-cols-2 gap-6">
      <div>
        <div>
          <!-- Carousel -->
          <div class="carousel w-full">
            <div
              v-for="(image, index) in images"
              :key="index"
              class="carousel-item relative w-full"
              :class="{ hidden: activeSlide !== index, block: activeSlide === index }"
            >
              <!-- Image -->
              <img
                :src="image"
                class="w-full h-[400px] object-cover rounded-lg mb-4"
                alt="Evento"
              />
              <!-- Navigation -->
              <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <button class="btn btn-circle" @click="prevSlide">❮</button>
                <button class="btn btn-circle" @click="nextSlide">❯</button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center mb-4">
          <map-pin-icon class="w-5 h-5 mr-2 text-gray-500" />
          <span>
            <a
              target="_blank"
              href="https://www.google.com/maps/place/Rancho+Fern%C3%A1ndez+Fern%C3%A1ndez/@10.0911155,-84.453697,15z/data=!4m6!3m5!1s0x8fa044c4da796e8d:0xfd7cdc29a4041789!8m2!3d10.0911155!4d-84.453697!16s%2Fg%2F11bw2_gv47?entry=ttu&g_ep=EgoyMDI0MDkyOS4wIKXMDSoASAFQAw%3D%3D"
            >
              San Ramon, Costa Rica
            </a>
          </span>
        </div>
        <form class="flex flex-col gap-2">
          <h3 class="text-gray-500 font-bold">Seleccione al menos un servicio</h3>
          <div v-for="(service, idx) in data" :key="idx" class="form-control">
            <div class="flex flex-row gap-2 items-start cursor-pointer">
              <div class="collapse">
                <input type="radio" name="available-service-collapse-radio">
                <span class="collapse-title">{{ service.name }}</span>
                <span class="collapse-content">{{ service.description }}</span>
              </div>
              <input type="checkbox" v-model="values" :data-element="service" :value="service" :checked="false"
                class="checkbox" name="check[]" />
            </div>
          </div>
        </form>
        <p class="mb-6">
          Nuestro salón de eventos es perfecto para tus eventos especiales. Con capacidad para hasta
          <strong>100</strong> personas,
          ofrece un espacio versátil y moderno para todas tus celebraciones. <br><br>
          <strong>Contamos con servicio de transporte para el alquiler de mobiliario, manteleria, toldos e inflables
            infantiles.</strong>
        </p>
      </div>
      <div>
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Reserva tu evento</h2>
            <div class="mb-4 flex flex-col items-center">
              <label for="dates">Selecciona las fechas</label>
              <v-date-picker borderless v-model="date" mode="date" class="w-fit" is-required :min-date='new Date()'
                locale="es" :timezone="timezone" transparent :disabled-dates="disabledDates" :is-dark="isDark" />
            </div>
            <div class="mb-4">
              <label for="guests">Número de invitados (capacidad 100 personas)</label>
              <input type="number" v-model="guests" id="guests" placeholder="1" min="1" max="100 "
                @input="guests = guests > 100 ? 100 : guests < 1 ? 1 : Math.round(guests)"
                class="input input-bordered w-full mt-3" />
            </div>
            <!-- <div v-if="!user.data.user" class="mb-4">
              <label for="guests">Correo electronico (A este correo se enviará el comprobante)</label>
              <input type="email" id="email" placeholder="Correo electronico" v-model="email"
                class="input input-bordered w-full mt-3" />
            </div> -->
            <div class="mb-6">
              <h3 class="font-semibold mb-2">Precio</h3>
              <p class="text-2xl font-bold mb-1">₡{{ values.map((service) => service.price).reduce((acc, price) => acc +
                price, 0) }} CRC <span class="text-sm font-normal text-gray-500">por día</span>
              </p>
              <p class="text-xs text-gray-500 font-semibold">Precio estimado*</p>
            </div>
            <div id="paypal-button-container"
              :hidden="!acceptedTerms || (values.length < 1 || disabledDates.includes(formatDate(date)))">
            </div>
            <div v-if="values.length < 1" role="alert" class="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Debe seleccionar al menos un servicio.</span>
            </div>
            <div v-if="disabledDates.includes(formatDate(date))" role="alert" class="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>La fecha seleccionada no se encuentra disponible.</span>
            </div>
            <div class="form-control">
              <label for="terms" class="label cursor-pointer" :class="{'text-error': !acceptedTerms}">
                <input class="checkbox me-2" v-model="acceptedTerms" type="checkbox">
                <p>He leído y acepto los <NuxtLink class="link link-primary" target="_blank" href="/terms">términos y
                    condiciones</NuxtLink>.</p>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// NOTE: POS code thanks to noni
import { ref, watch, onMounted } from 'vue';
import { MapPinIcon } from 'lucide-vue-next';
import 'v-calendar/style.css';
import { type Database } from '~/types/supabase';

import { loadScript } from '@paypal/paypal-js';

function formatDate(d: Date): string {
  return d.toISOString().split("T")[0];
}


const acceptedTerms = ref(false);
const color = useColorMode();
const date = ref(new Date());
const guests = ref(1);
const disabledDates = ref<string[]>([]);
const isDark = ref(false);
const timezone = ref('UTC');

const values = ref<{
  created_at: string;
  description: string;
  id: number;
  name: string;
  price: number;
}[]>([]);

// List of images
const images = ref([
  "/images/ranchophoto1.png",
  "/images/ranchophoto3.png",
  "/images/5.jpg",
  "/images/7.jpg",
  "/images/9.jpg",
  "/images/12.jpg",
  "/images/14.jpg",
]);

// Current slide index
const activeSlide = ref(0);

// Next slide function
const nextSlide = () => {
  activeSlide.value = (activeSlide.value + 1) % images.value.length;
};

// Previous slide function
const prevSlide = () => {
  activeSlide.value =
    activeSlide.value === 0 ? images.value.length - 1 : activeSlide.value - 1;
};


const supabase = useSupabaseClient<Database>();
const { data, error } = await supabase.from("available_services").select();
if (error) {
  console.error(error);
}

{
  const { data, error } = await supabase.from("reservations").select("reservation_date");
  if (error) {
    console.error(error);
  }
  if (data) {
    disabledDates.value = data.map((reservation) => (reservation.reservation_date));
  }
}

const bookEvent = async (email: string) => {

  try {
    const response = await $fetch('/api/book', {
      method: 'POST',
      body: {
        reservation_date_user: date.value.toISOString().split('T')[0],  // Enviamos el `eventId` a la API
        email_user: email,
        values: values.value,
        guests: guests.value,
      }
    });

    if (response?.success) {
      console.log('Evento reservado correctamente:', response);
      await sendEmailConfirmation(response.message[0], values.value, response.message[1]);
      window.location.reload();
    }


  } catch (error) {
    console.error('Error al enviar el correo de confirmación:', error);
  }


}




// Función para enviar el correo de confirmación
const sendEmailConfirmation = async (eventId: number, services: any[], total: number) => {
  try {
    const response = await $fetch('/api/send-email', {
      method: 'POST',
      body: {
        eventId: eventId,  // Enviamos el `eventId` a la API
        services: services,
        total: total,
      }
    });
    console.log('Correo enviado correctamente:', response);
  } catch (error) {
    console.error('Error al enviar el correo de confirmación:', error);
  }
};


watch(() => color.preference, (newVal) => {
  isDark.value = newVal === 'night';
});

onMounted(async () => {
  isDark.value = color.preference === 'night';

  try {
    const paypal = await loadScript({
      clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID as string,
    });

    if (paypal?.Buttons) {
      paypal.Buttons({
        style: {
          shape: "rect",
          layout: "vertical",
          color: "blue",
          label: "paypal",
        },
        async createOrder(): Promise<string> {
          const response = await fetch("/api/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cart: values.value
            })
          });

          let responseData = await response.json();
          responseData = JSON.parse(responseData);
          if (responseData.id) {
            return responseData.id;
          }

          const errorDetail = responseData?.details?.[0];
          const errorMessage = errorDetail
            ? `${errorDetail.issue} ${errorDetail.description} (${responseData.debug_id})`
            : JSON.stringify(responseData);

          throw new Error(errorMessage);
        },
        async onApprove(_, actions) {
          const order = await actions.order?.get();
          bookEvent(order?.payer?.email_address as string);
          // NOTE: fabs de ahí en adelante ya se registró el evento, este código tiene un montón de problemas, además de que 
          // la reservación debería hacerse en el backend no en el frontend, esto está terrible, saludos a @noni que trabaja demasiado
          // bien y acepta críticas constructivas
        }
      }).render("#paypal-button-container");
    }
  } catch (e) {
    console.error(e);
  }
});
</script>
