import type { RouteRecordRaw } from 'vue-router'

export const reportRoutes: RouteRecordRaw = {
  path: '/main',
  name: 'main',
  redirect: { name: 'report' },
  component: () => import('@/modules/report/layout/ReportLayout.vue'),
  children: [
    {
      path: 'report',
      name: 'report',
      component: () => import('@/modules//report/views/ReportView.vue'),
    },
  ],
}
