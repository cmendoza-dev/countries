<template>
    <!-- Sidebar -->
    <div class="p-4 w-64 bg-white shadow-md">
        <div class="border-b">
            <img src="../assets/logo.png" alt="TerraInfo" class="h-auto w-full mb-4" />
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
</template>

<script setup>
</script>

<style scoped>
/* Estilo adicional para el enlace activo */
.router-link-active {
  background-color: #e2e8f0; /* Color de fondo cuando el enlace está activo */
  font-weight: bold; /* Negrita para el enlace activo */
}
</style>