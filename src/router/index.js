import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/login',
    component: () => import('@/layout/Index.vue'),
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('@/views/Welcome/Index.vue')
      },
      {
        path: '/redirect/:pathMatch(.*)*',
        name: 'redirect',
        component: () => import('@/views/Redirect/Index.vue')
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/Error/404.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/Index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
