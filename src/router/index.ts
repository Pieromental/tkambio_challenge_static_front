import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from '@/modules/auth/routes/index'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'login' },
    },
    authRoutes,
  ],
})

export default router
