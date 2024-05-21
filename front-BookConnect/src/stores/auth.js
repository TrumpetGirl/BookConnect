import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({ 
    user: null, 
    isAuthenticated: null,
    token: null
  }),
  getters: {
    isLoggedIn: (state) => state.isAuthenticated
  },
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post('http://localhost:3000/login', { username, password });
        this.user = response.data.user;
        localStorage.setItem("token", response.data.token);
        this.isAuthenticated = true;
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        isAuthenticated.value = false;
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.user = null;
      this.isAuthenticated = false;
    },
    hasToken() {
      const token = localStorage.getItem('token')
      console.log(token)
      if (token) {
        this.isAuthenticated = true
        this.token = token
        return true
      }
      return false
    }
  },
})