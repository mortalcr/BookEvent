<template>
  <div class="min-h-screen py-10 relative bottton-0">
    <div class="container mx-auto px-4">
      <div class="card bg-base-100 shadow-xl">
        <figure>
          <img
            src="assets\images\rancho.jpg" 
            alt="Rancho Familia Fernández Fernández"
            class="w-full h-64 object-cover"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title text-4xl font-bold text-primary">
            Rancho Familia Fernández Fernández
          </h2>
          <p class="text-lg text-gray-600">
            El <strong>Rancho Familia Fernández Fernández</strong> es el lugar ideal para la celebración de tus eventos especiales. Ubicado en San Ramón, ofrecemos amplios espacios para todo tipo de celebraciones, desde bodas, quinceañeras, hasta eventos empresariales.
          </p>
          <p class="mt-4 text-lg text-gray-600">
            Nuestra misión es brindarte un servicio de excelencia para que tu evento sea inolvidable. Contamos con áreas verdes, salón techado y una variedad de servicios adicionales para ajustarnos a todas tus necesidades.
          </p>
          <p>
              ¡Ven y descubre por qué somos el lugar preferido para eventos en la región!
          </p>
          <div class="card-actions justify-end">
            <a href="https://www.facebook.com/p/Rancho-Familia-Fern%C3%A1ndez-Fern%C3%A1ndez-100063512606571/" 
               class="btn btn-primary"
               target="_blank">
              Visita nuestro Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.container {
  max-width: 800px;
}

</style>
