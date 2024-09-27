<template>
  <div
    class="bg-white cursor-pointer hover:shadow-xl transition-shadow duration-300 shadow-[rgba(50,50,93,0.5)_0px_0px_16px] rounded-3xl"
    :class="{ '!bg-blue-500': isSelected }"
    @click="$emit('select', country.code)"
  >
    <div class="">
      <img :src="countryImage" :alt="country.name" class="w-full h-32 object-cover rounded-t-3xl" />
      <div class="flex items-center px-6 py-3">
        <img 
          :src="`https://flagicons.lipis.dev/flags/4x3/${country.code.toLowerCase()}.svg`" 
          :alt="country.name"
          class="w-10 h-auto mr-2 object-cover" 
        />
        <div>
          <h2 class="text-lg font-semibold" :class="{ 'text-white': isSelected }">{{ country.name }}</h2>
          <p class="text-sm" :class="isSelected ? 'text-blue-100' : 'text-gray-500'">{{ country.continent.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, watchEffect } from "vue";

const props = defineProps({
  country: {
    type: Object,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
});

const countryImage = ref("");

const UNSPLASH_ACCESS_KEY = "zJkqbBX5cj2bCEDayOw5BLVOuHLE8Si0dQRSJ-ob7kg";

watchEffect(async () => {
  if (props.country?.name) {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: props.country.name,
            client_id: UNSPLASH_ACCESS_KEY,
          },
        }
      );
      console.log("Respuesta de Unsplash:", response.data);

      if (response.data.results.length > 0) {
        countryImage.value = response.data.results[0].urls.regular;
      } else {
        console.warn("No se encontraron imágenes para el país");
        countryImage.value = "URL_de_imagen_de_respaldo";
      }
    } catch (error) {
      console.error("Error al obtener la imagen de Unsplash:", error);
      countryImage.value = "URL_de_imagen_de_respaldo";
    }
  }
});
</script>