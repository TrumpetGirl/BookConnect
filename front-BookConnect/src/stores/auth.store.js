import { defineStore } from 'pinia';
import router from '@/router';
import axios from 'axios';
import { useUserStore } from './user.store';
import { useFileStore } from './file.store';
import * as constant from '@/utils/constants'

export const useAuthStore = defineStore('auth', {
  state: () => ({ 
    user: JSON.parse(localStorage.getItem('user')), 
    isAuthenticated: null,
    token: localStorage.getItem('token')
  }),
  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
  },
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post('http://localhost:3000/login', { username, password });
        this.user = response.data.user
        this.token = response.data.token
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(this.user))
        this.user.image_path = useFileStore().downloadImage(this.user.image_path)
        this.isAuthenticated = true
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
      this.isAuthenticated = null;
      this.token = null;
      router.push('/user/login');
    },
    async hasToken() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      let existsUser
      if (user) {
        existsUser = await useUserStore().existsUser(user)
        existsUser.image_path = useFileStore().downloadImage(existsUser.image_path)
        this.user = existsUser
      }
      if (token && existsUser) {
        this.isAuthenticated = true
        this.token = token
      } else {
        this.isAuthenticated = false
        this.token = null
      }
    }, 
    isAdmin () {
      return this.user && constant.adminRoleId === this.user.role;
    }
  }
})