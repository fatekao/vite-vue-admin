import { ElIcon } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const components = import.meta.glob('@/components/*/index.js', { eager: true })

export default {
  install(app) {
    app.component('ElIcon', ElIcon)
    Object.entries(ElementPlusIconsVue).forEach(([key, component]) => {
      app.component(key, component)
    })

    Object.keys(components).forEach(key => {
      const component = components[key].default
      app.component(component.name, component)
    })
  }
}
