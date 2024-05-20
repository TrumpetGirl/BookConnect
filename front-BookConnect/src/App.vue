<script setup>
import TopMenu from './components/TopMenu.vue';
import TopMenuSignIn from './components/TopMenuSignIn.vue';
</script>

<template>
  <div class="container">
    
    <TopMenuSignIn></TopMenuSignIn>
    
    <div class="main-container"> 
      <RouterView/>
    </div>
  </div>
</template>

<style scoped>


</style>
