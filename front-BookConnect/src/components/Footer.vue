<script setup>
  import { ref } from 'vue';

  const icons = ref([
    'mdi-facebook',
    'mdi-twitter',
    'mdi-linkedin',
    'mdi-instagram',
  ]);
</script>

<template>
      <div class="bg-teal d-flex w-100 align-center px-4">
        <strong>No dejes de visitarnos en nuestras redes sociales</strong>
  
        <v-spacer></v-spacer>
  
        <v-btn
          v-for="icon in icons"
          :key="icon"
          :icon="icon"
          class="mx-4"
          size="small"
          variant="plain"
        ></v-btn>
      </div>
  
      <div class="px-4 py-2 bg-black text-center w-100">
        {{ new Date().getFullYear() }} — <strong>BookConnect</strong>
      </div>
  </template>