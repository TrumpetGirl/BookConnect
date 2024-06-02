<script setup>
import * as constant from '../../utils/constants';
import * as navigation from '../../utils/navigation';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthorStore, useFileStore, useSnackbarStore, useAuthStore  } from '@/stores';

const route = useRoute();
const authorStore = useAuthorStore();
const fileStore = useFileStore();
const snackbarStore = useSnackbarStore();
const authStore = useAuthStore();

let title = 'Añadir autor';

const id = route.params.id;
const { author } = storeToRefs(authorStore);

let image = ref(new File([""], "filename"))
const imagePreview = ref(null);
const fileInputRef = ref(null); 
const imageDeleted = ref(false);

const handleFileChange = (event) => {
  const file = event.target.files[0]
  console.log(event)
  if (file) {
    image = file
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
    imageDeleted.value = false; 
  }
};

const deleteImage = () => {
  imagePreview.value = null;
  image.value = new File([""], "filename");
  imageDeleted.value = true; 
};

if (id) {
    title = 'Editar autor';
    onMounted(async ()=>{
      await authorStore.getById(id);
      if (author.value.birth_date) {
        author.value.birth_date = constant.formatDateToFormInput(new Date(author.value.birth_date));
      }
      if (author.value.image_path) {
        imagePreview.value = fileStore.downloadImage(author.value.image_path);
      }
    }) 
} else {
  author.value = {}
  author.value.birth_date = constant.formatDateToFormInput(new Date())
}

const handleSubmit = async () => {
  let response
  try {
    const formData = new FormData()
    author.value.imageExtension = image.name ? image.name.split(".").pop() : null
    if(id) {
      response = await authorStore.update(id, author.value)
    } else {
      response = await authorStore.create(author.value)
    }
    if (image && response && response.author.image_path) {
        formData.append('path', response.author.image_path)
        formData.append('file', image)
        await fileStore.uploadImage(formData)
    } else if (imageDeleted.value && response.author.image_path) {
      await fileStore.deleteImage(response.author.image_path);
    }

    snackbarStore.success(response.message);

    if(id) {
      navigation.redirectTo('/author')
    } else {
      cleanForm()
    }
    
  } catch (error) {
    console.error('Error al agregar autor:', error);
    snackbarStore.error('Error al agregar el autor');
  }
};

const cleanForm = () => {
  author.value = {}
  author.value.birth_date = constant.formatDateToFormInput(new Date())
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
        <legend>{{ title}}</legend>
        <v-form @submit.prevent="handleSubmit" class="register-form">
          <v-text-field 
          v-model="author.name" 
          label="Nombre" 
          required>
        </v-text-field>

        <v-text-field
          v-model="author.birth_date"
          label="Fecha de Nacimiento"
          type="date"
        ></v-text-field> 
          
          <v-text-field 
          v-model="author.nationality" 
          label="Nacionalidad (País)">
          </v-text-field>

          <input type="file" @change="handleFileChange" ref="fileInputRef"class="mb-5" accept="image/*"/>

          <div class="image-container" v-if="imagePreview">
            <v-img :src="imagePreview" max-width="200" max-height="200" class="mb-5"/>
            <v-btn @click="deleteImage" color="error" class="ml-2 mb-5">Borrar imagen</v-btn>
          </div>

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
            <v-btn @click="navigation.redirectTo('/author')" color="#b0bec5" class="ma-2" prepend-icon="mdi-arrow-left">
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

.image-container .v-btn {
  margin-left: 16px; 
}
</style>
