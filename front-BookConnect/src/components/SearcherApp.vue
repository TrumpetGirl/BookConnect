<script setup>
const searchQuery = ref('');

const search = () => {
  console.log('Realizar búsqueda con el término:', searchQuery.value);
};
</script>

<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Libro, autor o @usuario"
      class="search-input"
    />
    <button @click="search" class="search-button">
      <v-icon icon="fa:fas fa-search"></v-icon>
    </button>
  </div>
</template>

<style scoped>
.search-bar {
 margin: auto;
}

.search-input {
  flex: 1;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}

.search-button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 5px;
}
</style>
