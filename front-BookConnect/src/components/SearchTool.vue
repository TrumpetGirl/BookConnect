<script setup>

</script>

<template>
    <div>
      <h2>¿Buscando nuevas lecturas?</h2>
      <div class="search-container">
        <v-text-field
          v-model="search"
          label="Buscar por título, nombre de autor o nombre de usuario"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
          fullWidth  
        ></v-text-field>
      </div>
    </div>
  </template>
  
  <style scoped>
  .search-container {
    margin: 0 auto; /* Centra horizontalmente */
    margin-top: 30px;
    max-width: 600px; /* Establece un ancho máximo */
  }
  </style>
  
