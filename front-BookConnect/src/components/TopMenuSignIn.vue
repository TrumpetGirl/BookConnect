<script setup>
  import { useAuthStore } from '../stores/auth.js';
  const userName = 'Usuario';
  const profilePicture = 'profile-picture.png';
  let showDropdownMenu = false;

  const authStore = useAuthStore();

  const toggleDropdownMenu = () => {
    showDropdownMenu = !showDropdownMenu;
  };
</script>

<template>
  <div class="top-menu">
    <div class="container">
      <div class="title">
        <h1>BookConnect</h1> 
        <img class="logo" src="../assets/logo.png" alt="IconoBookConnect">
      </div>
      <div class="menu-right">
        <div class="welcome-message">Bienvenido/a, {{ userName }}</div>
        <img class="profile-picture" :src="profilePicture" @click="toggleDropdownMenu">
        <img class="logout-icon" src="../assets/logout-icon.png" @click="authStore.logout()">
      </div>
    </div>
    <div v-if="showDropdownMenu" class="dropdown-menu">
      <ul>
        <li>Buscador</li>
        <li>Mi colección</li>
        <li>Configuración</li>
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
  background-color: #f0f0f0;
}
</style>

