<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Salón Elegante para Eventos</h1>

    <div class="grid md:grid-cols-2 gap-6">
      <div>
        <img
          src="assets/images/bookphoto.jpg"
          alt="Salón Elegante"
          class="w-full h-[400px] object-cover rounded-lg mb-4"
        />
        <div class="flex items-center mb-4">
          <map-pin-icon class="w-5 h-5 mr-2 text-gray-500" />
          <span>San Ramon, Costa Rica</span>
        </div>
        <div class="flex flex-wrap gap-4 mb-6">
          <div class="flex items-center">
            <user-icon class="w-5 h-5 mr-2 text-gray-500" />
            <span>Hasta 100 personas</span>
          </div>
          <div class="flex items-center">
            <wifi-icon class="w-5 h-5 mr-2 text-gray-500" />
            <span>Wi-Fi gratis</span>
          </div>
          <div class="flex items-center">
            <tv-icon class="w-5 h-5 mr-2 text-gray-500" />
            <span>Proyector</span>
          </div>
          <div class="flex items-center">
            <utensils-icon class="w-5 h-5 mr-2 text-gray-500" />
            <span>Cocina equipada</span>
          </div>
        </div>
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
              <v-date-picker
                borderless
                v-model="date" 
                mode="date"
                class="custom-picker"
                is-required
                :min-date='new Date()'
                locale = "es"
                color = "red"
                transparent
                :disabled-dates="disabledDates"
                :is-dark="!!color.preference"
              />
            </div>
            <div class="mb-4">
              <label for="guests">Número de invitados</label>
              <input
                type="number"
                v-model="guests"
                id="guests"
                placeholder="1"
                min="1"
                max="50"
                class="input input-bordered w-full"
              />
            </div>
            <div class="mb-6">
              <h3 class="font-semibold mb-2">Precio</h3>
              <p class="text-2xl font-bold">₡50,000 CRC <span class="text-sm font-normal text-gray-500">por día</span></p>
            </div>
            <button class="btn btn-primary w-full"  @click="test">Reservar ahora</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MapPinIcon, UserIcon, WifiIcon, TvIcon, UtensilsIcon} from 'lucide-vue-next'
import 'v-calendar/style.css';

const date = ref(new Date());
//Uses YYYY-MM-DD format
const disabledDates = ref([
  "2024-9-30",
]);

const test = () => {
  console.log('date', date.value)
  console.log('Color', color.preference)
}

const color = useColorMode();

</script>

<style>



</style>