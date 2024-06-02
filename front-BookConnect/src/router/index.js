import { createRouter, createWebHistory } from 'vue-router'
import userRoutes from './user.routes'
import authorRoutes from './author.routes'
import bookRoutes from './book.routes'
import collectionRoutes from './collection.routes'
import { Forbidden, Unauthorized, Dashboard, Searcher}  from '@/views'
import { useAuthStore } from '@/stores';
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/user/login'
    },
    { ...userRoutes },
    { ...authorRoutes },
    { ...bookRoutes },
    { ...collectionRoutes },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: Forbidden
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: Unauthorized
    },
    {
      path: '/search',
      name: 'search',
      component: Searcher
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard, 
      meta: { requiresAdmin: true}
    }
  ]
})

const publicPages = ['/user/login', '/user/register']

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const { isAuthenticated } = storeToRefs(authStore)
  
  if (isAuthenticated.value == null) await authStore.hasToken()
  const isAdmin = authStore.isAdmin()
  const isPublicPage = publicPages.includes(to.path)
 
  // Si el usuario no está conectado y trata de acceder a una página pública, permite la navegación
  if (!isAuthenticated.value) {
    if (isPublicPage) {
      next();
    } else {
      next('/user/login');
    }
  } else {
    // Si el usuario está conectado y trata de acceder a una página pública, redirige según su rol
    if (isPublicPage) {
       if (isAdmin) {
         next('/dashboard');
       } else {
         next('/search');
       }
    } else {
      // Si el usuario está conectado y la ruta requiere autorización especial, maneja los roles
      if (to.meta.requiresAdmin && !isAdmin) {
        next('/forbidden');
      } else {
        next();
      }
    }
  }
});

export default router