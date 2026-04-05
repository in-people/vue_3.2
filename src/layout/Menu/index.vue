<template>
  <el-menu
    active-text-color="#ffd04b"
    :background-color="variables.menuBg"
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    text-color="#fff"
    router
    unique-opened
    :collapse="!$store.getters.siderType"
  >
    <el-sub-menu
      :index="item.id"
      v-for="(item, index) in menusList"
      :key="item.id"
    >
      <template #title>
        <el-icon>
          <component :is="iconList[index]"></component>
        </el-icon>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item
        :index="'/' + it.path"
        v-for="it in item.children"
        :key="it.id"
        @click="savePath(it.path)"
      >
        <template #title>
          <el-icon>
            <component :is="icon"></component>
          </el-icon>
          <span>{{ $t(`menus.${it.path}`) }}</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { menuList } from '@/api/menu'
import { ref } from 'vue'
import variables from '@/styles/variables.scss'

const iconList = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart'])
const icon = ref('menu')

const defaultActive = ref(sessionStorage.getItem('path') || '/users')
const menusList = ref([])
const initMenusList = async () => {
  menusList.value = await menuList()
}
initMenusList()

const savePath = (path) => {
  sessionStorage.setItem('path', `/${path}`)
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo {
  border-right: none;
  height: 100%;
  background-color: #304156 !important;
  width: 100% !important;
}

:deep(.el-sub-menu) {
  .el-sub-menu__title {
    color: #fff !important;
    font-size: 14px;
    transition: all 0.3s;
    background-color: #304156 !important;
    height: 56px;
    line-height: 56px;
    padding: 0 20px !important;

    &:hover {
      background-color: #263445 !important;
      color: #ffd04b !important;
    }

    .el-sub-menu__icon-arrow {
      color: #fff !important;
    }

    .el-icon {
      width: 18px;
      margin-right: 8px;
    }
  }

  .el-menu {
    background-color: #1f2d3d !important;

    .el-menu-item {
      color: #fff !important;
      font-size: 14px;
      transition: all 0.3s;
      background-color: #1f2d3d !important;
      padding-left: 45px !important;
      height: 56px;
      line-height: 56px;

      &:hover {
        background-color: #263445 !important;
        color: #ffd04b !important;
      }

      &.is-active {
        color: #ffd04b !important;
        background-color: #1f2d3d !important;
      }

      .el-icon {
        width: 14px;
        margin-right: 6px;
      }
    }
  }
}

// 收起状态样式
.hideSidebar {
  .el-menu-vertical-demo {
    width: 64px !important;

    :deep(.el-sub-menu) {
      .el-sub-menu__title {
        padding: 0 20px !important;

        span {
          display: none;
        }

        .el-sub-menu__icon-arrow {
          display: none;
        }

        .el-icon {
          margin-right: 0;
          width: 20px;
        }
      }

      // 修复弹出式子菜单的颜色问题
      .el-menu--popup {
        .el-menu-item {
          color: #fff !important;  // 默认白色

          &:hover {
            color: #ffd04b !important;  // 悬停时黄色
            background-color: #263445 !important;
          }

          &.is-active {
            color: #ffd04b !important;  // 激活状态黄色
          }
        }
      }

      .el-menu {
        .el-menu-item {
          padding: 0 20px !important;

          span {
            display: none;
          }

          .el-icon {
            margin-right: 0;
            width: 20px;
          }
        }
      }
    }
  }
}
</style>
