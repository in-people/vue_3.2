<template>
  <div class="users-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <el-button type="primary" size="small">添加用户</el-button>
        </div>
      </template>

      <div class="filter-container">
        <el-input
          v-model="searchQuery"
          placeholder="搜索用户"
          style="width: 200px"
          class="filter-item"
        />
        <el-button type="primary" class="filter-item">搜索</el-button>
      </div>

      <el-table :data="userList" style="width: 100%" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="email" label="邮箱" width="180" />
        <el-table-column prop="mobile" label="手机号" width="120" />
        <el-table-column prop="role_name" label="角色" width="100" />
        <el-table-column prop="mg_state" label="状态" width="80">
          <template #default="scope">
            <el-switch v-model="scope.row.mg_state" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default>
            <el-button type="primary" size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

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
import { ref, onMounted } from 'vue'

const searchQuery = ref('')
const userList = ref([])

onMounted(async () => {
  // 模拟获取用户数据
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
})
</script>

<style lang="scss" scoped>
.users-container {
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

.filter-container {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.filter-item {
  margin-right: 10px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
