import { defineStore } from 'pinia';
import router from '@/router';
import axios from 'axios';
import { useUserStore } from './user.store';

export const useAuthStore = defineStore('auth', {
  state: () => ({ 
    user: JSON.parse(localStorage.getItem('user')), 
    isAuthenticated: null,
    token: localStorage.getItem('token'),
    adminRole: 1
  }),
  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
  },
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post('http://localhost:3000/login', { username, password });
        this.user = response.data.user;
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(this.user));
        this.isAuthenticated = true;
        return this.user.username + ', has iniciado sesión'
      } catch (error) {
        this.isAuthenticated = false;
        throw new Error(error.response.data.message || 'Error al iniciar sesión');
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.user = null;
      this.isAuthenticated = false;
      localStorage.setItem('logout', 'true');
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
      return this.user && this.adminRole === this.user.role;
    }
  }
})