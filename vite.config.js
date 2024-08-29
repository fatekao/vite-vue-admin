import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import vueJsx from '@vitejs/plugin-vue-jsx'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), VueSetupExtend()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  }
})
