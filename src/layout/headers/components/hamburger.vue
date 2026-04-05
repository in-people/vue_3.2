<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon :icon="icon"></svg-icon>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

const toggleClick = () => {
  store.commit('app/changeSiderType')
}

const icon = computed(() => {
  return store.getters.siderType ? 'hamburger-opened' : 'hamburger-closed'
})
</script>

<style lang="scss" scoped>
.hamburger-container {
  margin-right: 16px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 24px;
  color: #303133;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  height: 60px;
  transition: color 0.3s;
  min-width: 40px;
  position: relative;
  z-index: 10;

  &:hover {
    color: #409EFF;
    background-color: rgba(64, 158, 255, 0.1);
  }

  :deep(.svg-icon) {
    width: 1em !important;
    height: 1em !important;
    display: block !important;
  }
}
</style>
