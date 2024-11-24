<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useFileStore, useCollectionStore } from '@/stores'
import { storeToRefs } from 'pinia'
import * as navigation from '../../utils/navigation'

const route = useRoute()
const router = useRouter()

const collectionStore = useCollectionStore()
const { collections, collectionCount, nowReading, collectionUsername } = storeToRefs(collectionStore)

const viewBook = (id) => {
    router.push({ name: 'bookInfo', params: { id: id } })
  };

onMounted(async () => {
  const { userId } = route.params
  await collectionStore.getByUserId(userId)
  collections.value = collections.value.map(collection => ({
    ...collection,
    image: collection.book_image ? useFileStore().downloadImage(collection.book_image) : null
  }))
  if (nowReading.value) nowReading.value.image = nowReading.value.book_image ? useFileStore().downloadImage(nowReading.value.book_image) : null
});
</script>

<template>
  <v-container>
    <v-row dense>
      <v-col cols="12" class="main-content">
        <h2 class="collection-title">Colección de {{ collectionUsername }}</h2>
        <p>{{ collectionCount }} libros</p>
        <v-row>
          <v-col cols="3" md="3" sm="12" v-for="(collection, index) in collections" :key="index">
            <v-card @click="viewBook(collection.bookId)">
              <v-card-item>
                <v-img :src="collection.image" class="book-image"></v-img>
              </v-card-item>
              <v-card-text class="book-title">{{ collection.title }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="d-flex justify-end" cols="12">
        <v-btn @click="() => navigation.goBack()" color="#b0bec5" class="ma-2" prepend-icon="mdi-arrow-left">
          Volver atrás
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.sidebar {
  background-color: #f8c6d6;
  padding: 20px;
}

.reading-now {
  margin-bottom: 20px;
}

.followers-info {
  margin-bottom: 20px;
}

.book-image {
  width: 100px;
  height: 150px;
  margin: auto;
}

.list-button {
  background-color: #ffe6f0;
  color: black;
}

.main-content {
  padding: 20px;
}

.collection-title {
  color: #d39292;
  font-weight: bold;
}

.book-image {
  border: 1px solid #ccc;
  padding: 5px;
}

.v-btn {
  margin: 5px 0;
}

.v-menu {
  display: inline-block;
}

.v-list-item {
  cursor: pointer;
}

.v-card-text {
  text-align: center;
}
</style>