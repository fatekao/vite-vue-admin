export const innerRoutes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/Dashboard/Index.vue'),
    meta: {
      title: '首页看板',
      icon: 'el-icon-dashboard',
      keepAlive: true
    }
  }
]
