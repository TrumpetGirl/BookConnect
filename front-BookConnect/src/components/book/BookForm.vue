<script setup>
import { ref } from 'vue';
import axios from 'axios';

const selectedFile = ref(null);
const book = ref({
  title: '',
  isbn: '',
  year: '',
  synopsis: ''
});

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0];
};

const submitForm = async () => {
  try {
    const formData = new FormData();
    formData.append('image', selectedFile.value);
    formData.append('title', book.value.title);
    formData.append('isbn', book.value.isbn);
    formData.append('year', book.value.year);
    formData.append('synopsis', book.value.synopsis);
    await axios.post('/uploads', formData);
    alert('Libro enviado. Espere confirmación por parte del administrador');
    
    selectedFile.value = null;
    book.value.title = '';
    book.value.isbn = '';
    book.value.year = '';
    book.value.synopsis = '';
  } catch (error) {
    console.error('Error al subir el libro:', error);
    alert('Error al subir el libro.');
  }
};
</script>

<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="image">Seleccionar imagen:</label>
        <input type="file" id="image" @change="handleFileUpload">
      </div>
      <div>
        <label for="title">Título:</label>
        <input type="text" id="title" v-model="book.title">
      </div>
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" id="isbn" v-model="book.isbn">
      </div>
      <div>
        <label for="year">Año de publicación:</label>
        <input type="number" id="year" v-model="book.year">
      </div>
      <div>
        <label for="synopsis">Sinopsis:</label>
        <textarea id="synopsis" v-model="book.synopsis"></textarea>
      </div>
      <button type="submit">Subir libro</button>
    </form>
  </div>
</template>
