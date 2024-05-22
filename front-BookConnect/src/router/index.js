import { createRouter, createWebHistory } from 'vue-router'
import userRoutes from './user.routes'
import LoginView from '../views/LoginView.vue'
import MainView from '../views/MainView.vue'
import SearcherView from '../views/SearcherView.vue'
import BookView from '../views/BookView.vue'
import MyCollection from '../views/CollectionView.vue'
import AddAuthor from '../views/AddAuthorView.vue'
import AuthorsView from '../views/AuthorsView.vue'
import AddBook from '../views/AddBookView.vue'
import { useAuthStore } from '@/stores';

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
      path: '/add/author',
      name: 'addAuthor',
      component: AddAuthor
    },
    {
      path: '/allAuthors',
      name: 'Authors',
      component: AuthorsView
    },
    {
      path: '/add/book',
      name: 'addBook',
      component: AddBook
    },
    {
      ...userRoutes
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !(await authStore.hasToken())) {
    next('/login');
  } else {
    next();
  }
});

export default router
