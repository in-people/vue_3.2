<template>
  <div class="reports-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ $t('reports.title') }}</span>
          <!-- 时间范围选择器 -->
          <el-select v-model="dateRange" size="small" style="width: 120px" @change="handleDateChange">
            <el-option :label="$t('reports.last7Days')" value="7" />
            <el-option :label="$t('reports.last30Days')" value="30" />
            <el-option :label="$t('reports.last90Days')" value="90" />
          </el-select>
        </div>
      </template>

      <!-- 关键指标卡片 -->
      <div class="statistics-cards">
        <div class="stat-card">
          <div class="stat-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
            <el-icon><User /></el-icon>
          </div>
          <div class="stat-content">
            <div class="stat-label">{{ $t('reports.totalUsers') }}</div>
            <div class="stat-value">{{ statistics.totalUsers }}</div>
            <div class="stat-trend up">
              <el-icon><Top /></el-icon>
              <span>12.5%</span>
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
            <el-icon><Goods /></el-icon>
          </div>
          <div class="stat-content">
            <div class="stat-label">{{ $t('reports.totalGoods') }}</div>
            <div class="stat-value">{{ statistics.totalGoods }}</div>
            <div class="stat-trend up">
              <el-icon><Top /></el-icon>
              <span>8.2%</span>
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
            <el-icon><Document /></el-icon>
          </div>
          <div class="stat-content">
            <div class="stat-label">{{ $t('reports.totalOrders') }}</div>
            <div class="stat-value">{{ statistics.totalOrders }}</div>
            <div class="stat-trend up">
              <el-icon><Top /></el-icon>
              <span>23.1%</span>
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)">
            <el-icon><Money /></el-icon>
          </div>
          <div class="stat-content">
            <div class="stat-label">{{ $t('reports.totalAmount') }}</div>
            <div class="stat-value">¥{{ formatAmount(statistics.totalAmount) }}</div>
            <div class="stat-trend up">
              <el-icon><Top /></el-icon>
              <span>15.6%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 图表区域 -->
      <div class="charts-container">
        <!-- 用户来源趋势图 -->
        <div class="chart-card">
          <div class="chart-header">
            <h3>{{ $t('reports.userSourceTrend') }}</h3>
          </div>
          <div class="chart-content">
            <div class="simple-chart">
              <div class="chart-bars">
                <div
                  v-for="(item, index) in chartData.series"
                  :key="index"
                  class="bar-group"
                >
                  <div class="bar-label">{{ item.name }}</div>
                  <div class="bar-container">
                    <div
                      v-for="(value, idx) in item.data"
                      :key="idx"
                      class="bar"
                      :style="{ height: getBarHeight(value), background: item.color }"
                    >
                      <el-tooltip
                        :content="`${item.name} - ${chartData.xAxis.data[idx]}: ${value}`"
                        placement="top"
                      >
                        <div class="bar-inner"></div>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
              </div>
              <div class="chart-legend">
                <div
                  v-for="(item, index) in chartData.series"
                  :key="index"
                  class="legend-item"
                >
                  <span class="legend-color" :style="{ background: item.color }"></span>
                  <span class="legend-label">{{ item.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 数据来源分布 -->
        <div class="chart-card">
          <div class="chart-header">
            <h3>{{ $t('reports.dataSourceDistribution') }}</h3>
          </div>
          <div class="chart-content">
            <div class="pie-chart">
              <div
                v-for="(item, index) in sourceData"
                :key="index"
                class="pie-item"
                :style="{ flex: item.percentage }"
              >
                <div class="pie-segment" :style="{ background: item.color }">
                  <el-tooltip :content="`${item.name}: ${item.percentage}%`" placement="top">
                    <span class="pie-label">{{ item.name }}</span>
                  </el-tooltip>
                </div>
              </div>
            </div>
            <div class="pie-legend">
              <div
                v-for="(item, index) in sourceData"
                :key="index"
                class="legend-item"
              >
                <span class="legend-color" :style="{ background: item.color }"></span>
                <span class="legend-label">{{ item.name }}</span>
                <span class="legend-value">{{ item.percentage }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 详细数据表格 -->
      <div class="table-container">
        <h3>{{ $t('reports.sourceDetails') }}</h3>
        <el-table :data="sourceDetails" style="width: 100%" stripe border>
          <el-table-column prop="source" :label="$t('reports.source')" width="150" />
          <el-table-column prop="monday" :label="$t('reports.monday')" width="100">
            <template #default="scope">
              {{ scope.row.monday }}
            </template>
          </el-table-column>
          <el-table-column prop="tuesday" :label="$t('reports.tuesday')" width="100">
            <template #default="scope">
              {{ scope.row.tuesday }}
            </template>
          </el-table-column>
          <el-table-column prop="wednesday" :label="$t('reports.wednesday')" width="100">
            <template #default="scope">
              {{ scope.row.wednesday }}
            </template>
          </el-table-column>
          <el-table-column prop="thursday" :label="$t('reports.thursday')" width="100">
            <template #default="scope">
              {{ scope.row.thursday }}
            </template>
          </el-table-column>
          <el-table-column prop="friday" :label="$t('reports.friday')" width="100">
            <template #default="scope">
              {{ scope.row.friday }}
            </template>
          </el-table-column>
          <el-table-column prop="saturday" :label="$t('reports.saturday')" width="100">
            <template #default="scope">
              {{ scope.row.saturday }}
            </template>
          </el-table-column>
          <el-table-column prop="sunday" :label="$t('reports.sunday')" width="100">
            <template #default="scope">
              {{ scope.row.sunday }}
            </template>
          </el-table-column>
          <el-table-column prop="total" :label="$t('reports.total')" width="100">
            <template #default="scope">
              <strong>{{ scope.row.total }}</strong>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { User, Goods, Document, Money, Top } from '@element-plus/icons-vue'
import { getLineChartData, getStatisticsData } from '@/api/reports'

// 时间范围
const dateRange = ref('7')

// 统计数据
const statistics = ref({
  totalUsers: 0,
  totalGoods: 0,
  totalOrders: 0,
  totalAmount: 0
})

// 图表数据
const chartData = ref({
  xAxis: {
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  series: []
})

// 数据来源分布
const sourceData = ref([
  { name: '直接访问', percentage: 35, color: '#409EFF' },
  { name: '搜索引擎', percentage: 30, color: '#67C23A' },
  { name: '邮件营销', percentage: 15, color: '#E6A23C' },
  { name: '联盟广告', percentage: 12, color: '#F56C6C' },
  { name: '视频广告', percentage: 8, color: '#909399' }
])

// 详细数据表格
const sourceDetails = ref([])

/**
 * 格式化金额
 */
const formatAmount = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 获取柱状图高度百分比
 */
const getBarHeight = (value) => {
  const maxValue = Math.max(...chartData.value.series.flatMap(s => s.data))
  return `${(value / maxValue) * 100}%`
}

/**
 * 获取统计数据
 */
const fetchStatisticsData = async () => {
  try {
    const response = await getStatisticsData()
    statistics.value = response
  } catch (error) {
    ElMessage.error('获取统计数据失败：' + error.message)
  }
}

/**
 * 获取图表数据
 */
const fetchChartData = async () => {
  try {
    const response = await getLineChartData()
    // 为每个系列添加颜色
    const colors = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399']
    chartData.value = {
      xAxis: response.xAxis,
      series: response.series.map((s, index) => ({
        ...s,
        color: colors[index]
      }))
    }

    // 计算详细数据表格
    sourceDetails.value = response.series.map(item => ({
      source: item.name,
      monday: item.data[0],
      tuesday: item.data[1],
      wednesday: item.data[2],
      thursday: item.data[3],
      friday: item.data[4],
      saturday: item.data[5],
      sunday: item.data[6],
      total: item.data.reduce((a, b) => a + b, 0)
    }))
  } catch (error) {
    ElMessage.error('获取图表数据失败：' + error.message)
  }
}

/**
 * 处理时间范围变化
 */
const handleDateChange = () => {
  fetchChartData()
}

// 组件挂载时获取数据
onMounted(() => {
  fetchStatisticsData()
  fetchChartData()
})
</script>

<style lang="scss" scoped>
.reports-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100%;
}

.box-card {
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  color: #333;
}

/* 统计卡片样式 */
.statistics-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 28px;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 14px;
  color: #909399;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 8px;
}

.stat-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;

  &.up {
    color: #67c23a;
  }

  &.down {
    color: #f56c6c;
  }
}

/* 图表容器样式 */
.charts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.chart-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chart-header {
  margin-bottom: 20px;

  h3 {
    font-size: 16px;
    font-weight: bold;
    color: #303133;
    margin: 0;
  }
}

.chart-content {
  min-height: 300px;
}

/* 简单柱状图样式 */
.simple-chart {
  width: 100%;
}

.chart-bars {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.bar-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.bar-label {
  width: 80px;
  font-size: 12px;
  color: #606266;
  text-align: right;
}

.bar-container {
  flex: 1;
  display: flex;
  gap: 2px;
  height: 120px;
  align-items: flex-end;
}

.bar {
  flex: 1;
  position: relative;
  min-height: 2px;
  border-radius: 2px 2px 0 0;
  transition: all 0.3s;

  &:hover {
    opacity: 0.8;
  }
}

.bar-inner {
  width: 100%;
  height: 100%;
}

.chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 10px 0;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #606266;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

/* 饼图样式 */
.pie-chart {
  display: flex;
  height: 120px;
  border-radius: 60px;
  overflow: hidden;
  margin-bottom: 20px;
}

.pie-item {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &:hover {
    filter: brightness(1.1);
  }
}

.pie-segment {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
}

.pie-label {
  padding: 0 10px;
  white-space: nowrap;
}

.pie-legend {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 表格容器样式 */
.table-container {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 16px;
    font-weight: bold;
    color: #303133;
    margin: 0 0 20px 0;
  }
}
</style>
