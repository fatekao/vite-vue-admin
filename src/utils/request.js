import axios from 'axios'

import { getToken } from '@/utils/webStorage'
import qs from 'qs'

const service = axios.create({
  baseURL: '/api',
  withCredentials: false, // 是否携带cookie
  timeout: 60000 // 超时响应
})

// 字节流下载flag
let isBlob = false

// axios拦截器 - 请求头拦截
service.interceptors.request.use(
  config => {
    // 根据请求头判断是否为字节流
    isBlob = config.responseType === 'blob'

    // 处理头部信息：添加token
    config.headers.Authorization = getToken()

    // 请求为表单时
    if (config.contentType === 'form') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    // get请求包含数组时,参数进行qs序列化
    if (config.method === 'get') {
      config.paramsSerializer = params => {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    }

    // 请求参数为空时默认给个空对象，undefined和null有一些后端会说报错。
    config.data = config.data || {}
    config.params = config.params || {}
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// axios拦截器 - 响应拦截
service.interceptors.response.use(
  response => {
    // 如果为字节流，直接抛出字节流，不走code验证
    if (isBlob) {
      return response
    }

    const res = response.data

    // 后台返回非200处理
    if (res.code !== 200) {
      ElMessage({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 401: token失效
      if (res.code === 401) {
        ElMessageBox.confirm('登录失效，请重新登录', '提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const router = useRouter()
          router.push('/login')
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    // 异常抛出错误并弹个消息
    ElMessage({
      message: error,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
