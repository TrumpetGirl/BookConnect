// import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const vuetify = createVuetify({
  components,
  directives,
  
})

axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axios.interceptors.response.use(
  (response) => {
    console.log(response)
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

app.mount('#app')
