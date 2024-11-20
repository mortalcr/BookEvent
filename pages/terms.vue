<template>
  <div class="mx-auto p-4">
    <section id="terms" class="flex flex-col gap-2 p-4">
      <h1 class="text-4xl font-bold">Términos y Condiciones del Rancho Fernández</h1>

      <ol class="list-decimal">
        <li class="marker:text-2xl marker:text-gray-500" v-for="(term, idx) in terms" :key="idx">
          <NuxtLink :id="term.id" :href="`#${term.id}`" class="link link-hover text-2xl font-bold">
            {{ term.title }}
          </NuxtLink>
          <div>
            <ul class="list-disc pl-10 text-lg">
              <li class="marker:text-lg" v-for="(condition, jdx) in term.conditions" :key="jdx">
                <NuxtLink :id="condition.id" :href="`#${condition.id}`">{{ condition.content }}</NuxtLink>
              </li>
            </ul>
          </div>
        </li>
      </ol>

      <p class="text-xl max-w-[1000px] text-justify">Al aceptar estos términos, el cliente asume la responsabilidad de
        cumplir con todas las disposiciones
        mencionadas. El incumplimiento de cualquiera de estas reglas podrá resultar en sanciones o la terminación
        inmediata del evento.</p>
    </section>
  </div>
</template>
<script setup lang="ts">
const terms = [
  {
    "id": "maximum_capacity",
    "title": "Capacidad máxima",
    "conditions": [
      {
        "id": "maximum_people",
        "content": "El espacio está diseñado para un máximo de 100 personas."
      },
      {
        "id": "no_exceeding_limit",
        "content": "No se permite realizar actividades que excedan este límite."
      }
    ]
  },
  {
    "id": "decoration_rules",
    "title": "Decoración permitida",
    "conditions": [
      {
        "id": "no_double_sided_tape",
        "content": "No está permitido el uso de cinta doble cara."
      },
      {
        "id": "no_colorful_streamers",
        "content": "No está permitido el uso de serpentinas de papel de colores."
      },
      {
        "id": "no_confetti",
        "content": "No está permitido el uso de confetti para decorar."
      }
    ]
  },
  {
    "id": "refund_policy",
    "title": "Política de reembolsos",
    "conditions": [
      {
        "id": "no_advance_refunds",
        "content": "No se realizarán devoluciones de adelantos de dinero bajo ninguna circunstancia."
      }
    ]
  },
  {
    "id": "event_rescheduling",
    "title": "Reprogramación de eventos",
    "conditions": [
      {
        "id": "date_rescheduling",
        "content": "Es posible reprogramar la fecha del evento, sujeto a disponibilidad y coordinación con el rancho."
      }
    ]
  },
  {
    "id": "event_hours",
    "title": "Horario límite",
    "conditions": [
      {
        "id": "maximum_hour",
        "content": "La hora máxima permitida para eventos es 10:00 PM, sin excepciones."
      }
    ]
  },
  {
    "id": "additional_prohibitions",
    "title": "Prohibiciones adicionales",
    "conditions": [
      {
        "id": "no_fireworks",
        "content": "No está permitido el uso de fuegos artificiales, incluyendo pero no limitado a pólvora."
      }
    ]
  },
  {
    "id": "catering_rules",
    "title": "Reglas sobre alimentos y catering",
    "conditions": [
      {
        "id": "prepared_food_only",
        "content": "Si se contrata un servicio de catering, los alimentos deben ser traídos preparados al lugar."
      },
      {
        "id": "no_food_preparation",
        "content": "No está permitido preparar alimentos en las instalaciones."
      },
      {
        "id": "heating_allowed",
        "content": "Se permite únicamente el calentamiento de alimentos en el lugar."
      }
    ]
  },
  {
    "id": "payment_terms",
    "title": "Términos de Pago",
    "conditions": [
      {
        "id": "paypal_payment_method",
        "content": "Todos los pagos realizados a través de la aplicación se procesan mediante PayPal."
      },
      {
        "id": "estimated_price_in_colones",
        "content": "El precio mostrado en la aplicación es un precio estimado en colones."
      },
      {
        "id": "price_conversion_to_usd",
        "content": "El precio final será convertido a dólares al momento de realizar el pago, por lo que el monto mostrado es solo una estimación."
      }
    ]
  },
  {
    "id": "payment_terms",
    "title": "Términos de Pago",
    "conditions": [
      {
        "id": "paypal_payment_method",
        "content": "Todos los pagos realizados a través de la aplicación se procesan mediante PayPal."
      },
      {
        "id": "estimated_price_in_colones",
        "content": "El precio mostrado en la aplicación es un precio estimado en colones."
      },
      {
        "id": "price_conversion_to_usd",
        "content": "El precio final será convertido a dólares al momento de realizar el pago, por lo que el monto mostrado es solo una estimación."
      },
      {
        "id": "paypal_fee",
        "content": "PayPal cobra una comisión sobre el precio total, la cual se reflejará al momento de realizar el pago."
      }
    ]
  }
];

</script>
