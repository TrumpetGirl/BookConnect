<script setup>
import TopMenu from './components/TopMenu.vue';
import TopMenuSignIn from './components/TopMenuSignIn.vue';
</script>

<template>
  <div class="container">
    
    <TopMenu></TopMenu>
    
    <div class="main-container"> 
      <RouterView/>
    </div>
  </div>
</template>

<style scoped>


</style>
