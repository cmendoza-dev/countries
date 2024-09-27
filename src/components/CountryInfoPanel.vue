<template>
  <div class="fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
    :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }">
    <div class="h-full flex flex-col">
      <!-- Close button -->
      <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <div v-if="loading" class="flex-grow flex items-center justify-center">
        <p class="text-gray-600">Loading country data...</p>
      </div>

      <div v-else-if="error" class="flex-grow flex items-center justify-center">
        <p class="text-red-600">Error loading data: {{ error.message }}</p>
      </div>

      <div v-else-if="country" class="flex-grow overflow-y-auto">
        <!-- Country image -->
        <img :src="countryImage" :alt="`Image of ${country.name}`" class="w-full h-40 object-cover" />

        <!-- Country information -->
        <div class="px-4 py-3 bg-[#009cff] text-white">
          <div class="flex items-center">
            <img :src="getFlagImage(country.code)" :alt="country.name + ' flag'" class="w-8 h-5 mr-2" />
            <h2 class="text-xl font-semibold">{{ country.name }}</h2>
          </div>
          <p class="text-sm">{{ country.continent.name }}</p>
        </div>

        <div class="px-4 py-3 space-y-2 text-sm">
          <p><span class="font-semibold">Capital:</span> {{ country.capital }}</p>
          <p><span class="font-semibold">Language:</span> {{ country.languages[0]?.name }}</p>
          <p><span class="font-semibold">Population:</span> {{ formatPopulation(country.population) || 'N/A' }}</p>
          <p><span class="font-semibold">Currency:</span> {{ country.currency }}</p>
        </div>

        <!-- Region selector -->
        <div v-if="country.states.length > 0" class="px-4 py-3">
          <label class="block text-sm font-semibold mb-1">Region</label>
          <select v-model="selectedRegion"
            class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">Select a region</option>
            <option v-for="state in country.states" :key="state.name" :value="state.name">
              {{ state.name }}
            </option>
          </select>
        </div>
      </div>

      <div v-else class="flex-grow flex items-center justify-center">
        <p class="text-gray-600">No country data available.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import axios from "axios";

const props = defineProps({
  countryCode: {
    type: String,
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const COUNTRY_QUERY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      code
      name
      capital
      currency
      languages {
        name
      }
      continent {
        name
      }
      states {
        name
      }
    }
  }
`;

const { result, loading, error } = useQuery(COUNTRY_QUERY, () => ({
  code: props.countryCode,
}));

const country = computed(() => result.value?.country);
const selectedRegion = ref("");
const countryImage = ref("");

const UNSPLASH_ACCESS_KEY = "zJkqbBX5cj2bCEDayOw5BLVOuHLE8Si0dQRSJ-ob7kg";

watchEffect(async () => {
  if (country.value) {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: country.value.name,
            client_id: UNSPLASH_ACCESS_KEY,
          },
        }
      );
      if (response.data.results.length > 0) {
        countryImage.value = response.data.results[0].urls.regular;
      } else {
        console.warn("No images found for the country");
        countryImage.value = "/placeholder-image.jpg";
      }
    } catch (error) {
      console.error("Error fetching image from Unsplash:", error);
      countryImage.value = "/placeholder-image.jpg";
    }
  }
});

function getFlagImage(code) {
  return `https://flagicons.lipis.dev/flags/4x3/${code.toLowerCase()}.svg`;
}

function formatPopulation(population) {
  if (population >= 1000000) {
    return (population / 1000000).toFixed(1) + 'M people';
  } else if (population >= 1000) {
    return (population / 1000).toFixed(1) + 'k people';
  } else {
    return population + ' people';
  }
}
</script>