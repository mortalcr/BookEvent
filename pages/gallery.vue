<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">Galería de Fotos</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="image in images" :key="image.id">
        <img :src="image.url" :alt="image.name" class="h-48 w-full object-cover group-hover:opacity-80" />
      </div>
    </div>
    <div class="text-center mt-6">
      <button
        v-if="!isLoading"
        @click="loadImages"
        class="btn"
      > 
        Cargar más
      </button>
      <p v-else>Cargando...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

interface Image {
  id: string;
  name: string;
  url: string;
}

const images = ref<Image[]>([]); 
const isLoading = ref(false);
const page = ref(1);
const limit = 8;

const loadImages = async () => {
  isLoading.value = true;
  try {
    const response = await $fetch<Image[]>(`/api/get-images?page=${page.value}&limit=${limit}`);
    images.value = [...images.value, ...response]; 
    page.value++; 
  } catch (error) {
    console.error("Error fetching images:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadImages();
});
</script>

<style>
img {
  transition: opacity 0.3s ease-in-out;
}
.group:hover img {
  opacity: 0.8;
}
.group:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;
}
</style>
