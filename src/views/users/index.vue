<template>
  <!-- 用户管理页面主容器：提供页面布局和背景 -->
  <div class="users-container">
    <!-- 卡片容器：白色背景卡片，包含所有用户管理功能 -->
    <el-card class="box-card">
      <!-- 卡片头部：左侧显示标题，右侧放置操作按钮 -->
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <!-- 主要操作按钮：用于打开添加用户的对话框 -->
          <el-button type="primary" size="small">添加用户</el-button>
        </div>
      </template>

      <!-- 筛选区域：提供用户搜索功能 -->
      <div class="filter-container">
        <!-- 搜索输入框：v-model 双向绑定搜索关键词，实时更新 -->
        <el-input
          v-model="searchQuery"
          placeholder="搜索用户"
          style="width: 200px"
          class="filter-item"
        />
        <!-- 搜索按钮：点击触发搜索操作 -->
        <el-button type="primary" class="filter-item">搜索</el-button>
      </div>

      <!-- 用户数据表格：展示用户列表信息 -->
      <el-table :data="userList" style="width: 100%" stripe>
        <!-- 表格列：用户唯一标识符 -->
        <el-table-column prop="id" label="ID" width="80" />
        <!-- 表格列：用户登录账号 -->
        <el-table-column prop="username" label="用户名" width="120" />
        <!-- 表格列：用户联系邮箱 -->
        <el-table-column prop="email" label="邮箱" width="180" />
        <!-- 表格列：用户手机号码 -->
        <el-table-column prop="mobile" label="手机号" width="120" />
        <!-- 表格列：用户权限角色 -->
        <el-table-column prop="role_name" label="角色" width="100" />
        <!-- 表格列：用户启用/禁用状态 -->
        <el-table-column prop="mg_state" label="状态" width="80">
          <template #default="scope">
            <!-- 状态开关：v-model 双向绑定，即时生效 -->
            <!-- scope.row 获取当前行数据 -->
            <el-switch v-model="scope.row.mg_state" />
          </template>
        </el-table-column>
        <!-- 表格列：操作按钮列 -->
        <el-table-column label="操作" width="200">
          <template #default>
            <!-- 编辑按钮：主要样式，用于修改用户信息 -->
            <el-button type="primary" size="small">编辑</el-button>
            <!-- 删除按钮：危险样式，用于移除用户 -->
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件：处理大量用户数据的分页展示 -->
      <div class="pagination-container">
        <el-pagination
          :current-page="1"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="15"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
// 导入 Vue 3 的 Composition API：ref 用于创建响应式数据，onMounted 是生命周期钩子
import { ref, onMounted } from 'vue'

// 定义响应式数据变量
// 搜索关键词，双向绑定到搜索输入框，初始为空字符串
const searchQuery = ref('')
// 用户列表数组，用于存储用户数据，初始为空数组
const userList = ref([])

// 组件挂载后的生命周期钩子：组件首次渲染后执行
onMounted(async () => {
  // 模拟从后端 API 获取用户数据
  // 在实际开发中，这里应该调用后端接口，例如：await api.getUserList()
  userList.value = [
    {
      id: '1001',
      username: '张三',
      email: 'zhangsan@example.com',
      mobile: '13800138001',
      role_name: '管理员',
      mg_state: true
    },
    {
      id: '1002',
      username: '李四',
      email: 'lisi@example.com',
      mobile: '13800138002',
      role_name: '普通用户',
      mg_state: true
    },
    {
      id: '1003',
      username: '王五',
      email: 'wangwu@example.com',
      mobile: '13800138003',
      role_name: '超级管理员',
      mg_state: false
    },
    {
      id: '1004',
      username: '赵六',
      email: 'zhaoliu@example.com',
      mobile: '13800138004',
      role_name: '普通用户',
      mg_state: true
    }
  ]

  // TODO: 实际开发中应该调用真实的后端 API
  // 示例：const response = await api.getUsers()
  //      userList.value = response.data
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
