<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useBookStore } from '@/stores/book.store';
import { useFileStore } from '@/stores/file.store';

const bookStore = useBookStore();
const fileStore = useFileStore();
const route = useRoute();
const { author } = storeToRefs(authorStore);
const imageUrl = ref(null);

onMounted(async () => {
  const { id } = route.params;
  try {
    await bookStore.getById(id);
    book.value = bookStore.book;

    if (book.value.image_path) {
      imageUrl.value = fileStore.downloadImage(book.value.image_path);
    }
  } catch (error) {
    console.error('Error al cargar el libro:', error);
  }
});

const rating = computed(() => book.value ? book.value.rating : null);

const addToCollection = () => {
  // Implementación de addToCollection
};

const addToList = () => {
  // Implementación de addToList
};
</script>

<template>
    <div v-if="book">
      <v-card class="book-card mt-5" outlined>
        <v-img :src="book.coverImageUrl" aspect-ratio="3/4"></v-img>
        
        <v-card-title>{{ book.title }}</v-card-title>
        
        <v-card-text>
          <div><strong>Autor:</strong> {{ book.author }}</div>
          <div><strong>Año de Publicación:</strong> {{ book.publicationYear }}</div>
          <div><strong>Género:</strong> {{ book.genre }}</div>
          
          <div><strong>Puntuación:</strong></div>
          <v-rating v-model="rating" disabled color="pink"></v-rating>
          
          <div><strong>Sinopsis:</strong></div>
          <div>{{ book.synopsis }}</div>
        </v-card-text>
        
        <v-card-actions>
          <v-btn class="collection-btn" color="white" @click="addToCollection">
            <v-icon style="margin-right:10px;">mdi-book-plus</v-icon> Añadir a mi colección
          </v-btn>
          <v-btn class="list-btn" color="white" @click="addToList">
            <v-icon style="margin-right:10px;">mdi-format-list-bulleted</v-icon> Añadir a una lista
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
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
  