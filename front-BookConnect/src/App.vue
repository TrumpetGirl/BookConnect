<!-- src/App.vue -->
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from './stores/auth.js'; // Asegúrate de que la ruta sea correcta
import TopMenu from './components/TopMenu.vue';
import TopMenuSignIn from './components/TopMenuSignIn.vue';

const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.hasToken());
onMounted(() => {
  authStore.hasToken()
})
console.log("isLoggedIn: " + authStore.isLoggedIn)

</script>

<template>
  <div class="container">
    <component :is="isLoggedIn ? 'TopMenuSignIn' : 'TopMenu'"></component>
    <TopMenuSignIn v-if="authStore.isLoggedIn" />
    <TopMenu v-else />
    {{ authStore.isLoggedIn }}
    <div class="main-container"> 
      <RouterView/>
    </div>
  </div>
</template>

<style scoped>
/* Tu CSS aquí */
</style>

