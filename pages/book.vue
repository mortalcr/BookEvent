<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Salón Elegante para Eventos</h1>

    <div class="grid md:grid-cols-2 gap-6">
      <div>
        <div class="carousel w-full">
          <div id="slide1" class="carousel-item relative w-full">
            <img src="/assets/images/ranchophoto1.png" class="w-full h-[400px] object-cover rounded-lg mb-4" />
            <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide4" class="btn btn-circle">❮</a>
              <a href="#slide2" class="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="slide2" class="carousel-item relative w-full">
            <img src="/assets/images/ranchophoto2.png" class="w-full h-[400px] object-cover rounded-lg mb-4" />
            <div class=" absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide1" class="btn btn-circle">❮</a>
              <a href="#slide3" class="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="slide3" class="carousel-item relative w-full">
            <img src="/assets/images/ranchophoto3.png" class="w-full h-[400px] object-cover rounded-lg mb-4" />
            <div class=" absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide2" class="btn btn-circle">❮</a>
              <a href="#slide4" class="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="slide4" class="carousel-item relative w-full">
            <img src="/assets/images/ranchophoto4.png" class="w-full h-[400px] object-cover rounded-lg mb-4" />
            <div class=" absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide3" class="btn btn-circle">❮</a>
              <a href="#slide1" class="btn btn-circle">❯</a>
            </div>
          </div>
        </div>
        <div class="flex items-center mb-4">
          <map-pin-icon class="w-5 h-5 mr-2 text-gray-500" />
          <span><a target="_blank" href="https://www.google.com/maps/place/Rancho+Fern%C3%A1ndez+Fern%C3%A1ndez/@10.0911155,-84.453697,15z/data=!4m6!3m5!1s0x8fa044c4da796e8d:0xfd7cdc29a4041789!8m2!3d10.0911155!4d-84.453697!16s%2Fg%2F11bw2_gv47?entry=ttu&g_ep=EgoyMDI0MDkyOS4wIKXMDSoASAFQAw%3D%3D">San Ramon, Costa Rica</a></span>
        </div>
        {{ values }}
        <form class="flex flex-col gap-2">
          <div v-for="(service, idx) in data" :key="idx" class="form-control">
            <div class="flex flex-row gap-2 items-start cursor-pointer">
              <div class="collapse">
                <input type="radio" name="available-service-collapse-radio">
                <span class="collapse-title">{{ service.name }}</span>
                <span class="collapse-content">{{ service.description }}</span>
              </div>
              <input type="checkbox" v-model="values" :data-element="service" :value="service" :checked="false" class="checkbox" name="check[]" />
            </div>
          </div>
        </form>
        <p class="mb-6">
          Nuestro salón de eventos es perfecto para tus eventos especiales. Con capacidad para hasta 100 personas,
          ofrece un espacio versátil y moderno para todas tus celebraciones.
        </p>
      </div>
      <div>
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Reserva tu evento</h2>
            <div class="mb-4">
              <label for="dates">Selecciona las fechas</label>
              <v-date-picker borderless v-model="date" mode="date" class="custom-picker" is-required
                :min-date='new Date()' locale="es" :timezone="timezone" color="red" transparent :disabled-dates="disabledDates"
                :is-dark="isDark" />
            </div>
            <div class="mb-4">
              <label for="guests">Número de invitados</label>
              <input type="number" v-model="guests" id="guests" placeholder="1" min="1" max="100 " @input="guests = guests > 100 ? 100 : guests < 1 ? 1 : Math.round(guests)"
                class="input input-bordered w-full" />
            </div>
            <div class="mb-6">
              <h3 class="font-semibold mb-2">Precio</h3>
              <p class="text-2xl font-bold">₡{{values.map((service) => service.price).reduce((acc, price) => acc + price, 0)}} CRC <span class="text-sm font-normal text-gray-500">por día</span>
              </p>
            </div>
            <button class="btn btn-primary w-full" @click="bookEvent">Reservar ahora</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { MapPinIcon } from 'lucide-vue-next';
import 'v-calendar/style.css';
import { type Database } from '~/types/supabase';

const color = useColorMode();
const date = ref(new Date());
const guests = ref(1);
const disabledDates = ref<string[]>([]);
const isDark = ref(false);
const timezone = ref('UTC');

const price = ref(0);



const values = ref<{
  created_at: string;
  description: string;
  id: number;
  name: string;
  price: number;

}[]>([]);
console.log(values);

const supabase = useSupabaseClient<Database>();
const { data, error } = await supabase.from("available_services").select();
if (error) {
  console.error(error);
}



const loadReservations = async () => {
  const { data, error } = await supabase.from("reservations").select("reservation_date");
  if (error) {
    console.error(error);
  }
  if (data) {
    disabledDates.value = data.map((reservation) => (reservation.reservation_date));
  }
};


const bookEvent = async () => {
  
  if (values.value.length === 0) {
    alert("Por favor selecciona al menos un servicio");
    return;
  }

  const { data, error } = await supabase.from("reservations").insert({
    reservation_date: date.value.toISOString().split('T')[0],
    email: "ZNoSabehacerBases@gmail.com"
  });


  if (error) {
    console.error(error);
  }
  else {
    bookServices();
  }

};

console.log(data);


const getEventID = async () => {
  const { data, error } = await supabase.from("reservations").select("id").eq("reservation_date", date.value.toISOString().split('T')[0]);
  return data && data.length > 0 ? data[0].id : null;
}

const bookServices = async () => {
  
  const eventID = await getEventID();
  console.log("LA ID DEL EVENTO: ",eventID);
  console.log("LOS SERVICIOS SELECCIONADOS: ");
  
  let total_amount = 0;
  
  for (let i = 0; i < values.value.length; i++) {
    total_amount += values.value[i].price;    
    const { data, error } = await supabase.from("reservation_services").insert({
      reservation_id: eventID||0,
      service_id: values.value[i].id
    }); 
    if (error) {
      console.error(error);
    }
  }
  const { data, error } = await supabase.from("reservations").update({ total_amount: total_amount, guests:guests.value }).eq("id", eventID||0);
};

watch(() => color.preference, (newVal) => {
  isDark.value = newVal === 'night';
});

onMounted(() => {
  isDark.value = color.preference === 'night';
  loadReservations();
});
</script>

<style></style>
