<template>
  <ft-card title="分项统计">
    <div id="subItemPie" style="width: 100%; height: 300px"></div>
  </ft-card>
</template>

<script setup>
import { getPieTotal } from '@/api/dashboard'

import useEchartHooks from '@/echarts/hooks'
import { graphicPieCircle } from '@/echarts/conponents'

const echart = reactive({
  data: {},
  props: [
    { name: '分项1', key: 'subItem1' },
    { name: '分项2', key: 'subItem2' },
    { name: '分项3', key: 'subItem3' },
    { name: '分项4', key: 'subItem4' }
  ]
})

const onSearch = () => {
  getPieTotal().then(res => {
    echart.data = res.data
    initChart()
  })
}

onMounted(() => {
  onSearch()
})

const { renderChart, getLinearGradientColorList, legendIcon } = useEchartHooks('subItemPie')

const initChart = () => {
  const options = {
    color: getLinearGradientColorList(),
    legend: {
      orient: 'vertical',
      right: '10%',
      top: 'center',
      data: echart.props.map(item => {
        return {
          name: item.name,
          icon: legendIcon.square
        }
      })
    },
    tooltip: {},
    graphic: graphicPieCircle('subItemPie', ['40%', '50%']),
    series: [
      {
        type: 'pie',
        radius: ['40%', '80%'],
        center: ['40%', '50%'],
        label: {
          position: 'inner',
          formatter: '{d}%',
          color: '#fff'
        },
        data: echart.props.map(item => {
          return {
            name: item.name,
            value: echart.data[item.key]
          }
        })
      }
    ]
  }
  renderChart(options)
}
</script>
