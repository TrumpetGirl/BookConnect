<script setup>
  import { useAuthStore } from '@/stores';
  import { TopMenu, TopMenuSignIn, Snackbar } from '@/components';
  const authStore = useAuthStore();
</script>

<template>
  <div class="container">
    <TopMenuSignIn v-if="authStore.isLoggedIn" />
    <TopMenu v-else />
    <div class="main-container"> 
      <RouterView/>
      <Snackbar />
    </div>
  </div>
</template>

<style scoped>
  .main-container {
    height: 100px !important;
  }
</style>

