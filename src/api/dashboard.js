import request from '@/utils/request'

// 获取饼图统计
export function getPieTotal(params) {
  return request({
    url: '/dashboard/pieTotal',
    method: 'get',
    params
  })
}

// 获取趋势分析
export function getTrendLine(params) {
  return request({
    url: '/dashboard/trendLine',
    method: 'get',
    params
  })
}
