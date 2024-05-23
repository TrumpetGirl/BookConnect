<!-- src/App.vue -->
<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores';
import TopMenu from './components/TopMenu.vue';
import TopMenuSignIn from './components/TopMenuSignIn.vue';

const authStore = useAuthStore();
//const isLoggedIn = computed(async () => await authStore.hasToken());
// let isLoggedIn = false
// onMounted(async() => {
//   isLoggedIn = await authStore.hasToken()
// })
</script>

<template>
  <div class="container">
    <TopMenuSignIn v-if="authStore.isLoggedIn" />
    <TopMenu v-else />
    <div class="main-container"> 
      <RouterView/>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  height: 100px !important;
}
</style>

