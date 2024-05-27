<script setup>
  import { useAuthStore, useFileStore } from '@/stores';
  import { useRouter } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { onMounted, ref } from 'vue';

  let showDropdownMenu = ref(false);

  const authStore = useAuthStore();
  const router = useRouter();
  const fileStore = useFileStore();
  const { user }= storeToRefs(authStore);

  onMounted(async () => {
    user.value.image_path = await fileStore.downloadImage(user.value.image_path)
  })

  const loadImage = (image_path) => {
    if (image_path) {
      return "http://localhost:3000/file/download/" + image_path
    } else {
      return ""
    }
  };

  const toggleDropdownMenu = () => {
    showDropdownMenu.value = !showDropdownMenu.value;
  };
</script>

<template>
  <div class="top-menu">
    <div class="container">
      <div class="title">
        <h1>BookConnect</h1> 
        <img class="logo" src="../assets/images/logo.png" alt="IconoBookConnect">
      </div>
      <div class="menu-right">
        <div class="welcome-message">Bienvenido/a, {{ user.username }}</div>
        <img class="profile-picture" :src="user.image_path" @click="toggleDropdownMenu">
        <img class="logout-icon" src="../assets/images/logout-icon.png" @click="authStore.logout()" title="Cerrar sesión">
      </div>
    </div>
    <div v-if="showDropdownMenu" class="dropdown-menu">
      <ul>
        <li v-if="!authStore.isAdmin()" @click="router.push('/search');">Buscador</li>
        <li v-if="!authStore.isAdmin()">Mi colección</li>
        <li v-if="!authStore.isAdmin()">Configuración</li>

        <li v-if="authStore.isAdmin()" @click="router.push('/dashboard');">Dashboard</li>
        <li v-if="authStore.isAdmin()" @click="router.push('/book');">Listado libros</li>
        <li v-if="authStore.isAdmin()" @click="router.push('/author');">Listado autores</li>
        <li v-if="authStore.isAdmin()" @click="router.push('/user');">Listado usuarios</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.top-menu {
  background-color: #bdb9b9; 
  color: white;
  font-family: "Poetsen One", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.container {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between; 
  align-items: center; 
}

.title {
  display: flex;
  align-items: center;
}

h1 {
  margin-right: 30px;
}

.logo {
  width: 70px;
  height: 60px;
}

.menu-right {
  display: flex;
  align-items: center; 
}

.welcome-message {
  margin-right: 20px;
  font-size: larger;
  font-family: 'Tahoma';
}

.profile-picture {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 20px;
}

.logout-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 80px;
  right: 20px;
  background-color: #bdb9b9;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.dropdown-menu ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 10px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #fc9ec7;
}
</style>

