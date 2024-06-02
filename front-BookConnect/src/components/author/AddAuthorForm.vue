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

const image = ref(null);
const imageUrl = ref(null);
let imageDeleted = false;
let imageChange = false;

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
    imageChange = true;
  };

  if (id) {
    title = 'Editar autor';
    onMounted(async ()=>{
      await authorStore.getById(id);
      if (author.value.birth_date) {
        author.value.birth_date = constant.formatDateToFormInput(new Date(author.value.birth_date));
      }
      if (author.value.image_path) {
        imageUrl.value = fileStore.downloadImage(author.value.image_path)
        image.value = await fileStore.urlToFile(imageUrl.value, imageUrl.value.split("/").pop())
      }
    }) 
  } else {
    author.value = {}
    author.value.birth_date = constant.formatDateToFormInput(new Date())
  }

const handleSubmit = async () => {
  let response
  try {
    if ( !author.value.name || !author.value.birth_date || !author.value.nationality ) {
        snackbarStore.error('Todos los campos, salvo la imagen, son obligatorios')
        return;
    }
    const formData = new FormData()
    author.value.imageExtension = image.value ? image.value.name.split(".").pop() : null
    author.value.imageChange = imageChange
    if (imageChange && author.value.image_path) {
        await fileStore.deleteImage(author.value.image_path);
      }
    if(id) {
      response = await authorStore.update(id, author.value)
    } else {
      response = await authorStore.create(author.value)
    }
    if (imageChange && image && response && response.author.image_path) {
        formData.append('path', response.author.image_path)
        formData.append('file', image.value)
        await fileStore.uploadImage(formData)
    }
    snackbarStore.success(response.message);
    if(id) {
      navigation.redirectTo('/author')
    } else {
      cleanForm()
    }
  } catch (error) {
    if (id)  snackbarStore.error('Error al editar autor');
    else  snackbarStore.error('Error al agregar autor');
  }
};

const cleanForm = () => {
  author.value = {};
  author.value.birth_date = constant.formatDateToFormInput(new Date());
  image.value = null;
  imageUrl.value = null;
  imageChange = false;
  imageDeleted = false;
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

          <v-file-input
            v-model="image"
            prepend-icon="mdi-camera" 
            label="Imagen (Opcional)" 
            @change="handleFileChange"
            @click:clear="handleFileClear"
            show-size
            accept="image/*">
          </v-file-input>
        
          <div v-if="imageUrl" class="image-preview">
            <v-img :src="imageUrl" :max-width=125 alt="Vista previa de la imagen" />
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

.image-preview {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
</style>
