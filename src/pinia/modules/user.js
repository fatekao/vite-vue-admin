import { getToken, setToken, getUserInfo as getUserInfoStore, setUserInfo } from '@/utils/webStorage'
import { login, logout } from '@/api/user'
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
    login(data) {
      return new Promise((resolve, reject) => {
        login(data)
          .then(res => {
            this.token = res.data
            setToken(this.token)
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
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
    },
    logout() {
      return new Promise((resolve, reject) => {
        logout()
          .then(res => {
            resolve(res)
          })
          .catch(res => {
            reject(res)
          })
          .finally(() => {
            this.fedlogout()
          })
      })
    },
    fedlogout() {
      clearStore()
      router.push('/login')
      window.location.reload()
    }
  }
})

export default useUserStore
