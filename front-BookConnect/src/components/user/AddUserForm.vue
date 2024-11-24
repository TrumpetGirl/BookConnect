<script setup>
import * as constant from '@/utils/constants';
import * as navigation from '../../utils/navigation';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore, useFileStore, useSnackbarStore, useAuthStore, useRoleStore  } from '@/stores';

const route = useRoute();
const userStore = useUserStore();
const fileStore = useFileStore();
const snackbarStore = useSnackbarStore();
const authStore = useAuthStore();
const roleStore = useRoleStore();

const id = route.params.id;
const { user } = storeToRefs(userStore);
const { roles } = storeToRefs(roleStore);

let usernameError = false;
let usernameMessage = '';

let title = 'Añadir usuario';

let imageDeleted = false;
let imageChange = false;
const image = ref(null);
const imageUrl = ref(null);


onMounted(async () => {
    await roleStore.getAll();
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
    title = 'Editar usuario';
    onMounted(async ()=>{
      await userStore.getById(id);
      if (user.value.birth_date) {
        user.value.birth_date = constant.formatDateToFormInput(new Date(user.value.birth_date));
      }
      if (user.value.image_path) {
        imageUrl.value = fileStore.downloadImage(user.value.image_path)
        image.value = await fileStore.urlToFile(imageUrl.value, imageUrl.value.split("/").pop())
      }
    }) 
} else {
  user.value = {}
  user.value.birth_date = constant.formatDateToFormInput(new Date())
}

const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  return age;
};

const handleSubmit = async () => {

  let response
  try {
    if (!user.value.username || !user.value.birth_date || !user.value.email ) {
        snackbarStore.error('Todos los campos son obligatorios')
      return;
    }

    const age = calculateAge(user.value.birth_date);
      if (age < 5) {
        snackbarStore.error('Revise su fecha de nacimiento');
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(user.value.email)) {
      snackbarStore.error('Correo electrónico no válido')
      return;
    }

    const formData = new FormData()
    user.value.imageExtension = image.value.name ? image.value.name.split(".").pop() : null
    user.value.imageChange = imageChange
    if (imageChange && user.value.image_path) {
      await fileStore.deleteImage(user.value.image_path);
    }
    if(id) {
      response = await userStore.update(id, user.value)
    } else {
      response = await userStore.create(user.value)
      //snackbarStore.success(response.message);
      //cleanForm()
    }
    if (imageChange && image.value && response && response.user.image_path) {
        formData.append('path', response.user.image_path)
        formData.append('file', image.value)
        await fileStore.uploadImage(formData)
    }

    snackbarStore.success(response.message);

    if(id) {
      navigation.redirectTo('/user')
    } else {
      cleanForm()
    }

  } catch (error) {
    if (id) {
        snackbarStore.error('Error al editar usuario');
    } else {
      snackbarStore.error('Error al agregar usuario');
    }
}
};

const cleanForm = () => {
  user.value = {}
  user.value.birth_date = constant.formatDateToFormInput(new Date())
  confirmPassword.value = ''
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
        <v-form @submit.prevent="handleSubmit" ref="form" class="register-form">
          <v-text-field 
          v-model="user.username" 
          label="Nombre de usuario" 
          required
          :error="usernameError"
          @input="checkUsernameAvailability">
        </v-text-field>
        <p v-if="usernameMessage">{{ usernameMessage }}</p>

        <v-text-field 
          v-model="user.email" 
          label="Correo electrónico" 
          required>
        </v-text-field>

        <v-text-field
          v-model="user.birth_date"
          label="Fecha de Nacimiento"
          type="date"
        ></v-text-field>
 
          <v-select 
          v-model="user.roleId" 
          :items="roles"
          item-title="type"
          item-value="id" 
          label="Rol" 
          required>
        </v-select>

        <v-file-input
          v-model="image"
          prepend-icon="mdi-camera" 
          label="Imagen de perfil" 
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
        <v-col class="d-flex justify-end" cols="12" v-if="authStore.isAdmin">
            <v-btn @click="navigation.redirectTo('/user')" color="#b0bec5" class="ma-2" prepend-icon="mdi-arrow-left">
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
