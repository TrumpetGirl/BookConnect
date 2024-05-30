<script setup>
  import * as constant from '../../utils/constants';
  import { useRoute, useRouter } from 'vue-router';
  import { computed, onMounted } from 'vue';
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
  const { genres } = storeToRefs(genreStore);
  let authors = [];
  let selectedAuthor = null;

  let image = ref(new File([""], "filename"))
  const imagePreview = ref(null);
  const fileInputRef = ref(null); 
  const imageDeleted = ref(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      image = file;
      const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  };

  const deleteImage = () => {
  imagePreview.value = null;
  image.value = new File([""], "filename");
  imageDeleted.value = true; 
};

  if (id) {
      title = 'Editar libro';
      onMounted(async () => {
        await bookStore.getById(id);
        selectedAuthor = book.author.id;
        if (book.value.image_path) {
        imagePreview.value = fileStore.downloadImage(book.value.image_path);
      }
      }) 
    } else {
  book.value = {}
}

  onMounted(async () => {
    await genreStore.getAllGenresSelector();
  });

  const handleSubmit = async () => {
    try {
      let response;
      if (id) {
        response = await bookStore.update(id, book.value);
      } else {
        response = await bookStore.create(book.value);
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
  <div class="container mt-5">
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
        min="0"
        :max="constant.todayYear" 
        required>
        </v-text-field>

        <v-textarea 
        v-model="book.synopsis" 
        label="Sinopsis" 
        required>
        </v-textarea>

        <v-select 
        v-model="book.genre" 
        :items="genres"
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
