<script setup>
import { ref, watch } from 'vue';
import { createAuthor } from '../services/authorService.js';
import { useDate } from 'vuetify'

const adapter = useDate()

const author = ref({
  name: '',
  birth_date: new Date(),
  nationality: ''
})

const fNac = ref(new Date())

const handleSubmit = async () => {
  try {
    console.log("1 " + author.value.birth_date)
    const response = await createAuthor({
      name: author.value.name,
      birth_date: author.value.birth_date,
      nationality: author.value.nationality
    });
    console.log('Autor agregado con éxito:', response);
    // Limpiar los campos después de agregar el autor con éxito
    author.value.name = '';
    author.value.birth_date = new Date();
    fNac.value = new Date();
    author.value.nationality = '';
  } catch (error) {
    console.error('Error al agregar autor:', error);
  }
};

const cancel = () => {
  // Limpiar los campos en caso de cancelación
  author.value.name = '';
  author.value.birth_date = new Date();
  fNac = new Date();
  author.value.nationality = '';
};

watch(fNac, (newVal) => {
  console.log(newVal);
  if (newVal) {
    // Asegúrate de que solo la parte de la fecha se guarde
    author.value.birth_date = adapter.toISO(newVal);
  }
});
</script>

<template>
  <div class="container">
    <div class="left-pane">
      <fieldset class="register-fieldset">
        <legend>Añadir Autor</legend>
        <v-form @submit.prevent="handleSubmit" class="register-form">
          <v-text-field v-model="author.name" label="Nombre" required></v-text-field>
          <v-date-picker v-model="fNac" label="Fecha de Nacimiento" required></v-date-picker>
          <v-text-field v-model="author.nationality" label="Nacionalidad" required></v-text-field>
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
