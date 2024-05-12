<script setup>
import { ref } from 'vue';

const results = ref([]);

// Método para seleccionar un resultado
const selectResult = (result) => {
  // Aquí puedes definir la lógica para manejar la selección del resultado
};
</script>

<template>
    <div class="result-list">
      <v-list>
        <v-list-item
          v-for="(result, index) in results"
          :key="index"
          @click="selectResult(result)"
        >
          <!-- Aquí puedes mostrar los detalles del resultado, por ejemplo el nombre -->
          <v-list-item-title>{{ result.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </template>
  
  <style scoped>
  .result-list {
    width: 50%; /* Ocupa la mitad del ancho de la página */
    margin: 20px auto; /* Centra horizontalmente y agrega un poco de margen superior e inferior */
  }
  </style>
  