import { createApp } from 'vue'
import App from './App.vue'

import pinia from './pinia'
import router from './router'
import plugins from './plugins'

import '@/style/index.scss'

// 路由校验
import './permission'

createApp(App).use(pinia).use(router).use(plugins).mount('#app')
