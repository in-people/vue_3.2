<template>
  <!-- 商品管理页面主容器：提供页面布局和背景 -->
  <div class="goods-container">
    <!-- 卡片容器：白色背景卡片，包含所有商品管理功能 -->
    <el-card class="box-card">
      <!-- 卡片头部：左侧显示标题，右侧放置操作按钮 -->
      <template #header>
        <div class="card-header">
          <span>商品管理</span>
          <!-- 主要操作按钮：用于打开添加商品的对话框 -->
          <el-button type="primary" size="small" @click="handleAdd">添加商品</el-button>
        </div>
      </template>

      <!-- 筛选区域：提供商品搜索功能 -->
      <div class="filter-container">
        <!-- 搜索输入框：v-model 双向绑定搜索关键词，实时更新 -->
        <el-input
          v-model="searchQuery"
          placeholder="搜索商品名称"
          style="width: 200px"
          class="filter-item"
          clearable
          @clear="handleSearch"
        />
        <!-- 搜索按钮：点击触发搜索操作 -->
        <el-button type="primary" class="filter-item" @click="handleSearch">搜索</el-button>
      </div>

      <!-- 商品数据表格：展示商品列表信息 -->
      <el-table :data="goodsList" style="width: 100%" stripe border>
        <!-- 表格列：商品唯一标识符 -->
        <el-table-column prop="goods_id" label="商品ID" width="100" />
        <!-- 表格列：商品名称 -->
        <el-table-column prop="goods_name" label="商品名称" width="300" />
        <!-- 表格列：商品价格（元） -->
        <el-table-column prop="goods_price" label="价格" width="120">
          <template #default="scope">
            ￥{{ scope.row.goods_price }}
          </template>
        </el-table-column>
        <!-- 表格列：商品库存数量 -->
        <el-table-column prop="goods_number" label="数量" width="100" />
        <!-- 表格列：商品重量（克） -->
        <el-table-column prop="goods_weight" label="重量" width="100">
          <template #default="scope">
            {{ scope.row.goods_weight }}g
          </template>
        </el-table-column>
        <!-- 表格列：商品上架状态 -->
        <el-table-column prop="goods_state" label="状态" width="100">
          <template #default="scope">
            <!-- 状态标签：根据状态显示不同颜色 -->
            <el-tag :type="scope.row.goods_state === 1 ? 'success' : 'info'">
              {{ scope.row.goods_state === 1 ? '已审核' : '未审核' }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- 表格列：商品热度值 -->
        <el-table-column prop="hot_mumber" label="热度" width="100" />
        <!-- 表格列：是否促销 -->
        <el-table-column prop="is_promote" label="促销" width="80">
          <template #default="scope">
            <!-- 促销标签：根据促销状态显示 -->
            <el-tag :type="scope.row.is_promote ? 'danger' : 'info'" size="small">
              {{ scope.row.is_promote ? '是' : '否' }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- 表格列：创建时间 -->
        <el-table-column prop="add_time" label="创建时间" width="180">
          <template #default="scope">
            {{ formatDate(scope.row.add_time) }}
          </template>
        </el-table-column>
        <!-- 表格列：操作按钮列 -->
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="scope">
            <!-- 编辑按钮：主要样式，用于修改商品信息 -->
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <!-- 删除按钮：危险样式，用于移除商品 -->
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件：处理大量商品数据的分页展示 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="pagination.pagenum"
          v-model:page-size="pagination.pagesize"
          :page-sizes="[10, 20, 30, 50]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
// 导入 Vue 3 的 Composition API：ref 用于创建响应式数据，onMounted 是生命周期钩子
import { ref, onMounted } from 'vue'
// 导入 Element Plus 的消息提示和弹窗组件
import { ElMessage, ElMessageBox } from 'element-plus'
// 导入商品相关的 API 方法
import { getGoodsList, deleteGoods } from '@/api/goods'

// 定义响应式数据变量
// 搜索关键词，双向绑定到搜索输入框，初始为空字符串
const searchQuery = ref('')
// 商品列表数组，用于存储商品数据，初始为空数组
const goodsList = ref([])
// 分页数据对象，存储分页相关信息
const pagination = ref({
  pagenum: 1, // 当前页码
  pagesize: 10, // 每页显示条数
  total: 0 // 总条数
})

/**
 * 格式化时间戳为可读的日期时间格式
 * @param {Number} timestamp - Unix 时间戳（毫秒）
 * @returns {String} 格式化后的日期时间字符串
 */
const formatDate = (timestamp) => {
  if (!timestamp) return '-'
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

/**
 * 获取商品列表数据
 * 异步函数，从后端 API 获取商品数据并更新到响应式变量中
 */
const fetchGoodsList = async () => {
  try {
    // 调用 API 获取商品列表，传递查询参数
    const response = await getGoodsList({
      query: searchQuery.value,
      pagenum: pagination.value.pagenum,
      pagesize: pagination.value.pagesize
    })

    // 更新商品列表数据
    goodsList.value = response.goods
    // 更新总条数
    pagination.value.total = response.total
  } catch (error) {
    // 请求失败时显示错误提示
    ElMessage.error('获取商品列表失败：' + error.message)
  }
}

/**
 * 处理搜索操作
 * 重置页码为第一页，然后重新获取数据
 */
const handleSearch = () => {
  pagination.value.pagenum = 1
  fetchGoodsList()
}

/**
 * 处理添加商品操作
 * TODO: 打开添加商品对话框，实现表单填写和提交功能
 */
const handleAdd = () => {
  ElMessage.info('添加商品功能开发中...')
}

/**
 * 处理编辑商品操作
 * TODO: 打开编辑商品对话框，预填充数据并实现更新功能
 * @param {Object} row - 当前行商品数据
 */
const handleEdit = (row) => {
  ElMessage.info('编辑商品功能开发中... 商品ID: ' + row.goods_id)
}

/**
 * 处理删除商品操作
 * 弹出确认对话框，确认后调用删除 API
 * @param {Object} row - 当前行商品数据
 */
const handleDelete = async (row) => {
  try {
    // 弹出确认对话框，等待用户确认
    await ElMessageBox.confirm(
      `确定要删除商品 "${row.goods_name}" 吗？此操作不可恢复！`,
      '删除确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    // 用户确认后，调用删除 API
    await deleteGoods(row.goods_id)

    // 显示成功提示
    ElMessage.success('删除成功')

    // 重新获取商品列表数据
    await fetchGoodsList()
  } catch (error) {
    // 用户取消操作或删除失败
    if (error !== 'cancel') {
      ElMessage.error('删除失败：' + error.message)
    }
  }
}

/**
 * 处理每页显示条数变化
 * @param {Number} val - 新的每页显示条数
 */
const handleSizeChange = (val) => {
  pagination.value.pagesize = val
  pagination.value.pagenum = 1 // 改变每页条数时，重置为第一页
  fetchGoodsList()
}

/**
 * 处理当前页码变化
 * @param {Number} val - 新的页码
 */
const handleCurrentChange = (val) => {
  pagination.value.pagenum = val
  fetchGoodsList()
}

// 组件挂载后的生命周期钩子：组件首次渲染后执行
onMounted(() => {
  // 页面加载时获取商品列表数据
  fetchGoodsList()
})
</script>

<style lang="scss" scoped>
/* ==================== 页面布局样式 ==================== */

/* 页面主容器样式 */
.goods-container {
  padding: 20px;                      /* 内边距：与边缘保持距离 */
  background-color: #f5f7fa;           /* 背景色：浅灰色，与主内容区背景一致 */
  min-height: 100%;                    /* 最小高度：确保至少占满屏幕高度 */
}

/* ==================== 卡片组件样式 ==================== */

/* 卡片容器样式 */
.box-card {
  border-radius: 4px;                  /* 圆角半径：4像素圆角 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);  /* 阴影效果：卡片浮在背景上的立体感 */
}

/* 卡片头部样式 */
.card-header {
  display: flex;                       /* 使用弹性布局 */
  justify-content: space-between;     /* 主轴对齐：两端对齐（标题在左，按钮在右） */
  align-items: center;                 /* 交叉轴对齐：垂直居中 */
  font-weight: bold;                   /* 字体加粗：强调标题重要性 */
  font-size: 16px;                     /* 字体大小：16像素 */
  color: #333;                         /* 文字颜色：深灰色，确保可读性 */
}

/* ==================== 筛选区域样式 ==================== */

/* 筛选容器样式 */
.filter-container {
  margin-bottom: 20px;                 /* 下外边距：与表格保持距离 */
  display: flex;                       /* 弹性布局：横向排列子元素 */
  gap: 10px;                          /* 子元素间距：使用现代CSS gap属性，替代margin */
}

/* 筛选项样式 */
.filter-item {
  margin-right: 10px;                  /* 右外边距：元素之间的间距 */
}

/* ==================== 分页组件样式 ==================== */

/* 分页容器样式 */
.pagination-container {
  margin-top: 20px;                    /* 上外边距：与表格保持距离 */
  display: flex;                       /* 弹性布局 */
  justify-content: flex-end;           /* 主轴对齐：右对齐，分页通常在右侧 */
}
</style>
