<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, useFileStore, useCollectionStore } from '@/stores'
import { storeToRefs } from 'pinia'

const router = useRouter()

const collectionStore = useCollectionStore()
const { collections, collectionCount, nowReading } = storeToRefs(collectionStore)

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

onMounted(async () => {
  await collectionStore.getByUserId(user.value.id)
  collections.value = collections.value.map(collection => ({
    ...collection,
    image: collection.book_image ? useFileStore().downloadImage(collection.book_image) : null
  }))
  if (nowReading.value) nowReading.value.image = nowReading.value.book_image ? useFileStore().downloadImage(nowReading.value.book_image) : null
});

const viewBook = (id) => {
    router.push({ name: 'bookInfo', params: { id: id } })
  };
</script>

<template>
  <v-container>
    <v-row dense>
      <v-col cols="3" class="sidebar">
        <div class="reading-now">
          <h3>Leyendo ahora:</h3>
          <v-img v-if="nowReading" :src="nowReading.image" class="book-image"></v-img>
        </div>
      </v-col>
      <v-col cols="9" class="main-content">
        <h2 class="collection-title">Mi colección</h2>
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
  margin: auto;
  width: 100px;
  height: 150px;
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