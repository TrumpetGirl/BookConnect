<script setup>
import { ref, onMounted } from 'vue';
import { useAuthorStore, useFileStore } from '@/stores';
import { storeToRefs } from 'pinia';

const search = ref('');
const headers = ref([
  { title: 'Nombre', value: 'name' },
  { title: 'Fecha de Nacimiento', value: 'birth_date' },
  { title: 'Nacionalidad', value: 'nationality' },
  { title: 'Imagen', value: 'image_path' },
  { title: 'Acciones', value: 'actions', sortable: false }
]);
  const authorStore = useAuthorStore();
  const { authors } = storeToRefs(authorStore);

  const confirmDelete = (author) => {
  if (confirm(`¿Estás seguro de que deseas eliminar a ${author.name}?`)) {
    authorStore.deleteAuthor(author.id);
  }
};

  onMounted(async () => {
    await authorStore.getAll();
    authors.value = authors.value.map(author => ({
      ...author,
      birth_date: new Date(author.birth_date).toLocaleDateString(),
      image_path: useFileStore().downloadImage(author.image_path)
    }));
});



// const loadImage = (image_path) => {
//   if (image_path) {
//     return "http://localhost:3000/file/download/" + image_path
//   } else {
//     return ""
//   }
// };
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
          <v-row align="end" class="add-author-row">
          <v-col cols="12" class="text-center">
            <v-btn color="success" @click="addAuthor">
              <v-icon>mdi-plus</v-icon> Añadir Autor
            </v-btn>
          </v-col>
        </v-row>
        </template>
        
        <template v-slot:item.birth_date="{ item }">
          <span>{{ item.birth_date }}</span>
        </template>
        <template v-slot:item.image_path="{ item }">
          <v-img :src="item.image_path" 
          max-height="100" max-width="100">
        </v-img>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn icon @click="() => {}">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="confirmDelete(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <style scoped>
  .elevation-1 {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  </style>
  