<script setup>
  import { ref, onMounted } from 'vue';
  import { useBookStore, useAuthorStore, useUserStore } from '@/stores';
  import { storeToRefs } from 'pinia';

  const bookStore = useBookStore();
  const authorStore = useAuthorStore();
  const userStore = useUserStore();
  const { bookCount } = storeToRefs(bookStore);
  const { authorCount } = storeToRefs(authorStore);
  const { userCount } = storeToRefs(userStore);

  onMounted(async () => {
    await bookStore.getCount();
    await authorStore.getCount();
    await userStore.getCount();
  });
</script>

<template>
  <v-container class="narrow-container">
    <div class="section-title">
      <v-icon class="mr-2">mdi-view-dashboard</v-icon>
      <h1 class="headline">
        Dashboard
      </h1>
    </div>

    <h2 class="subtitle-1 text-center">
      Estadísticas
    </h2>

    <v-row>
      <v-col cols="12" md="4">
        <v-card class="pa-3 text-center" outlined>
          <v-card-title class="d-flex align-center justify-center">
            <v-icon class="mr-2">mdi-book-open-page-variant</v-icon>
            {{ bookCount }} Libros
          </v-card-title>
          <v-card-text>
            <v-counter :value="bookCount" color="primary" />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-3 text-center" outlined>
          <v-card-title class="d-flex align-center justify-center">
            <v-icon class="mr-2">mdi-feather</v-icon>
            {{ authorCount }} Autores
          </v-card-title>
          <v-card-text>
            <v-counter :value="authorCount" color="secondary" />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-3 text-center" outlined>
          <v-card-title class="d-flex align-center justify-center">
            <v-icon class="mr-2">mdi-account-group</v-icon>
            {{ userCount }} Usuarios
          </v-card-title>
          <v-card-text>
            <v-counter :value="userCount" color="success" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.narrow-container {
  max-width: 750px; 
  margin: 0 auto;
}

.section-title {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.v-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.v-card-title {
  font-weight: 500;
  font-size: 20px;
}

.v-icon {
  font-size: 30px;
}

.v-counter {
  font-size: 24px;
  font-weight: 600;
  margin-top: 8px;
}

.headline {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.subtitle-1 {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 24px;
  color: #555;
}

.text-center {
  text-align: center;
}
</style>
