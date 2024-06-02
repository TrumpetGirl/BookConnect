<script setup>
  import * as constant from '../../utils/constants' 
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore, useFileStore, useSnackbarStore } from '@/stores';
  import { storeToRefs } from 'pinia';

  const search = ref('');
  const headers = ref([
    { title: 'Nombre de usuario', value: 'username' },
    { title: 'Imagen', value: 'image_path' },
    { title: 'Editar / Eliminar', value: 'actions', sortable: false }
  ]);

  const userStore = useUserStore();
  const snackbarStore = useSnackbarStore();
  const { users } = storeToRefs(userStore);
  const router = useRouter();

  const addUser = () => {
    router.push('/user/create');
  };

  const editUser = (id) => {
    router.push({ name: 'editUser', params: { id } });
  };

  const viewUser = (id) => {
    router.push({ name: 'userInfo', params: { id } });
  };

  const confirmDelete = (user) => {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${user.username}?`)) {
      deleteUser(user.id, user.image_path);
    }
  };

  const deleteUser = async (id, image_path) => {
     try {
      if(image_path) {
        await useFileStore().deleteImage(image_path);
      }
      const response = await userStore.delete(id);
      snackbarStore.success(response);
     } catch (error) {
       snackbarStore.error('Error al eliminar el usuario');
     }
   };

  onMounted(async () => {
    await userStore.getAll();
    users.value = users.value.map(user => ({
      ...user,
      birth_date: constant.formatDateToLocaleES(user.birth_date),
      full_path: user.image_path ? useFileStore().downloadImage(user.image_path) : null
    }));
  });
</script>

<template>
  <v-container>
    <div class="header-container custom-width mb-5">
      <h2 class="title d-flex align-items-center">
        <v-icon class="mr-2">mdi-account-group</v-icon> 
        Usuarios
      </h2>
      <v-btn color="success" @click="addUser" prepend-icon="mdi-plus" variant="outlined" rounded="xl" class="add-user-button">
        Añadir Usuario
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
      :items="users"
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

      <template v-slot:item.username="{ item }">
        <span class="user-name" @click="viewUser(item.id)">{{ item.username}}</span>
      </template>

  
      <template v-slot:item.image_path="{ item }">
        <v-avatar size ="100">
          <v-img :src="item.full_path"
          class="rounded-circle">
          </v-img>
        </v-avatar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-2" @click="editUser(item.id)">
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

  .add-user-button {
    margin-left: 20px;
  }

  .custom-width {
    max-width: 50%;
    margin: auto;
  }

  .custom-data-table {
    max-width: 50%;
    background-color: #ffe6f0; 
    margin: auto;
  }

  .custom-header {
    background-color: #f8c6d6 !important; 
  }

  .user-name {
    text-decoration: underline;
    cursor: pointer;
    color: rgb(114, 114, 221);
  }

  .user-name:hover {
    color: darkblue;
  }

  .rounded-circle {
  border-radius: 50%;
  margin: auto;
  }
</style>
