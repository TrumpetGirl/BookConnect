<script setup>
  import { useAuthStore } from '@/stores'
  import { useRouter } from 'vue-router'
  import { storeToRefs } from 'pinia'

  const authStore = useAuthStore()
  const router = useRouter()
  const { user } = storeToRefs(authStore)
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
      <v-col cols="auto align-self-center">
        <div class="welcome-message">Bienvenido/a, {{ user?.username }}</div>
      </v-col>
      <v-col cols="auto align-self-center">
        <v-menu>
          <template v-slot:activator="{ props }">
            <img
              class="profile-picture"
              :src="user?.image_path"
              v-bind="props"
            />
          </template>
          <v-list>
            <v-list-item v-if="!authStore.isAdmin" @click="router.push('/search');">
              <v-list-item-title><v-icon class="mr-2">mdi-magnify</v-icon>Buscador</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="!authStore.isAdmin"  @click="router.push({ name: 'myCollection' });">
              <v-list-item-title><v-icon class="mr-2">mdi-book-multiple</v-icon>Mi colección</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="!authStore.isAdmin"  @click="router.push('/favourites');">
              <v-list-item-title><v-icon class="mr-2">mdi-star</v-icon>Favoritos</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="authStore.isAdmin" @click="router.push('/dashboard');">
              <v-list-item-title><v-icon class="mr-2">mdi-view-dashboard</v-icon>Dashboard</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="authStore.isAdmin" @click="router.push('/book');">
              <v-list-item-title><v-icon class="mr-2">mdi-book-open-page-variant</v-icon>Listado libros</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="authStore.isAdmin" @click="router.push('/author');">
              <v-list-item-title><v-icon class="mr-2">mdi-feather</v-icon>Listado autores</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="authStore.isAdmin" @click="router.push('/user');">
              <v-list-item-title><v-icon class="mr-2">mdi-account-group</v-icon>Listado usuarios</v-list-item-title>
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

  .v-list-item {
    background-color: white; 
  }
</style>
