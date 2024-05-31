<script setup>
  import { useAuthStore, useFileStore } from '@/stores';
  import { useRouter } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { onMounted, ref } from 'vue';

  let showDropdownMenu = ref(false);

  const authStore = useAuthStore();
  const router = useRouter();
  const fileStore = useFileStore();
  const { user }= storeToRefs(authStore);

  onMounted(async () => {
    user.value.image_path = await fileStore.downloadImage(user.value.image_path)
  })

  const loadImage = (image_path) => {
    if (image_path) {
      return "http://localhost:3000/file/download/" + image_path
    } else {
      return ""
    }
  };

  const toggleDropdownMenu = () => {
    showDropdownMenu.value = !showDropdownMenu.value;
  };

  const closeDropdownMenu = () => {
    showDropdownMenu.value = false;
  };
</script>

<template>
    <v-row>
      <v-col cols="auto">
        <v-app-bar-title>BookConnect</v-app-bar-title>
      </v-col>
      <v-col cols="auto">
        <img src="../assets/images/logo.png" alt="IconoBookConnect" class="logo-icon">
      </v-col>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>  
      <v-col cols="auto align-self-center ">
        <div class="welcome-message">Bienvenido/a, {{ user.username }}</div>
      </v-col>
      <v-col cols="auto align-self-center ">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <img
              class="profile-picture"
              :src="user.image_path"
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-list>
            <v-list-item v-if="!authStore.isAdmin()" @click="router.push('/search'); closeDropdownMenu();">
              <v-list-item-title>Buscador</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="!authStore.isAdmin()">
              <v-list-item-title>Mi colección</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="!authStore.isAdmin()">
              <v-list-item-title>Configuración</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="authStore.isAdmin()" @click="router.push('/dashboard'); closeDropdownMenu();">
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="authStore.isAdmin()" @click="router.push('/book'); closeDropdownMenu();">
              <v-list-item-title>Listado libros</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="authStore.isAdmin()" @click="router.push('/author'); closeDropdownMenu();">
              <v-list-item-title>Listado autores</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="authStore.isAdmin()" @click="router.push('/user'); closeDropdownMenu();">
              <v-list-item-title>Listado usuarios</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-col cols="auto align-self-center">
        <img class="logout-icon" src="../assets/images/logout-icon.png" @click="authStore.logout()" title="Cerrar sesión">
      </v-col>
  </v-row>
</template>

<style scoped>
  .v-app-bar-title {
    font-size: xx-large;
    padding: 15px;
  }

  .logo-icon {
    width: 70px;
    height: 60px;
  }

  .menu-right {
    display: flex;
    align-items: center; 
  }

  .welcome-message {
    margin-right: 20px;
    font-size: larger;
    font-family: 'Tahoma';
  }

  .profile-picture {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 20px;
  }

  .logout-icon {
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-right: 20px;
  }
</style>

