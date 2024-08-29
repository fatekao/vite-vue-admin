export const getAppIsCollapse = () => {
  const result = localStorage.getItem('appIsCollapse')
  return result === 'true' ? true : false
}

export const setAppIsCollapse = val => {
  localStorage.setItem('appIsCollapse', val)
}
