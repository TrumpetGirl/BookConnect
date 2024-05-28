<script setup>
  import * as constant from '../../utils/constants';
  import { useRoute, useRouter } from 'vue-router';
  import { ref, watch, computed, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';

  import { useAuthorStore, useFileStore, useSnackbarStore, useBookStore, useAuthStore, useGenreStore } from '@/stores';

 const route = useRoute();
 const router = useRouter();
 const authorStore = useAuthorStore();
 const fileStore = useFileStore();
 const snackbarStore = useSnackbarStore();
 const bookStore = useBookStore();
 const authStore = useAuthStore();
 const genreStore = useGenreStore();

  const id = route.params.id;
  const { book } = storeToRefs(bookStore);

  let title = 'Añadir libro';
  const { genreNames } = storeToRefs(genreStore);
  let authors = [];
  let selectedGenre = null;
  let selectedAuthor = null;

  if (id) {
      title = 'Editar libro';
      onMounted(async () => {
        await bookStore.getById(id);
        selectedAuthor = book.author.id;
      }) 
  }

  const filteredAuthors = computed(() => {
    return authors.filter(author => author.id === selectedAuthor);
  });

  watch(selectedAuthor, () => {
    book.author = selectedAuthor ? authors.find(author => author.id === selectedAuthor) : null;
  });

  onMounted(async () => {
    await genreStore.getAllGenresSelector();
    authors = await authorStore.getAll();
    console.log(genreNames)
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      book.cover = file;
    }
  };

  const handleSubmit = async () => {
    try {
      let response;
      book.genre = selectedGenre;
      if (id) {
        response = await bookStore.update(id, book);
      } else {
        response = await bookStore.create(book);
      }

      if (response.success && book.cover) {
        const formData = new FormData();
        formData.append('file', book.cover);
        formData.append('path', response.book.cover_path);
        await fileStore.uploadImage(formData);
      }

      snackbarStore.success(response.message);
      cleanForm();
    } catch (error) {
      console.error('Error al agregar libro:', error);
      snackbarStore.error('Error al agregar libro');
    }
  };

  const cleanForm = () => {
    book.value = {};
    selectedAuthor = null;
  };
</script>

<template>
  <div class="container">
    <fieldset class="register-fieldset">
      <legend>{{ title }}</legend>
      <v-form @submit.prevent="handleSubmit" class="register-form">

        <p>Portada: <input type="file" @change="handleFileChange" class="mb-5" accept="image/*"/></p>
        
        <v-text-field 
        v-model="book.title" 
        label="Título" 
        required>
        </v-text-field>

        <v-text-field 
        v-model="book.isbn" 
        label="ISBN" 
        required>
        </v-text-field>

        <v-text-field 
        v-model="book.year" 
        label="Año de publicación" 
        type="number" 
        required>
        </v-text-field>

        <v-textarea 
        v-model="book.synopsis" 
        label="Sinopsis" 
        required>
        </v-textarea>

        <v-select 
        v-model="selectedGenre" 
        :items="genreNames"
        item-title="description"
        item-value="id" 
        label="Género" 
        required>
        </v-select>

        <v-autocomplete 
        v-model="selectedAuthor" 
        :items="filteredAuthors" 
        label="Autor" 
        item-text="name" 
        item-value="id" 
        @change="selectAuthor">
        </v-autocomplete>

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
    <v-row>
      <v-col class="d-flex justify-end" cols="12" v-if="authStore.isAdmin()">
        <v-btn @click="() => router.push('/book')" color="#b0bec5" class="ma-2" prepend-icon="mdi-arrow-left">
          Volver al listado
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>



<style scoped>
.container {
  width: 80%;
  max-width: 500px;
  margin-top: 50px;
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
