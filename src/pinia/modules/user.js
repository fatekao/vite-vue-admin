import { getToken, setToken, getUserInfo as getUserInfoStore, setUserInfo } from '@/utils/webStorage'
import { isLocal } from '@/utils/helper'
import { innerRoutes } from '@/router/router.config'
import router from '@/router'
import { flattenTree } from '@/utils/dealData'

// 动态加载路由，先引入静态文件
const modules = import.meta.glob('../../views/**/*.vue')

const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getToken(),
      userInfo: getUserInfoStore(),
      routes: [],
      buttons: []
    }
  },
  actions: {
    getUserInfo() {
      return new Promise((resolve, reject) => {
        if (isLocal) {
          this.userInfo = {
            nickName: '怪大叔'
          }
          this.buttons = ['system:role:delete', 'system:role:config']
          this.routes = innerRoutes

          // 本地化个人信息
          setUserInfo(this.userInfo)
          // 动态加载路由
          this.rouets = innerRoutes
          flattenTree(this.routes).forEach(item => {
            router.addRoute('layout', item)
          })
          resolve(this.userInfo)
        } else {
          // TODO: 从接口获取用信息
          console.log('api: getUserInfo')
        }
      })
    }
  }
})

export default useUserStore
