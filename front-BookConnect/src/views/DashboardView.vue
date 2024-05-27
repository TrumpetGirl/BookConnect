<script setup>
  // import { ref } from 'vue';

  //   const headers = [
  //     { text: 'Categoría', value: 'category' },
  //     { text: 'Cantidad', value: 'count' }
  //   ];

  //   const stats = ref([
  //     { category: 'Usuarios Registrados', count: 1000 }, // Cambiar los valores por los reales
  //     { category: 'Libros', count: 500 }, // Cambiar los valores por los reales
  //     { category: 'Autores', count: 200 } // Cambiar los valores por los reales
  //   ]);

  //   return { headers, stats };
</script>

<template>
  <div>
    <!-- Título del Dashboard -->
    <v-card-title class="headline">
      Dashboard
    </v-card-title>

    <!-- Tabla de estadísticas -->
    <v-card>
      <v-card-title>
        Estadísticas
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="stats"
          hide-actions
          class="elevation-1"
        ></v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>


<style scoped>
.container {
  display: flex;
  flex-direction: column; 
  justify-content: flex-start; 
  align-items: center;
  font-family: "Ubuntu Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 100;
  font-style: normal;
}

.search-container, .results-container {
  margin-top: 20px; /* Agrega un poco de separación entre los contenedores */
  width: 800px;
}
</style>
