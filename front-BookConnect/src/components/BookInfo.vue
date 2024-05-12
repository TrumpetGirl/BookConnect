<script setup>
import { loadGenres } from '../services/genreService';
import { ref, onMounted, computed } from 'vue';

onMounted(() => {
  loadGenres();
});

const book = ref({
  coverImageUrl: 'url_de_la_imagen.jpg',
  title: 'Título del libro',
  author: 'Nombre del autor',
  publicationYear: 2022,
  genre: 'Género del libro',
  rating: 4, // Puntuación del libro (debería ser un valor entre 0 y 5)
  synopsis: 'Sinopsis del libro...'
});

// Calcula el valor de la puntuación como un valor decimal para el componente de rating
const rating = computed(() => book.value.rating);

// Función para añadir a la colección
const addToCollection = () => {
  // Lógica para añadir a la colección
};

// Función para añadir a la lista
const addToList = () => {
  // Lógica para añadir a la lista
};
</script>

<template>
    <v-card class="book-card" outlined>
      <!-- Portada del libro -->
      <v-img :src="book.coverImageUrl" aspect-ratio="3/4"></v-img>
      
      <v-card-title>{{ book.title }}</v-card-title>
      
      <!-- Información del libro -->
      <v-card-text>
        <div><strong>Autor:</strong> {{ book.author }}</div>
        <div><strong>Año de Publicación:</strong> {{ book.publicationYear }}</div>
        <div><strong>Género:</strong> {{ book.genre }}</div>
        
        <!-- Estrellas de puntuación -->
        <div><strong>Puntuación:</strong></div>
        <v-rating v-model="rating" disabled color="pink"></v-rating>
        
        <!-- Sinopsis -->
        <div><strong>Sinopsis:</strong></div>
        <div>{{ book.synopsis }}</div>
      </v-card-text>
      
      <!-- Botones -->
      <v-card-actions>
        <v-btn class="collection-btn" color="white" @click="addToCollection">
        <v-icon style="margin-right:10px;">mdi-book-plus</v-icon> Añadir a mi colección
      </v-btn>
      <v-btn class="list-btn" color="white" @click="addToList">
        <v-icon style="margin-right:10px;">mdi-format-list-bulleted</v-icon> Añadir a una lista
      </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <style scoped>
  .book-card {
    width:max-content;
    margin: auto;
    padding: 20px;
  }
  
  .collection-btn, .list-btn {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px 16px;
  }
  
  .collection-btn, .list-btn {
    background-color: rgb(255, 163, 179);
  }
  
  
  </style>
  