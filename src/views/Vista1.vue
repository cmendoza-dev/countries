<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <div class="flex-1 overflow-auto p-6">
      <p>Hola! Esta es la Vista 1</p>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";
</script>