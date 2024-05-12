import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainView from '../views/MainView.vue'
import SearcherView from '../views/SearcherView.vue'
import MyCollection from '../views/CollectionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/search',
      name: 'search',
      component: SearcherView
    },
    {
      path: '/mycollection',
      name: 'mycollection',
      component: MyCollection
    }
  ]
})

export default router
