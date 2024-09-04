export const innerRoutes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/Dashboard/Index.vue'),
    meta: {
      title: '首页看板',
      icon: 'iconfont icon-dashboard',
      keepAlive: true
    }
  },
  {
    path: '/system',
    name: 'system',
    redirect: '/system/user',
    meta: {
      title: '系统设置',
      icon: 'iconfont icon-setting'
    },
    children: [
      {
        path: '/system/user',
        name: 'system:user',
        component: () => import('@/views/System/User/Index.vue'),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: '/system/role',
        name: 'system:role',
        component: () => import('@/views/System/Role/Index.vue'),
        meta: {
          title: '角色管理'
        }
      },
      {
        path: '/system/auth',
        name: 'system:auth',
        component: () => import('@/views/System/Auth/Index.vue'),
        meta: {
          title: '权限管理'
        }
      }
    ]
  }
]
