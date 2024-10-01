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
          <span>San Ramon, Costa Rica</span>
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
              <input type="checkbox" v-model="values" :data-element="service" :value="service.id" :checked="false" class="checkbox" name="check[]" />
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
                :min-date='new Date()' locale="es" color="red" transparent :disabled-dates="disabledDates"
                :is-dark="isDark" />
            </div>
            <div class="mb-4">
              <label for="guests">Número de invitados</label>
              <input type="number" v-model="guests" id="guests" placeholder="1" min="1" max="100"
                class="input input-bordered w-full" />
            </div>
            <div class="mb-6">
              <h3 class="font-semibold mb-2">Precio</h3>
              <p class="text-2xl font-bold">₡50,000 CRC <span class="text-sm font-normal text-gray-500">por día</span>
              </p>
            </div>
            <button class="btn btn-primary w-full">Reservar ahora</button>
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
const disabledDates = ref([]);
const isDark = ref(false);

const values = ref([]);
console.log(values);

const supabase = useSupabaseClient<Database>();
const { data, error } = await supabase.from("available_services").select();
if (error) {
  console.error(error);
}

console.log(data);

watch(() => color.preference, (newVal) => {
  isDark.value = newVal === 'night';
});

onMounted(() => {
  isDark.value = color.preference === 'night';
});
</script>

<style></style>
