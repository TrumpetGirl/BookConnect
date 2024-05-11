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
 .container {
    display: flex;
    flex-direction: column; 
    height: 100vh; 
  }
  
  .main-container {
    flex: 1; 
    display: flex;
    width: 100%; 
  }

</style>
