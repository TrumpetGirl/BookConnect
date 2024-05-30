<script setup>
  import { useAuthStore } from '@/stores';
  import { TopMenu, TopMenuSignIn, Snackbar, Footer } from '@/components';
  const authStore = useAuthStore();
</script>

<template>
  <v-layout ref="app" class="container">
    <v-app-bar name="app-bar" class="main-container">
      <TopMenuSignIn v-if="authStore.isLoggedIn" />
      <TopMenu v-else />
    </v-app-bar>
    <v-main class="main-container"> 
      <RouterView/>
      <Snackbar />
    </v-main>
    <v-footer app class="d-flex flex-column">
      <Footer />
    </v-footer>
  </v-layout>
</template>

<style scoped>
  .main-container {
    height: 100px !important;
  }

  .top-menu {
  background: linear-gradient(to bottom, #bdb9b9, #8e8c8c);
  color: white;
  font-family: "Poetsen One", sans-serif;
  font-weight: 400;
  font-style: normal;
}
</style>

