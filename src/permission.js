import router from '@/router'
import { getToken } from '@/utils/webStorage'
import { useUserStore } from '@/pinia'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 白名单
const whiteList = ['/login']
// 是否已加载路由
let routerIsLoaded = false

// 加载路由
export const loadRoute = async () => {
  const userStore = useUserStore()
  await userStore.getUserInfo()
  routerIsLoaded = true
}

// 路由导航
router.beforeEach(async (to, from, next) => {
  // 进度条开始
  NProgress.start()

  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // 跳转到登录页时，重置加载路由
  if (to.path === '/login') {
    routerIsLoaded = false
  }

  // 白名单内直接跳转直接进入
  if (whiteList.includes(to.path)) {
    next()
    return
  }

  // 判断是否登录
  if (getToken()) {
    // 判断路由是否加载
    if (routerIsLoaded) {
      // 路由已加载时，匹配到路由 ? 则直接进入 :跳转到404
      if (to.matched.length) {
        next()
      } else {
        next('/404')
      }
    } else {
      // 路由未加载时则等待路由加载完成后，进行下一步
      await loadRoute()
      next({ ...to, replace: true })
    }
  } else {
    // 未登录跳转到登录页
    // next({ path: '/login' })
    next()
  }
})

router.afterEach(() => {
  // 进度条结束
  NProgress.done()
})
