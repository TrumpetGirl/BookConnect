<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useBookStore, useFileStore, useSnackbarStore } from '@/stores';
  import { storeToRefs } from 'pinia';

  const search = ref('');
  const headers = ref([
    { title: 'Nombre', value: 'name' },
    { title: 'Fecha de Nacimiento', value: 'birth_date' },
    { title: 'Nacionalidad', value: 'nationality' },
    { title: 'Imagen', value: 'image_path' },
    { title: 'Acciones', value: 'actions', sortable: false }
  ]);

  const authorStore = useAuthorStore();
  const snackbarStore = useSnackbarStore();
  const { authors } = storeToRefs(authorStore);
  const router = useRouter();

  const addAuthor = () => {
    router.push('/author/create');
  };

  const editAuthor = (id) => {
    router.push({ name: 'editAuthor', params: { id } });
  };

  const viewAuthor = (author) => {
    router.push({ name: 'authorInfo', params: { id: author.id } });
  };

  const confirmDelete = (author) => {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${author.name}?`)) {
      deleteAuthor(author.id, author.image_path);
    }
  };

  const deleteAuthor = async (id, image_path) => {
     try {
      console.log(image_path)
      if(image_path) {
        await useFileStore().deleteImage(image_path);
      }
      const response = await authorStore.delete(id);
      snackbarStore.success(response);
     } catch (error) {
       snackbarStore.error('Error al eliminar el autor');
     }
   };

  onMounted(async () => {
    await authorStore.getAll();
    authors.value = authors.value.map(author => ({
      ...author,
      birth_date: new Date(author.birth_date).toLocaleDateString(),
      full_path: author.image_path ? useFileStore().downloadImage(author.image_path) : null
    }));
    console.log(authors.value);
  });
</script>

<template>
  <v-container>
    <div class="header-container custom-width mb-5">
      <h2 class="title">Autores</h2>
      <v-btn color="success" @click="addAuthor" prepend-icon="mdi-plus" variant="outlined" rounded="xl" class="add-author-button">
        Añadir Autor
      </v-btn>
    </div>

    <v-text-field
      v-model="search"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
      single-line
      class="custom-width mb-5"
    ></v-text-field>

    <v-data-table
      :headers="headers"
      :items="authors"
      :search="search"
      class="custom-data-table"
      @click:row="viewAuthor"
    >
      <template v-slot:column.header="{ column }">
        <th class="custom-header">{{ column.text }}</th>
      </template>

      <template v-slot:item.birth_date="{ item }">
        <span>{{ item.birth_date }}</span>
      </template>

      <template v-slot:item.image_path="{ item }">
        <v-img :src="item.full_path" max-height="100" max-width="100"></v-img>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-2" @click="() => {editAuthor(item.id)}">
          mdi-pencil
        </v-icon>
        <v-icon class="ml-2" @click="confirmDelete(item)">
          mdi-delete
        </v-icon>
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

  .add-author-button {
    margin-left: 20px;
  }

  .custom-width {
    max-width: 90%;
    margin: auto;
  }

  .custom-data-table {
    max-width: 90%;
    background-color: #ffe6f0; 
    margin: auto;
  }

  .custom-header {
    background-color: #f2f2f2 !important; 
  }
</style>