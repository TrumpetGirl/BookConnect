<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useSearchStore, useFileStore } from '@/stores'
  import { storeToRefs } from 'pinia'

  const searchStore = useSearchStore()
  const { searchText, searchValues } = storeToRefs(searchStore)
  const router = useRouter()

  const expanded = ref([])
  const headers = [
    { title: 'Imagen', value: 'image_path', filterable: false },
    { title: 'Descripción', value: 'description', filterable: true }
  ];

  const groupBy = [ { key: 'type', order: 'asc' } ]

  const viewItem = (item) => {
    if (item.type === 'Libro') {
      router.push({ name: 'bookInfo', params: { id: item.id } })
    } else if (item.type === 'Autor') {
      router.push({ name: 'authorInfo', params: { id: item.id } })
    } else if (item.type === 'Usuario') {
      router.push({ name: 'userInfo', params: { id: item.id } })
    }
  };

  onMounted(async () => {
    await searchStore.getAll()
    searchValues.value = searchValues.value.map(searchValue => ({
      ...searchValue,
      image_path: searchValue.image_path ? useFileStore().downloadImage(searchValue.image_path) : null
    }))
  })

  const customFilter = (value, search, item) => {
    if (!search) return true;
    return ['description'].some(key => { return item.columns[key].toString().toLowerCase().includes(search.toLowerCase()) })
  }

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
      v-if="searchText.length > 2"
      :group-by="groupBy"
      :expanded.sync="expanded"
      :headers="headers" 
      :items="searchValues"
      :search="searchText"
      :custom-filter="customFilter"
      class="custom-data-table"
      hide-default-footer
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
            <v-btn @click="toggleGroup(item)"
              :icon="isGroupOpen(item) ? '$expand' : '$next'"
              size="small"
              variant="text"
              :data-open="isGroupOpen"
            ></v-btn>
            {{ item.value }}
          </td>
        </tr>
      </template>

      <template v-slot:item.title="{ item }">
        <span class="item-title" @click="viewItem(item)">{{ item.title }}</span>
      </template>

      <template v-slot:item.image_path="{ item }">
        <v-avatar size="100">
          <v-img :src="item.image_path" class="rounded-circle"></v-img>
        </v-avatar>
      </template>

      <template v-slot:item.description="{ item }">
        <span class="item-description" @click="viewItem(item)">{{ item.description }}</span>
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

  .item-title, .item-description {
    text-decoration: underline;
    cursor: pointer;
    color: rgb(114, 114, 221);
  }

  .item-title:hover, .item-description:hover {
    color: darkblue;
  }
</style>
