<script setup>
  import { useAuthStore } from '@/stores';
  import { TopMenu, TopMenuSignIn, Snackbar, FooterElement } from '@/components';
  const authStore = useAuthStore();
</script>

<template>
  <v-app>
    <v-app-bar class="top-menu">
      <TopMenuSignIn v-if="authStore.isLoggedIn"/>
      <TopMenu v-else />
    </v-app-bar>
    <v-main>
      <RouterView/>
      <Snackbar />
    </v-main>
    <v-footer class="d-flex flex-column">
      <FooterElement/>
    </v-footer>
  </v-app>
</template>

<style scoped>

  .top-menu {
  background: linear-gradient(to bottom, #bdb9b9, #8e8c8c) !important;
  color: white !important;
  font-family: "Poetsen One", sans-serif !important;
  font-weight: 400 !important;
  font-style: normal !important;
}

</style>

