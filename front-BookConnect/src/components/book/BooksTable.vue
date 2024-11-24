<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useBookStore, useFileStore, useSnackbarStore } from '@/stores';
  import { storeToRefs } from 'pinia';

  const search = ref('');
  const headers = ref([
    { title: 'Título', value: 'title' },
    { title: 'Portada', value: 'image_path' },
    { title: 'Autor', value: 'author' },
    { title: 'Año de publicación', value: 'publicationYear' },
    { title: 'Género', value: 'genre' },
    { title: 'Editar', value: 'actions', sortable: false }
  ]);

  const bookStore = useBookStore();
  const snackbarStore = useSnackbarStore();
  const { books } = storeToRefs(bookStore);
  const router = useRouter();

  const addBook = () => {
    router.push('/book/create');
  };

  const editBook = (id) => {
    router.push({ name: 'editBook', params: { id } });
  };

  const viewBook = (id) => {
    router.push({ name: 'bookInfo', params: { id } });
  };

  const confirmDelete = (book) => {
    if (confirm(`¿Estás seguro de que deseas eliminar ${book.title}?`)) {
      deleteBook(book.id, book.image_path);
    }
  };

  const deleteBook = async (id, image_path) => {
     try {
      if(image_path) {
        await useFileStore().deleteImage(image_path);
      }
      const response = await bookStore.delete(id);
      snackbarStore.success(response);
     } catch (error) {
       snackbarStore.error('Error al eliminar el libro');
     }
   };

  onMounted(async () => {
    await bookStore.getAll();
    books.value = books.value.map(book => ({
      ...book,
      full_path: book.image_path ? useFileStore().downloadImage(book.image_path) : null
    }));
  });
</script>

<template>
  <v-container>
    <div class="header-container custom-width mb-5">
      <h2 class="title d-flex align-items-center">
        <v-icon class="mr-2">mdi-book-open-page-variant</v-icon>
        Libros
      </h2>
      <v-btn color="success" @click="addBook" prepend-icon="mdi-plus" variant="outlined" rounded="xl" class="add-book-button">
        Añadir Libro
      </v-btn>
    </div>

    <v-text-field
      v-model="search"
      label="Buscar"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
      single-line
      class="custom-width mb-5"
    ></v-text-field>

    <v-data-table
      :headers="headers"
      :items="books"
      :search="search"
      class="custom-data-table"
    >
    <template v-slot:headers="{ columns }">
      <tr>
        <template v-for="column in columns" :key="column.key">
          <th class="font-weight-bold custom-header"><span>{{ column.title }}</span></th>
        </template>
      </tr>
    </template>

    <template v-slot:item.title="{ item }">
      <span class="book-title" @click="viewBook(item.id)">{{ item.title}}</span>
    </template>

    <template v-slot:item.image_path="{ item }">
      <v-img :src="item.full_path" max-height="100" max-width="100"></v-img>
    </template>

      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-2" @click="() => {editBook(item.id)}">
          mdi-pencil
        </v-icon>
        <!-- <v-icon class="ml-2" @click="confirmDelete(item)">
          mdi-delete
        </v-icon> -->
      </template>
    </v-data-table>
  </v-container>
</template>

<style scoped>
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    margin: 0;
  }

  .add-book-button {
    margin-left: 20px;
  }

  .custom-width {
    max-width: 80%;
    margin: auto;
  }

  .custom-data-table {
    max-width: 80%;
    background-color: #ffe6f0; 
    margin: auto;
  }

  .custom-header {
    background-color: #f8c6d6 !important; 
  }

  .book-title {
    text-decoration: underline;
    cursor: pointer;
    color: rgb(114, 114, 221);
  }

  .book-title:hover {
    color: darkblue;
  }
</style>
