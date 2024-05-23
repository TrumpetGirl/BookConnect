<script setup>
import { ref, onMounted } from 'vue';
import { useAuthorStore, useFileStore } from '@/stores';

const search = ref('');
const headers = ref([
  { text: 'Nombre', value: 'name' },
  { text: 'Fecha de Nacimiento', value: 'birth_date' },
  { text: 'Nacionalidad', value: 'nationality' },
  { text: 'Imagen', value: 'image_path' }
]);
const authors = ref([]);

const getAuthors = async () => {
  try {
    const response = await useAuthorStore.getAll();
    authors.value = response.map(author => ({
      ...author,
      birth_date: new Date(author.birth_date),
      image_path: loadImage(author.image_path)
    }));    
  } catch (error) {
    console.error('Error fetching authors:', error);
  }
};

const loadImage = (image_path) => {
  if (image_path) {
    return "http://localhost:3000/file/download/" + image_path
  } else {
    return ""
  }
};

onMounted(() => {
  getAuthors();
});
</script>

<template>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="authors"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Autores</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:item.birth_date="{ item }">
          <span>{{ new Date(item.birth_date).toLocaleDateString() }}</span>
        </template>
        <template v-slot:item.image_path="{ item }">
          <v-img :src="item.image_path" 
          max-height="100" max-width="100"></v-img>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <style scoped>
  .elevation-1 {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  </style>
  