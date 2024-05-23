<script setup>
    // import { loadBooksbyAuthorId } from '../services/bookService';
    import { onMounted, onUnmounted, ref } from 'vue';

    // Variables reactivas para los libros por autor
    const booksByAuthor = ref([]);

    // Función para cargar los libros por autor al montar el componente
    onMounted(loadBooksbyAuthorId);

    // Desmonta el componente al finalizar
    onUnmounted(() => {});
</script>

<template>
    <!-- Itera sobre los libros por autor y muestra la información en tarjetas -->
    <v-card class="book-card" outlined v-for="book in booksByAuthor" :key="book.id">
      <!-- Portada del libro -->
      <!-- <v-img :src="book.coverImageUrl" aspect-ratio="3/4"></v-img> -->
      
      <v-card-title>{{ book.title }}</v-card-title>
      
      <!-- Información del libro -->
      <v-card-text>
        <div><strong>Autor:</strong> {{ book.author }}</div>
        <div><strong>Año de Publicación:</strong> {{ book.publicationYear }}</div>
        <div><strong>Género:</strong> {{ book.genre }}</div>
        
        <!-- Estrellas de puntuación -->
        <div><strong>Puntuación:</strong></div>
        <v-rating v-model="book.rating" disabled color="pink"></v-rating>
        
        <!-- Sinopsis -->
        <div><strong>Sinopsis:</strong></div>
        <div>{{ book.synopsis }}</div>
      </v-card-text>
      
    </v-card>
  </template>
  
  <style scoped>
    .book-card {
        width:max-content;
        margin: auto;
        padding: 20px;
    }  
  </style>
  