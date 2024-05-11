<template>
    <div class="menu">
      <div class="menu-left">
        <div class="title">
          <h1 style="margin-right: 10px;">BookConnect</h1>
          <img src="../assets/logo.png" alt="Icono" style="width: 65px; height: 55px;">
        </div>
      </div>
      <div class="menu-center">
      
      </div>
      <div class="menu-right">
      
        <div class="welcome-message">Bienvenido/a, {{ userName }}</div>
        
        <img class="profile-picture" :src="profilePicture" @click="toggleDropdownMenu">

        <img class="logout-icon" src="../assets/logout-icon.png" @click="logout">
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
  
  <script>
  export default {
    data() {
      return {
        userName: "Usuario", 
        profilePicture: "profile-picture.png", 
        showDropdownMenu: false 
      };
    },
    methods: {
      toggleDropdownMenu() {
        this.showDropdownMenu = !this.showDropdownMenu;
      },
      logout() {
        
      }
    }
  };
  </script>
  
  <style scoped>
  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #bdb9b9;
    color: white;
  }
  
  .menu-left {
    flex: 1;
  }
  
  .menu-center {
    flex: 1;
    text-align: center;
  }
  
  .menu-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  
  .title {
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
  