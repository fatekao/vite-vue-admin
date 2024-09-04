// src/hooks/echarts
import echarts from '@/echarts'
import { debounce } from 'lodash-es'
import { getLinearGradientColorList, getLinearGradientcolor } from './color'
import { legendIcon } from './legend'

const useEchartHooks = id => {
  let chart = null
  let options = null

  const renderChart = val => {
    return new Promise((resolve, reject) => {
      options = val
      if (!chart) {
        chart = echarts.init(document.getElementById(id), 'customed')
        resolve(chart)

        // nextTick防止样式未组装完成就开始渲染页面
        nextTick(() => {
          chart.setOption(options, true)
        })
      }

      // nextTick防止样式未组装完成就开始渲染页面
      nextTick(() => {
        chart.setOption(options, true)
      })
    })
  }

  const state = reactive({
    resize: null
  })

  const sidebarResize = e => {
    if (e.propertyName === 'width') {
      state.resize()
    }
  }

  const initListener = () => {
    state.resize = debounce(() => {
      resize()
    }, 100)
    window.addEventListener('resize', state.resize)

    // 监听侧边菜单栏-宽度
    state.sidebarEle = document.querySelector('.g-app-sider')
    state.sidebarEle && state.sidebarEle.addEventListener('transitionend', sidebarResize)
  }
  const destroyListener = () => {
    window.removeEventListener('resize', state.resize)
    state.resize = null

    state.sidebarEle && state.sidebarEle.removeEventListener('transitionend', sidebarResize)
  }

  const resize = () => {
    chart && chart.resize()
  }
  onMounted(() => {
    initListener()
  })

  onActivated(() => {
    if (!state.resize) {
      initListener()
    }
  })

  onBeforeUnmount(() => {
    destroyListener()
    chart && chart.dispose()
    chart = null
  })

  onDeactivated(() => {
    destroyListener()
  })
  return { renderChart, getLinearGradientColorList, getLinearGradientcolor, legendIcon, chart }
}

export default useEchartHooks
