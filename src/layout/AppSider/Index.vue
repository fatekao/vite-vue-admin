<template>
  <div class="g-app-sider" :class="{ collapse: appStore.isCollapse }">
    <div class="g-app-sider-content">
      <el-scrollbar>
        <el-menu :default-active="activeMenu" :collapse="appStore.isCollapse" class="g-sider-menu">
          <MenuItem :menus="userStore.routes"></MenuItem>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="g-app-sider-footer">
      <div class="toggle-sider">
        <template v-if="appStore.isCollapse">
          <ft-icon name="el-icon Expand" size="20" @click="toggleSider"></ft-icon>
        </template>
        <template v-else>
          <ft-icon name="el-icon Fold" size="20" @click="toggleSider"></ft-icon>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import MenuItem from './MenuItem.vue'
import { useAppStore, useUserStore } from '@/pinia'

const appStore = useAppStore()
const userStore = useUserStore()

const route = useRoute()
const activeMenu = computed(() => {
  return route.meta.activePath || route.path
})

const toggleSider = () => {
  appStore.toggleCollapse()
}
</script>

<style lang="scss" scoped>
.g-app-sider {
  width: $gAppSiderWidth;
  height: 100%;
  flex-shrink: 0;
  background: #fff;
  display: flex;
  transition: width 0.3s;
  &.collapse {
    width: $gAppSiderWidthCollapse;
  }
  .el-menu.el-menu--vertical {
    border-color: transparent;
  }
  .g-app-sider-content {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    padding: 16px 8px;
    box-sizing: border-box;
    :deep(.g-sider-menu) {
      --el-menu-item-height: 36px;
      --el-menu-sub-item-height: 36px;
      --el-menu-item-font-size: 14px;
      .el-menu-item,
      .el-sub-menu__title {
        margin: 2px 0;
      }
      .el-menu-item.is-active {
        background-color: var(--el-menu-hover-bg-color);
      }
    }
  }
  .g-app-sider-footer {
    flex-shrink: 0;
    width: 100%;
    height: 48px;
    border-top: 1px solid var(--el-border-color);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .toggle-sider {
      width: 30px;
      height: 30px;
      margin-left: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
}
</style>
