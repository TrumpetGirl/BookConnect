import { createRouter, createWebHistory } from 'vue-router'
import userRoutes from './user.routes'
import authorRoutes from './author.routes'
import bookRoutes from './book.routes'
import { Forbidden, Unauthorized, Dashboard, Searcher}  from '@/views'
import { useAuthStore } from '@/stores';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/user/login'
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/forbidden'
    },
    { ...userRoutes },
    { ...authorRoutes },
    { ...bookRoutes },
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
      meta: { requiresAdmin: true }
    }
  ]
})

const publicPages = ['/user/login', '/user/register', '/forbidden', '/unauthorized']

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const isLoggedIn = await authStore.hasToken()
  const isAdmin = authStore.isAdmin()
  const isPublicPage = publicPages.includes(to.path)
  // if (isLoggedIn) {
  //   if (isPublicPage) {
  //     if (isAdmin) {
  //       next('/dashboard');
  //     } else {
  //       next('/search');
  //     }
  //   } else if (to.meta.requiresAdmin && !isAdmin) {
  //     next('/unauthorized');
  //   } else {
  //     next();
  //   }
  // } else {
  //   if (isPublicPage) {
  //     next();
  //   } else {
  //     next('/forbidden');
  //   }
  // }

  // Si el usuario no está conectado y trata de acceder a una página pública, permite la navegación
  if (!isLoggedIn) {
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
        next('/unauthorized');
      } else {
        next();
      }
    }
  }
});

export default router
