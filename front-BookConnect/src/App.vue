<!-- src/App.vue -->
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores';
import TopMenu from './components/TopMenu.vue';
import TopMenuSignIn from './components/TopMenuSignIn.vue';

const authStore = useAuthStore();
//const isLoggedIn = computed(async () => await authStore.hasToken());
let isLoggedIn = false
onMounted(async() => {
  isLoggedIn = await authStore.hasToken()
})

</script>

<template>
  <div class="container">
    <component :is="isLoggedIn ? 'TopMenuSignIn' : 'TopMenu'"></component>
    <TopMenuSignIn v-if="isLoggedIn" />
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

