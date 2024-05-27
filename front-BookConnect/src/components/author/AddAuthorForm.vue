<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthorStore, useFileStore, useSnackbarStore, useAuthStore  } from '@/stores';
// let author = ref({
//   name: '',
//   birth_date: new Date().toLocaleDateString(), 
//   nationality: ''
//  });

const fNac = ref(new Date().toLocaleDateString());

const route = useRoute();
const router = useRouter();
const authorStore = useAuthorStore();
const fileStore = useFileStore();
const snackbarStore = useSnackbarStore();
const authStore = useAuthStore();

const id = route.params.id;
const { author } = storeToRefs(authorStore);

let title = 'Añadir autor';

if (id) {
    // edit mode
    title = 'Editar autor';
    onMounted(async ()=>{
      await authorStore.getById(id);
      // fNac.value = new Date(author.value.birth_date).toLocaleDateString();
      // fNacFormatted.set(new Date(author.value.birth_date).toLocaleDateString())
      console.log('este es el console de la tienda de libros ' + fNac.value)
      console.log('este es el console del author.value.birth_date ' + author.value.birth_date)
    }) 
} else {
  author.value = {}
}


watch(fNac, (newVal) => {
  console.log('newVal ' + newVal)
    if (newVal) {
      author.value.birth_date = newVal;
    }
  });

const fNacFormatted = computed({
  get: () => {
    console.log('get ' + fNac.value)
    return fNac.value;
  },
  set: (val) => {
    console.log('set ' + val)
    fNac.value = val;
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
  let response
  try {
    const formData = new FormData()
    author.value.imageExtension = image.name ? image.name.split(".").pop() : null
    if(id) {
      response = await authorStore.update(id, author.value)
    } else {
      response = await authorStore.create(author.value)
      
      snackbarStore.success(response.message);
      cleanForm()
    }
    console.log(image)
    console.log(response)
    if (image && response && response.author.image_path) {
        formData.append('path', response.author.image_path)
        formData.append('file', image)
        await fileStore.uploadImage(formData)
    }
    snackbarStore.success(response.message);
  } catch (error) {
    console.error('Error al agregar autor:', error);
  }
};

const cleanForm = () => {
  author.value = {}
  fNac.value = new Date()
  image.value = ref(new File([""], "filename"))
};
</script>

<template>
  <div class="container">
      <fieldset class="register-fieldset">
        <legend>{{ title}}</legend>
        <v-form @submit.prevent="handleSubmit" class="register-form">
          <v-text-field 
          v-model="author.name" 
          label="Nombre" 
          required>
        </v-text-field>

        <v-text-field
          v-model="fNacFormatted"
          label="Fecha de Nacimiento"
          type="date"
        ></v-text-field> 
          
          <v-text-field v-model="author.nationality" label="Nacionalidad (País)"></v-text-field>
          <input type="file" @change="handleFileChange" class="mb-5"/>
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
            <v-btn @click="() => router.push('/author')" color="#b0bec5" class="ma-2" prepend-icon="mdi-arrow-left">
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
