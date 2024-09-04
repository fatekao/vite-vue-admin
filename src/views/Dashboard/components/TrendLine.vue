<template>
  <ft-card title="趋势分析">
    <template #extra>
      <el-date-picker v-model="search.form.date" type="daterange" @change="onSearch" />
    </template>
    <div id="trendLine" style="width: 100%; height: 300px"></div>
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
    { name: '分项1', key: 'subItem1' },
    { name: '分项2', key: 'subItem2' },
    { name: '分项3', key: 'subItem3' },
    { name: '分项4', key: 'subItem4' }
  ]
})

const onSearch = () => {
  getTrendLine(search.form).then(res => {
    echart.data = res.data
    initChart()
  })
}

onMounted(() => {
  onSearch()
})

const { renderChart, legendIcon } = useEchartHooks('trendLine')

const initChart = () => {
  const options = {
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
    series: echart.props.map(item => ({ name: item.name, type: 'line', data: echart.data.map(i => i[item.key]) }))
  }
  renderChart(options)
}
</script>
