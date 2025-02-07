import { createRouter, createWebHashHistory } from 'vue-router'
import { authRoutes } from '@/modules/auth/routes/index'
import { reportRoutes } from '@/modules/report/routes'
const router = createRouter({
  history: createWebHashHistory('#'),
  routes: [
    {
      path: '/',
      redirect: { name: 'auth' },
    },
    authRoutes,
    reportRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
})

export default router
