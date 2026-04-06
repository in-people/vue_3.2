<template>
  <!-- 用户管理页面主容器：提供页面布局和背景 -->
  <div class="users-container">
    <!-- 卡片容器：白色背景卡片，包含所有用户管理功能 -->
    <el-card class="box-card">
      <!-- 卡片头部：左侧显示标题，右侧放置操作按钮 -->
      <template #header>
        <div class="card-header">
          <span>{{ $t('user.title') }}</span>
          <!-- 主要操作按钮：用于打开添加用户的对话框 -->
          <el-button type="primary" size="small" @click="handleAddDialog">{{ $t('user.addUser') }}</el-button>
        </div>
      </template>

      <!-- 筛选区域：提供用户搜索功能 -->
      <div class="filter-container">
        <!-- 搜索输入框：v-model 双向绑定搜索关键词，实时更新 -->
        <el-input
          v-model="searchQuery"
          :placeholder="$t('user.searchPlaceholder')"
          style="width: 200px"
          class="filter-item"
          clearable
          @clear="handleSearch"
        />
        <!-- 搜索按钮：点击触发搜索操作 -->
        <el-button type="primary" class="filter-item" @click="handleSearch">{{ $t('user.search') }}</el-button>
      </div>

      <!-- 用户数据表格：展示用户列表信息 -->
      <el-table :data="userList" style="width: 100%" stripe>
        <!-- 循环渲染表格列 -->
        <template v-for="(column, index) in tableColumns" :key="index">
          <!-- 状态列：使用自定义插槽 -->
          <el-table-column
            v-if="column.slot === 'state'"
            :prop="column.prop"
            :label="$t(column.labelKey)"
            :width="column.width"
          >
            <template #default="scope">
              <el-switch v-model="scope.row.mg_state" @change="handleStateChange(scope.row)" />
            </template>
          </el-table-column>

          <!-- 时间列：使用自定义插槽 -->
          <el-table-column
            v-else-if="column.slot === 'time'"
            :prop="column.prop"
            :label="$t(column.labelKey)"
            :width="column.width"
          >
            <template #default="scope">
              {{ formatTime(scope.row.create_time) }}
            </template>
          </el-table-column>

          <!-- 操作列：使用自定义插槽 -->
          <el-table-column
            v-else-if="column.slot === 'action'"
            :label="$t(column.labelKey)"
            :width="column.width"
          >
            <template #default="scope">
              <el-button type="primary" size="small" @click="handleEdit(scope.row)">{{ $t('common.edit') }}</el-button>
              <el-button type="danger" size="small" @click="handleDelete(scope.row)">{{ $t('common.delete') }}</el-button>
            </template>
          </el-table-column>

          <!-- 普通列：直接渲染 -->
          <el-table-column
            v-else
            :prop="column.prop"
            :label="$t(column.labelKey)"
            :width="column.width"
          />
        </template>
      </el-table>

      <!-- 编辑用户的弹窗(对话框)：包含用户信息编辑表单 -->
      <el-dialog
        v-model="editDialogVisible"
        :title="$t('user.editUser')"
        width="500px"
        @close="handleDialogClose"
      >
        <!-- 表单组件：包含编辑用户所需的所有字段 -->
        <el-form
          ref="editFormRef"
          :model="editForm"
          :rules="editFormRules"
          label-width="80px"
        >
          <!-- 用户名：只读字段，不可修改 -->
          <el-form-item :label="$t('user.username')" prop="username">
            <el-input v-model="editForm.username" disabled />
          </el-form-item>
          <!-- 邮箱：必填字段，需要验证格式 -->
          <el-form-item :label="$t('user.email')" prop="email">
            <el-input v-model="editForm.email" :placeholder="$t('user.emailPlaceholder')" />
          </el-form-item>
          <!-- 手机号：必填字段，需要验证格式 -->
          <el-form-item :label="$t('user.mobile')" prop="mobile">
            <el-input v-model="editForm.mobile" :placeholder="$t('user.mobilePlaceholder')" />
          </el-form-item>
          <!-- 角色：下拉选择框 -->
          <el-form-item :label="$t('user.role')" prop="role_name">
            <el-select v-model="editForm.role_name" :placeholder="$t('user.rolePlaceholder')" style="width: 100%">
              <el-option :label="$t('user.superAdmin')" value="超级管理员" />
              <el-option :label="$t('user.admin')" value="管理员" />
              <el-option :label="$t('user.normalUser')" value="普通用户" />
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 对话框底部按钮 -->
        <template #footer>
          <el-button @click="editDialogVisible = false">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" @click="handleEditSubmit">{{ $t('common.confirm') }}</el-button>
        </template>
      </el-dialog>

      <!-- 添加用户对话框：包含用户信息添加表单 -->
      <el-dialog
        v-model="addDialogVisible"
        :title="$t('user.addUser')"
        width="500px"
        @close="handleAddDialogClose"
      >
        <!-- 表单组件：包含添加用户所需的所有字段 -->
        <el-form
          ref="addFormRef"
          :model="addForm"
          :rules="addFormRules"
          label-width="80px"
        >
          <!-- 用户名：必填字段 -->
          <el-form-item :label="$t('user.username')" prop="username">
            <el-input v-model="addForm.username" :placeholder="$t('user.usernamePlaceholder')" />
          </el-form-item>
          <!-- 邮箱：必填字段，需要验证格式 -->
          <el-form-item :label="$t('user.email')" prop="email">
            <el-input v-model="addForm.email" :placeholder="$t('user.emailPlaceholder')" />
          </el-form-item>
          <!-- 手机号：必填字段，需要验证格式 -->
          <el-form-item :label="$t('user.mobile')" prop="mobile">
            <el-input v-model="addForm.mobile" :placeholder="$t('user.mobilePlaceholder')" />
          </el-form-item>
          <!-- 角色：下拉选择框 -->
          <el-form-item :label="$t('user.role')" prop="role_name">
            <el-select v-model="addForm.role_name" :placeholder="$t('user.rolePlaceholder')" style="width: 100%">
              <el-option :label="$t('user.superAdmin')" value="超级管理员" />
              <el-option :label="$t('user.admin')" value="管理员" />
              <el-option :label="$t('user.normalUser')" value="普通用户" />
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 对话框底部按钮 -->
        <template #footer>
          <el-button @click="addDialogVisible = false">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" @click="handleAddSubmit">{{ $t('common.confirm') }}</el-button>
        </template>
      </el-dialog>

      <!-- 分页组件：处理大量用户数据的分页展示 -->
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
// 导入 Vue i18n
import { useI18n } from 'vue-i18n'
// 导入 Element Plus 的消息提示和弹窗组件
import { ElMessage, ElMessageBox } from 'element-plus'
// 导入用户相关的 API 方法
import { getUsersList, deleteUser, updateUserState, updateUser, getUserById, addUser } from '@/api/users'
// 导入表格列配置
import { tableColumns } from './tableColumns'
// 导入时间格式化工具
import { formatTime } from '@/utils/filters'

// 使用 i18n
const { t } = useI18n()

// 定义响应式数据变量
// 搜索关键词，双向绑定到搜索输入框，初始为空字符串
const searchQuery = ref('')
// 用户列表数组，用于存储用户数据，初始为空数组
const userList = ref([])
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
  id: '',
  username: '',
  email: '',
  mobile: '',
  role_name: ''
})

// 表单验证规则
const editFormRules = {
  // 邮箱验证规则
  email: [
    { required: true, message: t('common.pleaseEnter') + t('user.email'), trigger: 'blur' },
    { type: 'email', message: t('user.emailPlaceholder'), trigger: ['blur', 'change'] }
  ],
  // 手机号验证规则（放宽：只需 11 位数字）
  mobile: [
    { required: true, message: t('common.pleaseEnter') + t('user.mobile'), trigger: 'blur' },
    { pattern: /^\d{11}$/, message: t('user.mobilePlaceholder'), trigger: ['blur', 'change'] }
  ],
  // 角色验证规则
  role_name: [
    { required: true, message: t('user.rolePlaceholder'), trigger: 'change' }
  ]
}

// 添加用户对话框相关数据
// 控制添加用户���话框的显示与隐藏
const addDialogVisible = ref(false)
// 添加表单的引用，用于表单验证
const addFormRef = ref(null)
// 添加表单的数据对象
const addForm = ref({
  username: '',
  email: '',
  mobile: '',
  role_name: ''
})

// 添加表单验证规则
const addFormRules = {
  // 用户名验证规则
  username: [
    { required: true, message: t('common.pleaseEnter') + t('user.username'), trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度在 2 到 20 个字符', trigger: ['blur', 'change'] }
  ],
  // 邮箱验证规则
  email: [
    { required: true, message: t('common.pleaseEnter') + t('user.email'), trigger: 'blur' },
    { type: 'email', message: t('user.emailPlaceholder'), trigger: ['blur', 'change'] }
  ],
  // 手机号验证规则
  mobile: [
    { required: true, message: t('common.pleaseEnter') + t('user.mobile'), trigger: 'blur' },
    { pattern: /^\d{11}$/, message: t('user.mobilePlaceholder'), trigger: ['blur', 'change'] }
  ],
  // 角色验证规则
  role_name: [
    { required: true, message: t('user.rolePlaceholder'), trigger: 'change' }
  ]
}

/**
 * 获取用户列表数据
 * 异步函数，从后端 API 获取用户数据并更新到响应式变量中
 */
const fetchUsersList = async () => {
  try {
    // 调用 API 获取用户列表，传递查询参数
    const response = await getUsersList({
      query: searchQuery.value,
      pagenum: pagination.value.pagenum,
      pagesize: pagination.value.pagesize
    })

    // console.log(response)

    // 更新用户列表数据
    userList.value = response.users
    // 更新总条数
    pagination.value.total = response.total
  } catch (error) {
    // 请求失败时显示错误提示
    ElMessage.error(t('user.fetchFailed') + '：' + error.message)
  }
}

/**
 * 处理搜索操作
 * 重置页码为第一页，然后重新获取数据
 */
const handleSearch = () => {
  pagination.value.pagenum = 1
  fetchUsersList()
}

/**
 * 处理用户状态切换
 * @param {Object} row - 当前行用户数据
 */
const handleStateChange = async (row) => {
  try {
    // 调用 API 更新用户状态
    await updateUserState(row.id, row.mg_state)
    // 显示成功提示
    const stateText = row.mg_state ? t('user.enabled') : t('user.disabled')
    ElMessage.success(t('user.stateChangeSuccess', { username: row.username, state: stateText }))
  } catch (error) {
    // 如果更新失败，恢复状态开关
    row.mg_state = !row.mg_state
    ElMessage.error(t('user.stateChangeFailed') + '：' + error.message)
  }
}

/**
 * 处理编辑用户操作
 * 打开编辑用户对话框，加载用户数据并预填充到表单
 * @param {Object} row - 当前行用户数据
 */
const handleEdit = async (row) => {
  try {
    // 调用 API 获取用户详情数据
    const response = await getUserById(row.id)

    // 将用户数据填充到表单中
    editForm.value = {
      id: response.id,
      username: response.username,
      email: response.email,
      mobile: response.mobile,
      role_name: response.role_name
    }

    // 打开编辑对话框
    editDialogVisible.value = true
  } catch (error) {
    // 获取用户详情失败
    ElMessage.error(t('user.getUserFailed') + '：' + error.message)
  }
}

/**
 * 处理删除用户操作
 * 弹出确认对话框，确认后调用删除 API
 * @param {Object} row - 当前行用户数据
 */
const handleDelete = async (row) => {
  try {
    // 弹出确认对话框，等待用户确认
    await ElMessageBox.confirm(
      t('user.deleteConfirm', { username: row.username }),
      t('dialog.deleteConfirmTitle'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    // 用户确认后，调用删除 API
    await deleteUser(row.id)

    // 显示成功提示
    ElMessage.success(t('user.deleteSuccess'))

    // 重新获取用户列表数据
    await fetchUsersList()
  } catch (error) {
    // 用户取消操作或删除失败
    if (error !== 'cancel') {
      ElMessage.error(t('user.deleteFailed') + '：' + error.message)
    }
  }
}

/**
 * 处理编辑表单提交
 * 验证表单后调用 API 更新用户信息
 */
const handleEditSubmit = async () => {
  try {
    // 验证表单
    await editFormRef.value.validate()

    // 调用 API 更新用户信息
    await updateUser(editForm.value.id, {
      email: editForm.value.email,
      mobile: editForm.value.mobile,
      role_name: editForm.value.role_name
    })

    // 显示成功提示
    ElMessage.success(t('user.updateSuccess'))

    // 关闭对话框
    editDialogVisible.value = false

    // 重新获取用户列表数据
    await fetchUsersList()
  } catch (error) {
    // 表单验证失败或更新失败
    if (error !== false) {
      ElMessage.error(t('user.updateFailed') + '：' + error.message)
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
    id: '',
    username: '',
    email: '',
    mobile: '',
    role_name: ''
  }
}

/**
 * 处理打开添加用户对话框
 * 清空表单并显示对话框
 */
const handleAddDialog = () => {
  // 清空表单数据
  addForm.value = {
    username: '',
    email: '',
    mobile: '',
    role_name: ''
  }
  // 打开对话框
  addDialogVisible.value = true
}

/**
 * 处理添加用户表单提交
 * 验证表单后调用 API 添加用户
 */
const handleAddSubmit = async () => {
  try {
    // 验证表单
    await addFormRef.value.validate()

    // 调用 API 添加用户
    await addUser(addForm.value)

    // 显示成功提示
    ElMessage.success(t('user.addSuccess'))

    // 关闭对话框
    addDialogVisible.value = false

    // 重新获取用户列表数据
    await fetchUsersList()
  } catch (error) {
    // 表单验证失败或添加失败
    if (error !== false) {
      ElMessage.error(t('user.addFailed') + '：' + error.message)
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
    username: '',
    email: '',
    mobile: '',
    role_name: ''
  }
}

/**
 * 处理每页显示条数变化
 * @param {Number} val - 新的每页显示条数
 */
const handleSizeChange = (val) => {
  pagination.value.pagesize = val
  pagination.value.pagenum = 1 // 改变每页条数时，重置为第一页
  fetchUsersList()
}

/**
 * 处理当前页码变化
 * @param {Number} val - 新的页码
 */
const handleCurrentChange = (val) => {
  pagination.value.pagenum = val
  fetchUsersList()
}

// 组件挂载后的生命周期钩子：组件首次渲染后执行
onMounted(() => {
  // 页面加载时获取用户列表数据
  fetchUsersList()
})
</script>

<style lang="scss" scoped>
/* ==================== 页面布局样式 ==================== */

/* 页面主容器样式 */
.users-container {
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
