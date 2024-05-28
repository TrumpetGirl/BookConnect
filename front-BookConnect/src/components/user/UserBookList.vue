<script setup>

</script>

<template>
    <div>
      <h2>Lista de Libros del Usuario</h2>
      <v-list>
        <v-list-item v-for="book in userBooks" :key="book.id">
          <v-list-item-content>
            <v-list-item-title>{{ book.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ book.author.name }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="userBooks.length === 0">
          <v-list-item-content>
            <v-list-item-title>No se encontraron libros</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </template>
  

  
  <style scoped>

  </style>
  