<script setup>
import { ref, watch, onMounted } from 'vue';
import { createBook } from '../services/bookService.js';
import { fetchAuthors } from '../services/authorService.js';
import { fetchGenres } from '../services/genreService.js';
import { useDate } from 'vuetify';
import { uploadImage } from '../services/fileService.js'

const adapter = useDate();

const book = ref({
  title: '',
  isbn: '',
  publication_year: new Date().getFullYear(),
  author: '',
  genre: '',
  synopsis: '',
  imageExtension: ''
});

const authors = ref([]);
const genres = ref([]);

let image = ref(new File([""], "filename"));
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    image.value = file;
  }
};

const handleSubmit = async () => {
  try {
    const formData = new FormData();
    book.value.imageExtension = image.value.name.split('.').pop();

    const response = await createBook(book.value);
    if (response && response.image_path) {
      formData.append('path', response.image_path);
      formData.append('file', image.value);
      await uploadImage(formData);
    }
    cleanForm();
  } catch (error) {
    console.error('Error al agregar libro:', error);
  }
};

const cleanForm = () => {
  book.value.title = '';
  book.value.isbn = '';
  book.value.publication_year = new Date().getFullYear();
  book.value.author = '';
  book.value.genre = '';
  book.value.synopsis = '';
  image.value = new File([""], "filename");
};

const fetchInitialData = async () => {
  try {
    authors.value = await fetchAuthors();
    genres.value = await fetchGenres();
  } catch (error) {
    console.error('Error al obtener datos iniciales:', error);
  }
};

onMounted(fetchInitialData);

</script>

<template>
  <div class="container">
    <div class="left-pane">
      <fieldset class="register-fieldset">
        <legend>Añadir Libro</legend>
        <v-form @submit.prevent="handleSubmit" class="register-form">
          <v-text-field v-model="book.title" label="Título" required></v-text-field>
          <v-text-field v-model="book.isbn" label="ISBN" required></v-text-field>
          <v-text-field v-model="book.publication_year" label="Año de Publicación" required></v-text-field>
          <v-autocomplete
            v-model="book.author"
            :items="authors"
            item-text="name"
            item-value="id"
            label="Autor"
            required
          ></v-autocomplete>
          <v-select
            v-model="book.genre"
            :items="genres"
            item-text="name"
            item-value="id"
            label="Género"
            required
          ></v-select>
          <v-textarea v-model="book.synopsis" label="Sinopsis" required></v-textarea>
          <input type="file" @change="handleFileChange" required />
          <v-row>
            <v-col cols="6">
              <v-btn color="#d3d3d3" @click="cleanForm" block>Cancelar</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn type="submit" color="#ff7eb9" block>Enviar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </fieldset>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.left-pane {
  width: 80%;
  max-width: 500px;
  margin-top: 100px;
}

.register-fieldset {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

legend {
  color: #ff7eb9;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
}

p {
  text-align: center;
  margin-top: 15px;
}
</style>
