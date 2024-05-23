import { defineStore } from 'pinia';
import router from '@/router';
import axios from 'axios';
import { useUserStore } from './user.store';

export const useAuthStore = defineStore('auth', {
  state: () => ({ 
    user: JSON.parse(localStorage.getItem('user')), 
    isAuthenticated: null,
    token: localStorage.getItem('token')
  }),
  getters: {
    isLoggedIn: (state) => state.isAuthenticated
  },
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post('http://localhost:3000/login', { username, password });
        this.user = response.data.user;
        const user = {id: this.user.id, username: this.user.username}
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(user));
        this.isAuthenticated = true;
        router.push('/search');
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        isAuthenticated.value = false;
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.user = null;
      this.isAuthenticated = false;
      router.push('/user/login');
    },
    async hasToken() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      let existsUser
      if (user) {
        existsUser = (await useUserStore().existsUser(user)).data
      }
      if (token && existsUser) {
        this.isAuthenticated = true
        this.token = token
        return true
      } else {
        this.isAuthenticated = false
        this.token = null
        return false
      }
      
    }, 
    isAdmin () {
      return false
    }
  }
})