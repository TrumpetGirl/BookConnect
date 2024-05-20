import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainView from '../views/MainView.vue'
import SearcherView from '../views/SearcherView.vue'
import BookView from '../views/BookView.vue'
import MyCollection from '../views/CollectionView.vue'
import AddAuthor from '../views/AddAuthorView.vue'
import { useAuthStore } from '../stores/auth.js';

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
      component: SearcherView, 
      meta: { 
        requiresAuth: true 
      }
    },
    {
      path: '/bookinfo',
      name: 'book',
      component: BookView
    },
    {
      path: '/mycollection',
      name: 'mycollection',
      component: MyCollection
    },
    {
      path: '/author',
      name: 'addAuthor',
      component: AddAuthor
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  console.log(from);
  console.log(to);
  console.log(to.meta.requiresAuth);
  console.log(authStore.isAuthenticated);
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router
