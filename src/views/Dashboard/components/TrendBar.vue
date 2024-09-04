<template>
  <ft-card title="趋势分析">
    <template #extra>
      <el-date-picker v-model="search.form.date" type="daterange" @change="onSearch" />
    </template>
    <div id="trendBar" style="width: 100%; height: 300px"></div>
  </ft-card>
</template>

<script setup>
import { getTrendLine } from '@/api/dashboard'
import dayjs from 'dayjs'

import useEchartHooks from '@/echarts/hooks'

const search = reactive({
  form: {
    date: [dayjs().subtract(1, 'month').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]
  }
})

const echart = reactive({
  data: [],
  props: [
    { name: '分项1', key: 'subItem1', stack: 'subItem' },
    { name: '分项2', key: 'subItem2', stack: 'subItem' },
    { name: '分项3', key: 'subItem3', stack: 'subItem' },
    { name: '分项4', key: 'subItem4', stack: 'subItem' },
    { name: '合计', key: 'total', stack: 'total' }
  ]
})

const onSearch = () => {
  getTrendLine(search.form).then(res => {
    echart.data = res.data
    console.log(echart.data)
    initChart()
  })
}

onMounted(() => {
  onSearch()
})

const { renderChart, getLinearGradientColorList, legendIcon } = useEchartHooks('trendBar')

const initChart = () => {
  const options = {
    color: getLinearGradientColorList(),
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: 20
    },
    legend: {
      data: echart.props.map(item => {
        return {
          name: item.name,
          icon: legendIcon.line
        }
      })
    },
    xAxis: {
      type: 'category',
      data: echart.data.map(item => item.date)
    },
    yAxis: {
      type: 'value',
      name: 'unit'
    },
    series: echart.props.map((item, index) => ({
      name: item.name,
      type: 'bar',
      stack: item.stack,
      data: echart.data.map(i => i[item.key])
    }))
  }
  renderChart(options)
}
</script>
