<script setup>
import { ref, onMounted } from 'vue';
import { useBookStore, useAuthorStore  } from '@/stores';

const bookCount = ref(0);
const bookStore = useBookStore();
const authorCount = ref(0);
const authorStore = useAuthorStore();


const fetchBookCount = async () => {
  await bookStore.getCount();
  bookCount.value = bookStore.bookCount;
};
const fetchAuthorCount = async () => {
  await authorStore.getCount();
  authorCount.value = authorStore.authorCount;
};

onMounted(() => {
  fetchBookCount();
  fetchAuthorCount();
});
</script>


<template>
  <div>
    <v-card-title class="headline">
      Dashboard
    </v-card-title>

    <v-card>
      <v-card-title>
        Estadísticas
      </v-card-title>
      <v-card-text>
      </v-card-text>
    </v-card>
    <v-card>
    <v-card-title>Contador de Libros</v-card-title>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-alert type="info" :value="true">
            Hay un total de {{ bookCount }} libros.
          </v-alert>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <v-card>
    <v-card-title>Contador de Autores</v-card-title>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-alert type="info" :value="true">
            Hay un total de {{ authorCount }} autores.
          </v-alert>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  </div>

  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="pa-3" outlined>
          <v-card-title>
            <v-icon left>mdi-book</v-icon>
            Libros
          </v-card-title>
          <v-card-text>
            <v-row justify="center">
              <v-col cols="12" class="d-flex justify-center">
                <v-counter :value="bookCount" color="primary"></v-counter>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-3" outlined>
          <v-card-title>
            <v-icon left>mdi-account</v-icon>
            Autores {{ bookCount }}
          </v-card-title>
          <v-card-text>
            <v-row justify="center">
              <v-col cols="12" class="d-flex justify-center">
                <v-counter :value="authorCount" color="secondary"></v-counter>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-3" outlined>
          <v-card-title>
            <v-icon left>mdi-account-multiple</v-icon>
            Usuarios
          </v-card-title>
          <v-card-text>
            <v-row justify="center">
              <v-col cols="12" class="d-flex justify-center">
                <v-counter :value="userCount" color="success"></v-counter>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-card class="pa-3" outlined>
          <v-card-title>
            <v-icon left>mdi-book</v-icon>
            Libros
          </v-card-title>
          <v-card-text>
            <v-row justify="center">
              <v-col cols="12" class="d-flex justify-center">
                <v-avatar size="80" class="my-4">
                  <v-badge
                    content=" "
                    color="primary"
                    dot
                    overlap
                  >
                    <v-icon large>mdi-book</v-icon>
                  </v-badge>
                </v-avatar>
              </v-col>
              <v-col cols="12" class="d-flex justify-center">
                <div class="display-4">{{ bookCount }}</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
</template>


<style scoped>
.container {
  display: flex;
  flex-direction: column; 
  justify-content: flex-start; 
  align-items: center;
  font-family: "Ubuntu Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 100;
  font-style: normal;
}

.search-container, .results-container {
  margin-top: 20px; 
  width: 800px;
}
</style>
