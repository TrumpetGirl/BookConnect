import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios'
import { useFileStore } from './file.store'
import { useSnackbarStore } from './snackbar.store'
import { useUserStore } from './user.store'
import * as constant from '@/utils/constants'
import * as navigation from '@/utils/navigation'
import { useSearchStore } from './search.store'

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({ 
    user: JSON.parse(localStorage.getItem('user')), 
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    returnPath: null
  }),
  getters: {
    isAdmin: (state) => state.user?.roleId === constant.adminRoleId
  },
  actions: {
    async login (username, password) {
      try {
        const response = await axios.post(`${baseUrl}/login`, { username, password })
        if (response.data.success) {
          this.user = response.data.user
          this.token = response.data.token
          localStorage.setItem("token", response.data.token)
          localStorage.setItem("user", JSON.stringify(this.user))
          this.user.image_path = useFileStore().downloadImage(this.user.image_path)
          this.isAuthenticated = true
          this.isAdmin ? navigation.redirectTo('/dashboard') : navigation.redirectTo('/search')
          useSnackbarStore().success(response.data.message)
        }
      } catch (error) {
        this.clearProperties()
        useSnackbarStore().error(error.response.data.message || "Error al iniciar sesión.")
      }
    },
    async register(user) {
      try {
        const response = await axios.post(`${baseUrl}/register`, user)
        if (response.data.success) {
          navigation.redirectTo("/user/login")
          useSnackbarStore().success(response.data.message)
        }
      } catch (error) {
        useSnackbarStore().error(error?.response?.data?.message || "Error al registrar usuario.")
      }
    },
    clearProperties() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.user = null
      this.isAuthenticated = false
      this.token = null
    },
    logout() {
      this.clearProperties()
      useSearchStore().searchText = ''
      router.push('/user/login')
    },
    async isLoggedIn() {
      try {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')
        if (user && token) {
          const response = (await axios.post(`${baseUrl}/checkLoggedUser`, JSON.parse(user))).data
          if (response.success) {
            this.isAuthenticated = true
            this.user = response.user
            this.user.image_path = useFileStore().downloadImage(response.user.image_path)
          } else {
            this.logout()
          }
        } else {
          this.logout()
        }
      } catch (error) {
        this.logout()
      }
    // async isLoggedIn() {
    //   const token = localStorage.getItem('token')
    //   const user = localStorage.getItem('user')
    //   let existsUser
    //   if (user) {
    //     existsUser = (await axios.post(`${baseUrl}/checkLoggedUser`, JSON.parse(user))).data
    //     if( !existsUser.success ) {
    //       this.clearProperties()
    //     } else {
    //       existsUser.user.image_path = useFileStore().downloadImage(existsUser.user.image_path)
    //       this.user = existsUser.user
    //     } 
    //   }
    //   if (token) {
    //     this.isAuthenticated = true
    //     this.token = token
    //   } else {
    //     this.isAuthenticated = false
    //     this.token = null
    //   }
    // }
    // }, 
    // isAdmin () {
    //   if (this.isAuthenticated && this.user && constant.adminRoleId === this.user.roleId)
    //     return true
    //   else
    //     return false
    // }
    }
  }
})