<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthorStore, useFileStore } from '@/stores';
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
  const { authors } = storeToRefs(authorStore);
  const router = useRouter();

  const addAuthor = () => {
    router.push('/author/create');
  };

  const editAuthor = (id) => {
    router.push({ name: 'AuthorCreateEdit', params: { id } });
  };

  const confirmDelete = (author) => {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${author.name}?`)) {
      deleteAuthor(author.id);
    }
  };

  const deleteAuthor = async (id) => {
    try {
      await authorStore.delete(id);
    } catch (error) {
      console.error('Error al eliminar el autor:', error);
    }
  };

  onMounted(async () => {
    await authorStore.getAll();
    authors.value = authors.value.map(author => ({
      ...author,
      birth_date: new Date(author.birth_date).toLocaleDateString(),
      image_path: useFileStore().downloadImage(author.image_path)
    }));
});

</script>

<template>
    <v-container>
    <div class="mb-5 header-container">
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
      ></v-text-field>

      <v-data-table
        :headers="headers"
        :items="authors"
        :search="search"
      >

      <template v-slot:item.birth_date="{ item }">
        <span>{{ item.birth_date }}</span>
      </template>

      <template v-slot:item.image_path="{ item }">
        <v-img :src="item.image_path" 
        max-height="100" max-width="100">
      </v-img>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-2" @click="() => {editAuthor(item.id)}">
          mdi-pencil
        </v-icon>
        <v-icon class="ml-2" icon="" @click="confirmDelete(item)">
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
</style>
  