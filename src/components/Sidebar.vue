<template>
    <div class="">
        <!-- Botón del menú en móviles -->
        <button @click="toggleSidebar" class="md:hidden p-2 bg-gray-200 rounded-md m-4 focus:outline-none hover:bg-gray-300 transition">
            <!-- SVG del ícono de menú -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6h16.5" />
            </svg>
        </button>

        <!-- Sidebar -->
        <div :class="['h-full fixed inset-y-0 left-0 p-4 w-64 bg-white shadow-md transition-transform transform', sidebarOpen ? 'translate-x-0' : '-translate-x-full', 'md:relative md:translate-x-0']">
            <!-- Botón de cierre -->
            <button @click="toggleSidebar" class="absolute top-4 right-4 text-gray-700 hover:text-red-500 transition">
                <!-- SVG de la X -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div class="border-b pb-4 mb-4">
                <img src="../assets/logo.png" alt="TerraInfo" class="h-auto w-full" />
            </div>
            <nav class="mt-4">
                <router-link to="/" class="block py-2 px-4 text-gray-700 hover:bg-gray-200"
                    :class="{ 'bg-gray-300 font-bold': $route.name === 'Home' }">
                    Home
                </router-link>
                <router-link to="/vista1" class="block py-2 px-4 text-gray-700 hover:bg-gray-200"
                    :class="{ 'bg-gray-300 font-bold': $route.name === 'Vista1' }">
                    Vista 1
                </router-link>
                <router-link to="/vista2" class="block py-2 px-4 text-gray-700 hover:bg-gray-200"
                    :class="{ 'bg-gray-300 font-bold': $route.name === 'Vista2' }">
                    Vista 2
                </router-link>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// Controla la visibilidad de la barra lateral
const sidebarOpen = ref(false)

// Alterna la visibilidad de la barra lateral
const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
}
</script>

<style scoped>
/* Estilo adicional para el enlace activo */
.router-link-active {
    background-color: #e2e8f0; /* Color de fondo cuando el enlace está activo */
    font-weight: bold; /* Negrita para el enlace activo */
}

/* Transición suave para el sidebar */
.transition-transform {
    transition: transform 0.3s ease-in-out;
}

/* Ocultar el sidebar en pantallas pequeñas (móviles) */
@media (max-width: 768px) {
    .sidebar {
        display: none;
    }
}

/* Mostrar el ícono de menú en pantallas pequeñas */
@media (max-width: 768px) {
    .menu-button {
        display: block;
    }
}

/* Ocultar el ícono de menú en pantallas medianas y grandes */
@media (min-width: 769px) {
    .menu-button {
        display: none;
    }
}
</style>
