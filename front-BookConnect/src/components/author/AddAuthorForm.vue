<script setup>
import { ref, watch } from 'vue';
import { useAuthStore, useFileStore } from '@/stores';
import { useDate } from 'vuetify';

const adapter = useDate();

const author = ref({
  name: '',
  birth_date: new Date(),
  nationality: ''
});

const fNac = ref(new Date());

watch(fNac, (newVal) => {
  if (newVal) {
    author.value.birth_date = adapter.toISO(newVal);
  }
});

let image = ref(new File([""], "filename"))
const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    image = file
  }
};

const handleSubmit = async () => {
  try {
    const formData = new FormData()
    author.value.imageExtension = image.name.split(".").pop()

    const response = await useAuthStore.create(author.value)
    if (response && response.image_path) {
      formData.append('path', response.image_path)
      formData.append('file', image)
      await useFileStore.uploadImage(formData)
    }
    cleanForm()
  } catch (error) {
    console.error('Error al agregar autor:', error);
  }
};

const cleanForm = () => {
  author.value.name = ''
  author.value.birth_date = new Date()
  fNac.value = new Date()
  image.value = ref(new File([""], "filename"))
  author.value.nationality = ''
  author.value.image = null
};
</script>

<template>
  <div class="container">
    <div class="left-pane">
      <fieldset class="register-fieldset">
        <legend>Añadir Autor</legend>
        <v-form @submit.prevent="handleSubmit" class="register-form">
          <v-text-field 
          v-model="author.name" 
          label="Nombre" 
          required>
        </v-text-field>

          <v-date-picker 
          v-model="fNac" 
          label="Fecha de Nacimiento" 
          required>
        </v-date-picker>
          
          <v-text-field v-model="author.nationality" label="Nacionalidad" required></v-text-field>
          <input type="file" @change="handleFileChange" required />
          <v-row>
            <v-col cols="6">
              <v-btn color="#d3d3d3" @click="cancel" block>Cancelar</v-btn>
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
