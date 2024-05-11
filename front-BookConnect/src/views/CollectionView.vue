<template>
    <div class="container">
    
        <CollectionView />
   
    </div>
  </template>
  
  <script>
  import CollectionView from '../components/CollectionBooks.vue'; 
  
  export default {
    components: {
      CollectionView
    }
  };
  </script>
  
  <style>
.container {
    margin: auto;
}
  </style>
  