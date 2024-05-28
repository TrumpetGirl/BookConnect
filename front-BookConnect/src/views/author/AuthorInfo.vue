<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthorStore } from '@/stores/author.store';
import { useFileStore } from '@/stores/file.store';

const authorStore = useAuthorStore();
const fileStore = useFileStore();
const route = useRoute();
const author = ref(null);
const imageUrl = ref(null);

onMounted(async () => {
  const { id } = route.params;
  try {
    await authorStore.getById(id);
    author.value = authorStore.author;

    if (author.value.image_path) {
      imageUrl.value = fileStore.downloadImage(author.value.image_path);
    }
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
</script>

<template>
  <v-container>
    <v-row v-if="author" align="center">
      <!-- Foto del autor -->
      <v-col cols="12" md="4" class="d-flex justify-center">
        <v-avatar size="150">
          <v-img
            v-if="imageUrl"
            :src="imageUrl"
            class="rounded-circle"
          ></v-img>
        </v-avatar>
      </v-col>
      
      <!-- Información del autor -->
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>
            <h2>{{ author.name }}</h2>
          </v-card-title>
          <v-card-subtitle>{{ formattedBirthDate }}</v-card-subtitle>
          <v-card-subtitle>{{ author.nationality }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-alert v-else type="error" dismissible>
      No se ha podido cargar la información del autor.
    </v-alert>
  </v-container>
</template>
  
  <style scoped>


  .rounded-circle {
  border-radius: 50%;
}


  </style>
  