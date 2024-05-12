<script setup>
import { ref } from 'vue';

const searchQuery = ref('');

const search = () => {
  // Aquí puedes realizar la petición HTTP a tu API
  // Puedes usar axios o fetch para realizar la solicitud al backend
  // Por ejemplo:
  // axios.get(`http://tu-api.com/buscar?q=${searchQuery.value}`)
  //   .then(response => {
  //     // Manejar la respuesta del servidor
  //   })
  //   .catch(error => {
  //     console.error('Error al realizar la búsqueda:', error);
  //   });
};
</script>

<template>
  BUENASSSSS
  <v-app-bar app color="primary">
    <v-container>
      <v-row>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="searchQuery"
            label="Buscar libro, autor o usuario"
            outlined
            dense
            solo-inverted
            hide-details
            append-icon="mdi-magnify"
            @keydown.enter="search"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-btn
            color="primary"
            dark
            block
            @click="search"
          >
            Buscar
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<style scoped>
/* Estilos personalizados para tu barra de búsqueda */
</style>
