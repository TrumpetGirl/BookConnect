<script setup>
  import { ref, onMounted } from 'vue';
  import { useSearchStore, useFileStore, useSnackbarStore } from '@/stores';
  import { storeToRefs } from 'pinia';

  const searchStore = useSearchStore();
  const snackbarStore = useSnackbarStore();
  const { searchText, searchValues } = storeToRefs(searchStore);

  const headers = [
    { title: 'Imagen', value: 'image_path' },
    { title: 'Descripción', value: 'description' }
  ];

  const groupBy = [ { key: 'type', order: 'asc' } ]

  onMounted(async () => {
    await searchStore.getAll();
    searchValues.value = searchValues.value.map(searchValue => ({
      ...searchValue,
      image_path: searchValue.image_path ? useFileStore().downloadImage(searchValue.image_path) : null
    }));
  });

</script>


<template>
  <v-container>
    <h2>¿Buscando nuevas lecturas?</h2>
    <v-text-field
      v-model="searchText"
      label="Buscar"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
      single-line
      class="custom-width mb-5"
    ></v-text-field>
    
    <v-data-table
      v-if="searchText.length > 0"
      :group-by="groupBy"
      :headers="headers"
      :items="searchValues"
      :search="searchText"
      class="custom-data-table"
    >
      <template v-slot:headers="{ columns }">
        <tr>
          <template v-for="column in columns" :key="column.key">
            <th class="font-weight-bold custom-header"><span>{{ column.title }}</span></th>
          </template>
        </tr>
      </template>

      <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
        <tr>
          <td :colspan="columns.length">
            <VBtn
              :icon="isGroupOpen(item) ? '$expand' : '$next'"
              size="small"
              variant="text"
              @click="toggleGroup(item)"
            ></VBtn>
            {{ item.value }}
          </td>
        </tr>
      </template>

      <template v-slot:item.image_path="{ item }">
        <v-avatar size ="100">
          <v-img :src="item.image_path"
          class="rounded-circle">
          </v-img>
        </v-avatar>
      </template>
    </v-data-table>
  </v-container>
</template>
  
<style scoped>
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

  .rounded-circle {
    border-radius: 50%;
    margin: auto;
  }
</style>
  
