<script setup>
  import { onMounted, ref, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useAuthorStore, useAuthStore, useFileStore } from '@/stores';
  import { storeToRefs } from 'pinia';
  import * as navigation from '../../utils/navigation'

  const authorStore = useAuthorStore();
  const authStore = useAuthStore();
  const fileStore = useFileStore();
  const route = useRoute();
  const router = useRouter();

  const { author } = storeToRefs(authorStore);
  const { books } = storeToRefs(authorStore);

  const imageUrl = ref(null);

  const viewBook = (id) => {
    router.push({ name: 'bookInfo', params: { id } });
  };

  onMounted(async () => {
    const { id } = route.params;
    try {
      await authorStore.getById(id);
      if (author.value.image_path) {
        imageUrl.value = fileStore.downloadImage(author.value.image_path);
      }
      await authorStore.getAllBooksByAuthor(id);
      if (books.value.length > 0) books.value.map((book) => book.path = useFileStore().downloadImage(book.path)) 
    } catch (error) {
      console.error('Error al cargar el autor:', error);
    }
  });

  const formattedBirthDate = computed(() => {
    if (author.value && author.value.birth_date) {
      return new Date(author.value.birth_date).toLocaleDateString();
    }
    return '';
  });

  const backToList = () => {
    author.value = {};
    books.value = [];
    router.push('/author');
  }
</script>

<template>
  <v-container>
    <v-row v-if="author" align="center">

      <v-col cols="12" md="4" class="d-flex justify-center">
        <v-avatar size="150">
          <v-img
            v-if="imageUrl"
            :src="imageUrl"
            class="rounded-circle"
          ></v-img>
        </v-avatar>
      </v-col>
      
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>
            <h2>{{ author.name }}</h2>
          </v-card-title>
          <v-card-subtitle>{{ formattedBirthDate }}</v-card-subtitle>
          <v-card-subtitle>{{ author.nationality }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-row>
        <v-col class="d-flex justify-end" cols="12" v-if="authStore.isAdmin">
            <v-btn @click="backToList()" color="#b0bec5" class="ma-2" prepend-icon="mdi-arrow-left">
              Volver al listado
            </v-btn>
          </v-col>
          <v-col class="d-flex justify-end" cols="12" v-if="!authStore.isAdmin">
            <v-btn @click="() => navigation.goBack()" color="#b0bec5" class="ma-2" prepend-icon="mdi-arrow-left">
              Volver atrás
            </v-btn>
          </v-col>

          <v-col cols="12">
            <v-card class="book-table">
              <v-card-title>
                <h3>Libros de {{ author.name }}</h3>
              </v-card-title>
              <v-data-table
                :headers="[
                  { title: 'Portada', value: 'path' },
                  { title: 'Título', value: 'description' }
                ]"
                :items="books"
                class="elevation-1"
              >
              <template v-slot:item.path="{ item }">
                <v-img :src="item.path" max-height="100" max-width="100"></v-img>
              </template>

              <template v-slot:item.description="{ item }">
                <span class="book-title" @click="viewBook(item.id)">{{item.description}}</span>
              </template>
              </v-data-table>
            </v-card>
          </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>
  
  <style scoped>
  .book-title {
    text-decoration: underline;
    cursor: pointer;
    color: rgb(114, 114, 221);
  }

  .book-title:hover {
    color: darkblue;
  }

  .rounded-circle {
    border-radius: 50%;
  }

  .book-table {
    max-width: 70%;
    margin:auto;
  }
  </style>
  