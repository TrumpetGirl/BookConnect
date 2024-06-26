<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore, useFileStore, useSnackbarStore, useAuthStore } from '@/stores';
import * as constant from '@/utils/constants';
import * as navigation from '@/utils/navigation';

const route = useRoute();
const userStore = useUserStore();
const fileStore = useFileStore();
const snackbarStore = useSnackbarStore();
const authStore = useAuthStore();

const { user } = storeToRefs(userStore);

const confirmPassword = ref('');
const id = route.params.id;

let title = 'Configuración de usuario';

const image = ref(new File([""], "filename"));
const imagePreview = ref(null);
const fileInputRef = ref(null);
const imageDeleted = ref(false);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    image.value = file;
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

onMounted(async () => {
  await userStore.getById(id);
  if (user.value.birth_date) {
    user.value.birth_date = constant.formatDateToFormInput(new Date(user.value.birth_date));
  }
  if (user.value.image_path) {
    imagePreview.value = fileStore.downloadImage(user.value.image_path);
  }
});

const validatePassword = (password) => {
  const hasNumber = /[0-9]/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return password.length >= 10 && hasNumber && hasLetter && hasSpecialChar;
};

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
  try {
    if (!user.value.username || !user.value.birth_date || !user.value.email || !user.value.password || !confirmPassword.value) {
      snackbarStore.error('Todos los campos son obligatorios');
      return;
    }

    const age = calculateAge(user.value.birth_date);
    if (age < 5) {
      snackbarStore.error('Revise su fecha de nacimiento');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(user.value.email)) {
      snackbarStore.error('Correo electrónico no válido');
      return;
    }

    if (confirmPassword.value !== user.value.password) {
      snackbarStore.error('Las contraseñas no coinciden');
      return;
    }

    if (!validatePassword(user.value.password)) {
      snackbarStore.error('La contraseña debe tener al menos 10 caracteres de longitud y, al menos, 1 número, 1 letra y 1 caracter de tipo especial');
      return;
    }

    const formData = new FormData();
    user.value.imageExtension = image.value.name ? image.value.name.split(".").pop() : null;

    const response = await userStore.update(id, user.value);

    if (image.value && response && response.user.image_path) {
      formData.append('path', response.user.image_path);
      formData.append('file', image.value);
      await fileStore.uploadImage(formData);
    }

    snackbarStore.success(response.message);
    await userStore.getAll();
    navigation.redirectTo('/user');
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
  }
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
          ></v-text-field>
          
          <v-text-field 
            v-model="user.email" 
            label="Correo electrónico" 
            required
          ></v-text-field>
  
          <v-text-field
            v-model="user.birth_date"
            label="Fecha de Nacimiento"
            type="date"
            required
          ></v-text-field>
          
          <v-text-field
            v-model="user.password"
            label="Contraseña"
            type="password"
            required
          ></v-text-field>
  
          <v-text-field
            v-model="confirmPassword"
            label="Repite Contraseña"
            type="password"
            required
          ></v-text-field>
  
          <input type="file" @change="handleFileChange" class="mb-5"/>
          <v-img :src="imagePreview" alt="Profile Image Preview" v-if="imagePreview" class="mb-5" max-width="200"/>
  
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
