import request from './request'

/**
 * 获取折线图数据（用户来源统计）
 * @returns {Promise} 返回图表数据
 */
export function getLineChartData() {
  return request({
    url: '/reports/type/1',
    method: 'get'
  })
}

/**
 * 获取关键指标统计数据
 * @returns {Promise} 返回统计数据
 */
export function getStatisticsData() {
  return request({
    url: '/reports/statistics',
    method: 'get'
  })
}
