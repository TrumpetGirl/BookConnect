<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, useFileStore, useListStore } from '@/stores'
import { storeToRefs } from 'pinia'

const router = useRouter()

const listStore = useListStore()
const { favourites, favouritesCount } = storeToRefs(listStore)

const viewBook = (id) => {
    router.push({ name: 'bookInfo', params: { id: id } })
  };

onMounted(async () => {
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)
  await listStore.getFavouritesByUserId(user.value.id)
  favourites.value = favourites.value.map(favourite => ({
    ...favourite,
    image: favourite.book_image ? useFileStore().downloadImage(favourite.book_image) : null
  }))
});
</script>

<template>
  <v-container>
    <v-row dense>
      <v-col cols="12" class="main-content">
        <h2 class="collection-title">Mis favoritos</h2>
        <p>{{ favouritesCount }} libros</p>
        <v-row>
          <v-col cols="3" md="3" sm="12" v-for="(favourite, index) in favourites" :key="index">
            <v-card @click="viewBook(favourite.bookId)">
              <v-card-item>
                <v-img :src="favourite.image" class="book-image"></v-img>
              </v-card-item>
              <v-card-text class="book-title">{{ favourite.title }}</v-card-text>
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