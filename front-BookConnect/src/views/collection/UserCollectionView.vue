<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useAuthStore, useCollectionStore } from '@/stores'
  import { storeToRefs } from 'pinia'
  import * as navigation from '../../utils/navigation'

  const router = useRouter()

  const collectionStore = useCollectionStore()
  const { collections, collectionCount } = storeToRefs(collectionStore)

  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)

  const navigateToLists = () => {
    router.push({ name: 'Lists' })
  }

  const updateBookStatus = (book, status) => {
    book.status = status
  }

  onMounted(async () => {
    const route = useRoute()
    const { userId } = route.params
    if (!userId || parseInt(userId) === user.value.id) {
      navigation.redirectTo({ name: 'myCollection' })
    } else {
      await collectionStore.getByUserId(user.value.id)
    }
    
  });
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="3" class="sidebar">
        <div class="reading-now">
          <h3>Leyendo ahora:</h3>
          <v-img :src="currentReadingImage" class="book-image"></v-img>
        </div>
        <div class="followers-info">
          <p>Seguidores:</p>
          <h2>{{ followers }}</h2>
          <p>Siguiendo:</p>
          <h2>{{ following }}</h2>
        </div>
        <v-btn class="list-button" @click="navigateToLists"><v-icon style="margin-right:10px;">mdi-format-list-bulleted</v-icon>Mis Listas</v-btn>
      </v-col>
      <v-col cols="9" class="main-content">
        <h2 class="collection-title">Mi colección</h2>
        <p>{{ collectionCount }} libros</p>
        <v-row>
          <v-col cols="2" v-for="(collection, index) in collections" :key="index">
            <v-img :src="collection.book_image" class="book-image"></v-img>
            <h4>{{ collection.title }}</h4>
            <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <v-btn small v-bind="attrs" v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(option, i) in bookStatusOptions" :key="i" @click="updateBookStatus(book, option)">
                  {{ option }}
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  Puntuación:
                  <v-rating v-model="book.rating" length="5" color="red"></v-rating>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>