<script setup>
  import { onMounted, ref, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore, useAuthStore, useFileStore } from '@/stores'
  import { storeToRefs } from 'pinia';
  import * as navigation from '../../utils/navigation'

  const userStore = useUserStore();
  const authStore = useAuthStore();
  const fileStore = useFileStore();
  const route = useRoute();
  const router = useRouter();

  const { user } = storeToRefs(userStore);

  const { id } = route.params;

  const imageUrl = ref(null);

  onMounted(async () => {
    
    try {
      await userStore.getById(id);
      if (user.value.image_path) {
        imageUrl.value = fileStore.downloadImage(user.value.image_path);
      }
    } catch (error) {
      console.error('Error al cargar el usuario:', error);
    }
  });

  const formattedBirthDate = computed(() => {
    if (user.value && user.value.birth_date) {
      return new Date(user.value.birth_date).toLocaleDateString();
    }
    return '';
  });

  const goToUserColection = () => {
    if (!id || parseInt(id) === user.value.id) {
      navigation.redirectTo({ name: 'myCollection' })
    } else {
      router.push('/collection/user/'+ id)
    }
  };

  
</script>

<template>
  <v-container>
    <v-row v-if="user" align="center">

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
            <h2>{{ user.username }}</h2>
          </v-card-title>
          <v-card-subtitle>{{ formattedBirthDate }}</v-card-subtitle>
          <v-card-subtitle>{{ user.email }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-row>
        <v-col class="d-flex justify-end" cols="12">
          <v-btn @click="() => goToUserColection()" color="#b0bec5" class="ma-2" prepend-icon="mdi-arrow-left">
            Ir a la colección
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-end" cols="12" v-if="authStore.isAdmin">
          <v-btn @click="() => router.push('/user')" color="#b0bec5" class="ma-2" prepend-icon="mdi-arrow-left">
            Volver al listado
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-end" cols="12" v-else>
          <v-btn @click="() => navigation.goBack()" color="#b0bec5" class="ma-2" prepend-icon="mdi-arrow-left">
            Volver atrás
          </v-btn>
        </v-col>

          <!-- <v-col cols="12">
            <v-card>
            <v-card-title>
                <h3>Colección de {{ user.name }}</h3>
            </v-card-title>
            <v-data-table
                :headers="[
                { title: 'Título', value: 'description' },
                ]"
                :items="books"
                class="elevation-1"
            ></v-data-table>
            </v-card>
        </v-col> -->

      </v-row>
    </v-row>
  </v-container>
</template>
  
<style scoped>
    .rounded-circle {
    border-radius: 50%;
    }
</style>
  