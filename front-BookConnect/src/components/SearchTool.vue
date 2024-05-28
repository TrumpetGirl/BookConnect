<script setup>
  import { ref, watch } from 'vue';
  import { searchBooksByTitle } from '@/services/bookService';

  const searchQuery = ref('');
  const books = ref([]);
  const filteredBooks = ref([]);

  const searchBooks = async () => {
    if (!searchQuery.value.trim()) {
      filteredBooks.value = [];
      return;
    }

    try {
      books.value = await searchBooksByTitle(searchQuery.value);
      filterBooks();
    } catch (error) {
      console.error('Error al buscar libros:', error);
    }
  };

  const filterBooks = () => {
    filteredBooks.value = books.value.filter(book =>
      book.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  };

  watch(searchQuery, searchBooks);
</script>


<template>
    <div>
      <h2>¿Buscando nuevas lecturas?</h2>
      <div class="search-container">
        <v-text-field
          v-model="searchQuery"
          label="Buscar por título del libro"
          outlined
          dense
          @input="searchBooks"
        ></v-text-field>
      </div>
    </div>

    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-list>
          <v-list-item
            v-for="book in filteredBooks"
            :key="book.id"
          >
            <v-list-item-content>
              <v-list-item-title>{{ book.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ book.author }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="filteredBooks.length === 0">
            <v-list-item-content>
              <v-list-item-title>No se encontraron resultados</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </template>
  
  <style scoped>
  .search-container {
    margin: 0 auto;
    margin-top: 30px;
    max-width: 600px; 
  }
  </style>
  
