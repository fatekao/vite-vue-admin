import { isLocal } from '@/utils/helper'

export const getAppIsCollapse = () => {
  const result = localStorage.getItem('appIsCollapse')
  return result === 'true' ? true : false
}

export const setAppIsCollapse = val => {
  localStorage.setItem('appIsCollapse', val)
}

export const getToken = () => {
  if (isLocal()) {
    return 'token'
  } else {
    const result = localStorage.getItem('token')
    return result
  }
}

export const setToken = val => {
  localStorage.setItem('token', val)
}

export const getUserInfo = () => {
  const result = sessionStorage.getItem('userInfo') ?? '{}'
  return JSON.parse(result)
}
export const setUserInfo = val => {
  const str = JSON.stringify(val || {})
  sessionStorage.setItem('userInfo', str)
}

export const clearStore = () => {
  localStorage.clear()
}
