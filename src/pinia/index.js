import useAppStore from './modules/app'
import useUserStore from './modules/user'
import useTagStore from './modules/tag'

const pinia = createPinia()

export { useAppStore, useUserStore, useTagStore }
export default pinia
