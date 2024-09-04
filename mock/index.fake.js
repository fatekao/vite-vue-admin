import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import user from './user'
import dashboard from './dashboard'

export default defineFakeRoute([...user, ...dashboard])
