import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isAuthenticated = ref(false);
  const token = localStorage.getItem('token');

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      user.value = response.data.user;
      localStorage.setItem("token", response.data.token);
      isAuthenticated.value = true;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      isAuthenticated.value = false;
    }
  };

  const register = async (username, password) => {
    try {
      const response = await axios.post('/', { username, password });
      user.value = response.data.user;
    } catch (error) {
      console.error('Error al registrarse:', error);
      isAuthenticated.value = false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    user.value = null;
    isAuthenticated.value = false;
  };

  
  if (token) {
    isAuthenticated.value = true;
  }

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  };
});

export const useCounterStore = defineStore('auth', {
  state: () => ({ 
    user: null, 
    isAuthenticated: false
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
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
    }
  },
})