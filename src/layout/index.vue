<template>
  <div class="app-wrapper" :class="{ hideSidebar: !$store.getters.siderType }">
    <aside class="sidebar-container" :style="{ width: asideWidth }">
      <Menu />
    </aside>
    <div class="main-container">
      <el-header><Headers /></el-header>
      <el-main>
        <router-view />
      </el-main>
    </div>
  </div>
</template>

<script setup>
import Menu from './Menu'
import Headers from './headers'
import { computed } from 'vue'
import variables from '@/styles/variables.scss'
import { useStore } from 'vuex'

const store = useStore()

const asideWidth = computed(() => {
  return store.getters.siderType
    ? variables.sideBarWidth
    : variables.hideSideBarWidth
})
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;

  &.hideSidebar {
    .main-container {
      margin-left: $hideSideBarWidth;
    }
  }
}

.sidebar-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1001;
  transition: width #{$sideBarDuration};
  background-color: #304156 !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
}

.main-container {
  margin-left: $sideBarWidth;
  min-height: 100vh;
  transition: margin-left #{$sideBarDuration};
  position: relative;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
}

::v-deep .el-header {
  padding: 0 20px;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
  height: 60px;
  line-height: 60px;
  flex-shrink: 0;
}

::v-deep .el-main {
  background-color: #f5f7fa;
  color: #333;
  padding: 20px;
  flex: 1;
  overflow-y: auto;
}
</style>
