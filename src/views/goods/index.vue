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
          <el-button type="primary" size="small" @click="handleAddDialog">添加商品</el-button>
        </div>
      </template>

      <!-- 筛选区域：提供商品搜索功能 -->
      <div class="filter-container">
        <!-- 搜索输入框：v-model 双向绑定搜索关键词，实时更新 -->
        <el-input
          v-model="searchQuery"
          placeholder="搜索商品"
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
        <!-- 循环渲染表格列 -->
        <template v-for="(column, index) in tableColumns" :key="index">
          <!-- 价格列：使用自定义插槽 -->
          <el-table-column
            v-if="column.slot === 'price'"
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
          >
            <template #default="scope">
              ￥{{ scope.row.goods_price }}
            </template>
          </el-table-column>

          <!-- 重量列：使用自定义插槽 -->
          <el-table-column
            v-else-if="column.slot === 'weight'"
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
          >
            <template #default="scope">
              {{ scope.row.goods_weight }}g
            </template>
          </el-table-column>

          <!-- 状态列：使用自定义插槽 -->
          <el-table-column
            v-else-if="column.slot === 'state'"
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
          >
            <template #default="scope">
              <el-tag :type="getStateType(scope.row.goods_state)">
                {{ getStateText(scope.row.goods_state) }}
              </el-tag>
            </template>
          </el-table-column>

          <!-- 促销列：使用自定义插槽 -->
          <el-table-column
            v-else-if="column.slot === 'promote'"
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
          >
            <template #default="scope">
              <el-tag :type="scope.row.is_promote ? 'danger' : 'info'" size="small">
                {{ scope.row.is_promote ? '是' : '否' }}
              </el-tag>
            </template>
          </el-table-column>

          <!-- 时间列：使用自定义插槽 -->
          <el-table-column
            v-else-if="column.slot === 'time'"
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
          >
            <template #default="scope">
              {{ formatDate(scope.row.add_time) }}
            </template>
          </el-table-column>

          <!-- 操作列：使用自定义插槽 -->
          <el-table-column
            v-else-if="column.slot === 'action'"
            :label="column.label"
            :width="column.width"
            :fixed="column.fixed"
          >
            <template #default="scope">
              <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>

          <!-- 普通列：直接渲染 -->
          <el-table-column
            v-else
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
            :show-overflow-tooltip="column.showOverflowTooltip"
          />
        </template>
      </el-table>

      <!-- 编辑商品的弹窗(对话框)：包含商品信息编辑表单 -->
      <el-dialog
        v-model="editDialogVisible"
        title="编辑商品"
        width="600px"
        @close="handleDialogClose"
      >
        <!-- 表单组件：包含编辑商品所需的所有字段 -->
        <el-form
          ref="editFormRef"
          :model="editForm"
          :rules="editFormRules"
          label-width="100px"
        >
          <!-- 商品ID：只读字段，不可修改 -->
          <el-form-item label="商品ID" prop="goods_id">
            <el-input v-model="editForm.goods_id" disabled />
          </el-form-item>
          <!-- 商品名称：必填字段 -->
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="editForm.goods_name" placeholder="请输入商品名称" />
          </el-form-item>
          <!-- 商品价格：必填字段 -->
          <el-form-item label="价格" prop="goods_price">
            <el-input-number v-model="editForm.goods_price" :min="0" :precision="2" style="width: 100%" />
          </el-form-item>
          <!-- 商品数量：必填字段 -->
          <el-form-item label="数量" prop="goods_number">
            <el-input-number v-model="editForm.goods_number" :min="0" style="width: 100%" />
          </el-form-item>
          <!-- 商品重量：必填字段 -->
          <el-form-item label="重量(克)" prop="goods_weight">
            <el-input-number v-model="editForm.goods_weight" :min="0" style="width: 100%" />
          </el-form-item>
          <!-- 商品介绍：可选字段 -->
          <el-form-item label="商品介绍" prop="goods_introduce">
            <el-input v-model="editForm.goods_introduce" type="textarea" :rows="3" placeholder="请输入商品介绍" />
          </el-form-item>
        </el-form>
        <!-- 对话框底部按钮 -->
        <template #footer>
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEditSubmit">确定</el-button>
        </template>
      </el-dialog>

      <!-- 添加商品对话框：包含商品信息添加表单 -->
      <el-dialog
        v-model="addDialogVisible"
        title="添加商品"
        width="600px"
        @close="handleAddDialogClose"
      >
        <!-- 表单组件：包含添加商品所需的所有字段 -->
        <el-form
          ref="addFormRef"
          :model="addForm"
          :rules="addFormRules"
          label-width="100px"
        >
          <!-- 商品名称：必填字段 -->
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="addForm.goods_name" placeholder="请输入商品名称" />
          </el-form-item>
          <!-- 商品分类：必填字段 -->
          <el-form-item label="商品分类" prop="goods_cat">
            <el-cascader
              v-model="addForm.goods_cat_arr"
              :options="categoryOptions"
              :props="{ expandTrigger: 'hover' }"
              placeholder="请选择商品分类"
              style="width: 100%"
              clearable
            />
          </el-form-item>
          <!-- 商品价格：必填字段 -->
          <el-form-item label="价格" prop="goods_price">
            <el-input-number v-model="addForm.goods_price" :min="0" :precision="2" style="width: 100%" />
          </el-form-item>
          <!-- 商品数量：必填字段 -->
          <el-form-item label="数量" prop="goods_number">
            <el-input-number v-model="addForm.goods_number" :min="0" style="width: 100%" />
          </el-form-item>
          <!-- 商品重量：必填字段 -->
          <el-form-item label="重量(克)" prop="goods_weight">
            <el-input-number v-model="addForm.goods_weight" :min="0" style="width: 100%" />
          </el-form-item>
          <!-- 商品介绍：可选字段 -->
          <el-form-item label="商品介绍" prop="goods_introduce">
            <el-input v-model="addForm.goods_introduce" type="textarea" :rows="3" placeholder="请输入商品介绍" />
          </el-form-item>
        </el-form>
        <!-- 对话框底部按钮 -->
        <template #footer>
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleAddSubmit">确定</el-button>
        </template>
      </el-dialog>

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
import { getGoodsList, deleteGoods, updateGoods, getGoodsById, addGoods } from '@/api/goods'
// 导入表格列配置
import { tableColumns } from './tableColumns'

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

// 编辑对话框相关数据
// 控制编辑对话框的显示与隐藏
const editDialogVisible = ref(false)
// 编辑表单的引用，用于表单验证
const editFormRef = ref(null)
// 编辑表单的数据对象
const editForm = ref({
  goods_id: '',
  goods_name: '',
  goods_price: 0,
  goods_number: 0,
  goods_weight: 0,
  goods_introduce: ''
})

// 表单验证规则
const editFormRules = {
  // 商品名称验证规则
  goods_name: [
    { required: true, message: '请输入商品名称', trigger: 'blur' },
    { min: 2, max: 50, message: '商品名称长度在 2 到 50 个字符', trigger: ['blur', 'change'] }
  ],
  // 商品价格验证规则
  goods_price: [
    { required: true, message: '请输入商品价格', trigger: 'blur' }
  ],
  // 商品数量验证规则
  goods_number: [
    { required: true, message: '请输入商品数量', trigger: 'blur' }
  ],
  // 商品重量验证规则
  goods_weight: [
    { required: true, message: '请输入商品重量', trigger: 'blur' }
  ]
}

// 添加商品对话框相关数据
// 控制添加商品对话框的显示与隐藏
const addDialogVisible = ref(false)
// 添加表单的引用，用于表单验证
const addFormRef = ref(null)
// 添加表单的数据对象
const addForm = ref({
  goods_name: '',
  // eslint-disable-next-line camelcase
  goods_cat: '',
  goods_cat_arr: [],
  goods_price: 0,
  goods_number: 0,
  goods_weight: 0,
  goods_introduce: ''
})

// 商品分类选项（模拟三级分类）
const categoryOptions = [
  {
    value: '1',
    label: '家用电器',
    children: [
      {
        value: '5',
        label: '���机',
        children: [
          { value: '12', label: '智能手机' },
          { value: '13', label: '老人机' }
        ]
      },
      {
        value: '4',
        label: '平板',
        children: [
          { value: '18', label: 'iPad' },
          { value: '19', label: 'Android平板' }
        ]
      }
    ]
  },
  {
    value: '3',
    label: '数码产品',
    children: [
      {
        value: '6',
        label: '电脑',
        children: [
          { value: '8', label: '游戏本' },
          { value: '9', label: '轻薄本' }
        ]
      }
    ]
  }
]

// 添加表单验证规则
const addFormRules = {
  // 商品名称验证规则
  goods_name: [
    { required: true, message: '请输入商品名称', trigger: 'blur' },
    { min: 2, max: 50, message: '商品名称长度在 2 到 50 个字符', trigger: ['blur', 'change'] }
  ],
  // 商品分类验证规则
  goods_cat_arr: [
    { required: true, message: '请选择商品分类', trigger: 'change' }
  ],
  // 商品价格验证规则
  goods_price: [
    { required: true, message: '请输入商品价格', trigger: 'blur' }
  ],
  // 商品数量验证规则
  goods_number: [
    { required: true, message: '请输入商品数量', trigger: 'blur' }
  ],
  // 商品重量验证规则
  goods_weight: [
    { required: true, message: '请输入商品重量', trigger: 'blur' }
  ]
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
 * 格式化时间戳为可读的日期时间格式
 * @param {Number} timestamp - Unix 时间戳（秒）
 * @returns {String} 格式化后的日期时间字符串
 */
const formatDate = (timestamp) => {
  if (!timestamp) return '-'
  const date = new Date(timestamp * 1000)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

/**
 * 获取商品状态文本
 * @param {Number} state - 商品状态（0: 未通过, 1: 审核中, 2: 已审核）
 * @returns {String} 状态文本
 */
const getStateText = (state) => {
  const stateMap = {
    0: '未通过',
    1: '审核中',
    2: '已审核'
  }
  return stateMap[state] || '未知'
}

/**
 * 获取商品状态标签类型
 * @param {Number} state - 商品状态
 * @returns {String} 标签类型
 */
const getStateType = (state) => {
  const typeMap = {
    0: 'danger',
    1: 'warning',
    2: 'success'
  }
  return typeMap[state] || 'info'
}

/**
 * 处理编辑商品操作
 * 打开编辑商品对话框，加载商品数据并预填充到表单
 * @param {Object} row - 当前行商品数据
 */
const handleEdit = async (row) => {
  try {
    // 调用 API 获取商品详情数据
    const response = await getGoodsById(row.goods_id)

    // 将商品数据填充到表单中
    editForm.value = {
      goods_id: response.goods_id,
      goods_name: response.goods_name,
      goods_price: response.goods_price,
      goods_number: response.goods_number,
      goods_weight: response.goods_weight,
      goods_introduce: response.goods_introduce || ''
    }

    // 打开编辑对话框
    editDialogVisible.value = true
  } catch (error) {
    // 获取商品详情失败
    ElMessage.error('获取商品信息失败：' + error.message)
  }
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
 * 处理编辑表单提交
 * 验证表单后调用 API 更新商品信息
 */
const handleEditSubmit = async () => {
  try {
    // 验证表单
    await editFormRef.value.validate()

    // 调用 API 更新商品信息
    await updateGoods(editForm.value.goods_id, {
      goods_name: editForm.value.goods_name,
      goods_price: editForm.value.goods_price,
      goods_number: editForm.value.goods_number,
      goods_weight: editForm.value.goods_weight,
      goods_introduce: editForm.value.goods_introduce
    })

    // 显示成功提示
    ElMessage.success('商品信息更新成功')

    // 关闭对话框
    editDialogVisible.value = false

    // 重新获取商品列表数据
    await fetchGoodsList()
  } catch (error) {
    // 表单验证失败或更新失败
    if (error !== false) {
      ElMessage.error('更新失败：' + error.message)
    }
  }
}

/**
 * 处理对话框关闭事件
 * 重置表单状态
 */
const handleDialogClose = () => {
  // 重置表单验证状态
  editFormRef.value?.resetFields()
  // 清空表单数据
  editForm.value = {
    goods_id: '',
    goods_name: '',
    goods_price: 0,
    goods_number: 0,
    goods_weight: 0,
    goods_introduce: ''
  }
}

/**
 * 处理打开添加商品对话框
 * 清空表单并显示对话框
 */
const handleAddDialog = () => {
  // 清空表单数据
  addForm.value = {
    goods_name: '',
    // eslint-disable-next-line camelcase
    goods_cat: '',
    goods_cat_arr: [],
    goods_price: 0,
    goods_number: 0,
    goods_weight: 0,
    goods_introduce: ''
  }
  // 打开对话框
  addDialogVisible.value = true
}

/**
 * 处理添加商品表单提交
 * 验证表单后调用 API 添加商品
 */
const handleAddSubmit = async () => {
  try {
    // 验证表单
    await addFormRef.value.validate()

    // 将分类数组转换为逗号分隔的字符串
    // eslint-disable-next-line camelcase
    const goods_cat = addForm.value.goods_cat_arr.join(',')

    // 调用 API 添加商品
    await addGoods({
      goods_name: addForm.value.goods_name,
      // eslint-disable-next-line camelcase
      goods_cat,
      goods_price: addForm.value.goods_price,
      goods_number: addForm.value.goods_number,
      goods_weight: addForm.value.goods_weight,
      goods_introduce: addForm.value.goods_introduce
    })

    // 显示成功提示
    ElMessage.success('商品添加成功')

    // 关闭对话框
    addDialogVisible.value = false

    // 重新获取商品列表数据
    await fetchGoodsList()
  } catch (error) {
    // 表单验证失败或添加失败
    if (error !== false) {
      ElMessage.error('添加失败：' + error.message)
    }
  }
}

/**
 * 处理添加对话框关闭事件
 * 重置表单状态
 */
const handleAddDialogClose = () => {
  // 重置表单验证状态
  addFormRef.value?.resetFields()
  // 清空表单数据
  addForm.value = {
    goods_name: '',
    // eslint-disable-next-line camelcase
    goods_cat: '',
    goods_cat_arr: [],
    goods_price: 0,
    goods_number: 0,
    goods_weight: 0,
    goods_introduce: ''
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
