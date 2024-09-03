import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import user from './user'

export default defineFakeRoute([...user])
