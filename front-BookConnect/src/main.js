//import './assets/css/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/stores';

import App from './App.vue'
import router from './router'
import axios from 'axios'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { es } from "vuetify/locale";

const vuetify = createVuetify({
  components,
  directives,
  locale: {
    locale: "es",
    fallback: "es",
    messages: { es }
  },
  date: {
    locale: {
      es: 'es-ES'
    }
  }
})

axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Redirect to login page
        router.push('/login')
      } else {
        // Show a generic error message
        alert('An error occurred. Please try again later.')
      }
    }
    return Promise.reject(error)
  },
);

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

const authStore = useAuthStore();
await authStore.hasToken()

app.mount('#app')
