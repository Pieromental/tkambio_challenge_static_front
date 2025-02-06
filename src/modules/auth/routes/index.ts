import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw = {
  path: '/auth',
  name: 'auth',
  redirect: { name: 'login' },
  component: () => import('@/modules/auth/layout/AuthLayout.vue'),
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import('@/modules/auth/views/LoginView.vue'),
    },
  ],
}
