<script setup>
</script>

<template>
  <!-- <div class="top-menu">-->
    <div class="container"> 
      <div class="title">
        <h1>BookConnect</h1> 
        <img src="../assets/images/logo.png" alt="IconoBookConnect">
      </div>
     </div>
 <!-- </div> -->
</template>

<style scoped>
  .top-menu {
    background: linear-gradient(to bottom, #bdb9b9, #8e8c8c);
    color: white;
    font-family: "Poetsen One", sans-serif;
    font-weight: 400;
    font-style: normal;
  }

  .container {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between; 
    align-items: center; 
  }

  .title {
    display: flex;
    align-items: center;
  }

  h1 {
    margin-right: 30px;
  }

  img {
    width: 70px;
    height: 60px;
  }
</style>
