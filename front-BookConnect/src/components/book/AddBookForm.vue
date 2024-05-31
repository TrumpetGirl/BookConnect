<script setup>
   import * as constants from '../../utils/constants';
   import * as navigation from '../../utils/navigation';
   import { useRoute } from 'vue-router';
   import { ref, onMounted } from 'vue';
   import { storeToRefs } from 'pinia';
   import { useFileStore, useAuthorStore, useSnackbarStore, useBookStore, useAuthStore, useGenreStore } from '@/stores';

  const route = useRoute();
  const authorStore = useAuthorStore();
  const fileStore = useFileStore();
  const snackbarStore = useSnackbarStore();
  const bookStore = useBookStore();
  const authStore = useAuthStore();
  const genreStore = useGenreStore();

  const id = route.params.id;
  const { book } = storeToRefs(bookStore);
  const { genres } = storeToRefs(genreStore);
  const { authors } = storeToRefs(authorStore);

  let title = 'Añadir libro';

  let image = ref(new File([""], "filename"))
  const imagePreview = ref(null);
  const fileInputRef = ref(null); 
  const imageDeleted = ref(false);

  onMounted(async () => {
    await genreStore.getAll();
    await authorStore.getAuthorNames();
  });

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
      if (book.value.image_path) {
        imagePreview.value = fileStore.downloadImage(book.value.image_path);
      }
    }) 
  } else {
    book.value = {}
  }

  const handleSubmit = async () => {
    let response;
    try {
      const formData = new FormData();
      book.value.imageExtension = image.name ? image.name.split(".").pop() : null
      if (id) {
        response = await bookStore.update(id, book.value);
      } else {
        response = await bookStore.create(book.value);
      }
      console.log(response.success)
      if (image && response && response.book.image_path) {
        formData.append('path', response.book.image_path);
        formData.append('file', image);
        await fileStore.uploadImage(formData);
      } else if (imageDeleted.value && response.book.image_path) {
        await fileStore.deleteImage(response.book.image_path);
      }

    snackbarStore.success(response.message);

      if(id) {
        navigation.redirectTo('/book')
      } else {
        cleanForm()
      }
    } catch (error) {
      console.error('Error al agregar libro:', error);
      snackbarStore.error('Error al agregar libro');
    }
  };

  const cleanForm = () => {
    book.value = {};
    image = new File([""], "filename")
    imagePreview.value = null;
    imageDeleted.value = false;
  if (fileInputRef.value) {
    fileInputRef.value.value = null; 
  } 
  };
</script>

<template>
  <div class="container mt-5">
    <fieldset class="register-fieldset">
      <legend>{{ title }}</legend>
      <v-form @submit.prevent="handleSubmit" class="register-form">

        <p>Portada: <input type="file" @change="handleFileChange" class="mb-5" accept="image/*" ref="fileInputRef"/></p>

        <div class="image-container" v-if="imagePreview">
          <v-img :src="imagePreview" max-width="200" max-height="200" class="mb-5"/>
          <v-btn @click="deleteImage" color="error" class="ml-2 mb-5">Borrar imagen</v-btn>
        </div>

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
        v-model="book.publicationYear" 
        label="Año de publicación" 
        type="number"
        min="0"
        :max="constants.todayYear" 
        required>
        </v-text-field>

        <v-textarea 
        v-model="book.synopsis" 
        label="Sinopsis" 
        required>
        </v-textarea>

        <v-select 
        v-model="book.genreId" 
        :items="genres"
        item-title="name"
        item-value="id" 
        label="Género" 
        required>
        </v-select>

        <v-autocomplete 
        v-model="book.authorId" 
        :items="authors" 
        label="Autor" 
        item-title="description" 
        item-value="id" >
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
        <v-btn @click="() => navigation.redirectTo('/book')" color="#b0bec5" class="ma-2" prepend-icon="mdi-arrow-left">
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
