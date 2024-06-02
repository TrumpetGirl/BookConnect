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

  let imageDeleted = false;
  let imageChange = false;
  const image = ref(null);
  const imageUrl = ref(null);

  onMounted(async () => {
    await genreStore.getAll();
    await authorStore.getAuthorNames();
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      image.value = file
      imageChange = true;
      readFile(file)
      imageDeleted = true
    }
  };

  const readFile = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      imageUrl.value = e.target.result
    };
    reader.readAsDataURL(file)
  }

  const handleFileClear = () => {
    image.value = null
    imageUrl.value = null
    imageDeleted = true
  };

  if (id) {
    title = 'Editar libro';
    onMounted(async () => {
      await bookStore.getById(id);
      if (book.value.image_path) {
        imageUrl.value = fileStore.downloadImage(book.value.image_path)
        image.value = await fileStore.urlToFile(imageUrl.value, imageUrl.value.split("/").pop())
      }
    }) 
  } else {
    book.value = {}
  }
  
  const handleSubmit = async () => {
    
    let response;
    console.log(imageChange)
    try {
      if (!image || !book.value.title || !book.value.isbn || !book.value.publicationYear || 
        !book.value.synopsis || !book.value.genreId || !book.value.authorId) {
          snackbarStore.error('Todos los campos son obligatorios')
        return;
      }
      if (book.value.publicationYear > constants.todayYear) {
        snackbarStore.error(`El año de publicación no puede ser mayor que el año actual (${constants.todayYear})`);
        return;
      }
      const formData = new FormData();
   
      book.value.imageExtension = image.value.name ? image.value.name.split(".").pop() : null
      book.value.imageChange = imageChange
      console.log('1')
      if (imageChange && book.value.image_path) {
        console.log('entro 1')
        await fileStore.deleteImage(book.value.image_path);
      }
      console.log('2')
      if (id) {
        console.log('entro 2')
        response = await bookStore.update(id, book.value);
      } else {
        response = await bookStore.create(book.value);
      }
      console.log('3')
      if (imageChange && image.value && response && response.book.image_path) {
        console.log('entro 3')
        formData.append('path', response.book.image_path)
        formData.append('file', image.value)
        await fileStore.uploadImage(formData)
      }
      snackbarStore.success(response.message);

      if(id) {
        navigation.redirectTo('/book')
      } else {
        cleanForm()
      }
    } catch (error) {
      console.error('Error:', error);
      if (id) {
        snackbarStore.error('Error al editar libro');
      } else {
        snackbarStore.error('Error al agregar libro');
      }
      
    }
  };

  const cleanForm = () => {
    book.value = {};
    image.value = null;
    imageUrl.value = null;
    imageDeleted = false;
    imageChange = false;
  };
</script>

<template>
  <div class="container mt-5">
    <fieldset class="register-fieldset">
      <legend>{{ title }}</legend>
      <v-form @submit.prevent="handleSubmit" class="register-form">
        <v-file-input
        v-model="image"
        prepend-icon="mdi-camera" 
        label="Portada (Requerido)" 
        @change="handleFileChange"
        @click:clear="handleFileClear"
        show-size
        accept="image/*">
        </v-file-input>
        
        <div v-if="imageUrl" class="image-preview">
          <v-img :src="imageUrl" :max-width=125 alt="Vista previa de la imagen" />
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
        <v-btn @click="navigation.redirectTo('/book')" color="#b0bec5" class="ma-2" prepend-icon="mdi-arrow-left">
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

  .image-preview {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .image-preview img {
    max-width: 125px;
    text-align: center;
    height: auto;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
</style>
