<script setup>
import axios from 'axios';

const books = ref([]);
const error = ref(null);
const headers = [
  { text: 'Título', value: 'title' },
  { text: 'Autor', value: 'author.name' },
  { text: 'Año de Publicación', value: 'publication_year' },
  { text: 'ISBN', value: 'isbn' },
];

const fetchBooks = () => {
  axios.get('http://localhost:3000/books')
    .then(response => {
      books.value = response.data;
    })
    .catch(error => {
      console.error('Hubo un error al obtener los libros:', error);
      error.value = 'Error al obtener los libros. Por favor, intenta de nuevo más tarde.';
    });
};

onMounted(fetchBooks);
</script>

<template>
  <div>
    <h2>Mi colección</h2>
    <v-card>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="books"
          :items-per-page-text="'Libros por página'"
          :items-per-page="15"
          class="custom-table"
          dense
          hide-default-footer
        >
          <template v-slot:items="props">
            <tr>
              <td>{{ props.item.title }}</td>
              <td>{{ props.item.author.name }}</td>
              <td>{{ props.item.publication_year }}</td>
              <td>{{ props.item.isbn }}</td>
            </tr>
          </template>
          <template v-slot:headers>
            <tr class="header-row">
              <th>Título</th>
              <th>Autor</th>
              <th>Año de Publicación</th>
              <th>ISBN</th>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.custom-table {
  background-color:  #eceff1;
  border-radius: 5px; 
}

.header-row {
  background-color: #f8bbd0; 
}
</style>
