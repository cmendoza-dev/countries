<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <div class="flex-1 overflow-auto p-6 ">
      <!-- Buscar -->
      <div
        class="mx-auto flex justify-between items-center px-4 py-2 mb-4 shadow-md border-b-2 border-gray-300 bg-white rounded-full">
        <div class="block px-4 py-2">
          <label for="">País</label>
          <input v-model="searchQuery" type="text" placeholder="Escribe un país que quieres ver"
            class="w-full max-w-md focus:outline-none focus:border-b-2 focus:border-blue-400 placeholder:text-sm"
            @click="showModal = true" @input="handleInput" />
        </div>
        <button @click="search"
          class="flex items-center px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff"
            stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search mr-2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          Buscar
        </button>
      </div>
      <!-- Modal - Filtrar por continentes -->
      <div v-if="showModal" class="fixed mb-6 bg-white shadow-lg rounded-3xl px-6 py-4">
        <div class="">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Filtrar por continentes</h2>
            <button @click="clearFilters" class="text-[#009cff] rounded-md hover:text-blue-600">
              Limpiar
            </button>
          </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div v-for="continent in continents" :key="continent.code" @click="toggleContinent(continent.code)"
            class="cursor-pointer" :class="{ 'ring-2 ring-blue-500': selectedContinents.includes(continent.code) }">
            <img :src="getContinentImage(continent.code)" :alt="continent.name"
              class="w-full h-20 object-cover rounded border" />
            <span class="p-2 text-center text-sm">{{ continent.name }}</span>
          </div>
        </div>
      </div>

      <!-- Panel con los paises -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-6" @click="closeModal">
        <CountryCard v-for="country in filteredCountries" :key="country.code" :country="country"
          @click="selectCountry(country.code)" :isSelected="selectedCountryCode === country.code"
          @select="handleSelect" />
      </div>
    </div>
    <CountryInfoPanel :countryCode="selectedCountryCode" :isOpen="isPanelOpen" @close="closePanelㅤ" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import CountryCard from "../components/CountryCard.vue";
import CountryInfoPanel from "../components/CountryInfoPanel.vue";
import Sidebar from "../components/Sidebar.vue";

const COUNTRIES_QUERY = gql`
  query {
    countries {
      code
      name
      capital
      emoji
      continent {
        code
        name
      }
    }
    continents {
      code
      name
    }
  }
`;

const { result } = useQuery(COUNTRIES_QUERY);

const countries = computed(() => result.value?.countries || []);
const continents = computed(() => result.value?.continents || []);
const selectedCountryCode = ref("");
const showModal = ref(false);
const searchQuery = ref("");
const selectedContinents = ref([]);
const isPanelOpen = ref(false);

const selectCountry = (code) => {
  selectedCountryCode.value = code;
  isPanelOpen.value = true;
};

const closePanelㅤ = () => {
  isPanelOpen.value = false;
};

const filteredCountries = computed(() => {
  return countries.value.filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchesContinent =
      selectedContinents.value.length === 0 ||
      selectedContinents.value.includes(country.continent.code);
    return matchesSearch && matchesContinent;
  });
});

function search() {
  // La búsqueda ya está implementada reactivamente
}

function toggleContinent(continentCode) {
  const index = selectedContinents.value.indexOf(continentCode);
  if (index > -1) {
    selectedContinents.value.splice(index, 1);
  } else {
    selectedContinents.value.push(continentCode);
  }
}

function clearFilters() {
  searchQuery.value = "";
  selectedContinents.value = [];
}

const closeModal = () => {
  showModal.value = false;
};

const handleInput = () => {
  if (searchQuery.value.length > 0) {
    showModal.value = false;
  } else {
    showModal.value = true;
  }
};


const handleSelect = (countryCode) => {
  selectedCountryCode.value = countryCode === selectedCountryCode.value ? "" : countryCode;
  isPanelOpen.value = !!selectedCountryCode.value;
};

function getContinentImage(code) {
  return require(`@/assets/${code}.jpg`);
};

</script>