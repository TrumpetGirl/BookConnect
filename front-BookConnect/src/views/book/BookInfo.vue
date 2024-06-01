<script setup>
import { ref, onMounted  } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBookStore, useFileStore, useAuthStore } from '@/stores';
import { storeToRefs } from 'pinia';

const bookStore = useBookStore();
const authStore = useAuthStore();
const fileStore = useFileStore();
const route = useRoute();
const router = useRouter();

const { book } = storeToRefs(bookStore);
const imageUrl = ref(null);

onMounted(async () => {
  const { id } = route.params;
  try {
    await bookStore.getById(id);
    imageUrl.value = fileStore.downloadImage(book.value.image_path);
    console.log(imageUrl.value)
  } catch (error) {
    console.error('Error al cargar el libro:', error);
  }
});


const addToCollection = () => {
  // Implementación de addToCollection
};

const addToList = () => {
  // Implementación de addToList
};
</script>

<template>
  <div v-if="book">
    <v-card class="book-card mt-5" outlined>
      <v-row>
        <v-col cols="12" md="2" class="d-flex align-center justify-center">
          <v-img :src="imageUrl" class="cover-book"></v-img>
        </v-col>
        <v-col cols="12" md="8">
          <v-card-title>{{ book.title }}</v-card-title>
          <v-card-text>
            <div><strong>Autor:</strong> {{ book.author }}</div>
            <div><strong>ISBN:</strong> {{ book.isbn }}</div>
            <div><strong>Año de Publicación:</strong> {{ book.publicationYear }}</div>
            <div><strong>Género:</strong> {{ book.genre }}</div>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card-text>
            <div><strong>Puntuación:</strong></div>
            <v-rating v-model="rating" disabled color="pink"></v-rating>
            <div><strong>Sinopsis:</strong></div>
            <div>{{ book.synopsis }}</div>
          </v-card-text>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-btn class="collection-btn" color="white" @click="addToCollection">
          <v-icon style="margin-right:10px;">mdi-book-plus</v-icon> Añadir a mi colección
        </v-btn>
        <v-btn class="list-btn" color="white" @click="addToList">
          <v-icon style="margin-right:10px;">mdi-format-list-bulleted</v-icon> Añadir a una lista
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-col class="d-flex justify-end" cols="12" v-if="authStore.isAdmin()">
      <v-btn @click="() => router.push('/book')" color="#b0bec5" class="ma-2" prepend-icon="mdi-arrow-left">
        Volver al listado
      </v-btn>
    </v-col>
    <v-col class="d-flex justify-end" cols="12" v-if="!authStore.isAdmin()">
      <v-btn @click="() => router.push('/')" color="#b0bec5" class="ma-2" prepend-icon="mdi-arrow-left">
        Volver atrás
      </v-btn>
    </v-col>
  </div>
</template>

  
  
<style scoped>
.book-card {
  width: 80%;
  max-width: 900px;
  margin: auto;
  padding: 20px;
}

.cover-book {
  border-radius: 8px;
}

.collection-btn, .list-btn {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 16px;
  background-color: rgb(255, 163, 179);
}

.v-card-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.v-card-text > div {
  margin-bottom: 8px;
}
</style>

  