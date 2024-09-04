<template>
  <div class="g-app-header">
    <div class="left">
      <img src="@/assets/images/vue.svg" class="logo" alt="vue" />
      <div class="app-name">Vite Vue Admin</div>
    </div>
    <div class="right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img :src="userStore.userInfo.avatar || DefaultUserAvatar" class="avatar" alt="头像" />
          <span class="name">{{ userStore.userInfo.nickName || '管理员' }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>账户设置</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import DefaultUserAvatar from '@/assets/images/default_user_avatar.jpg'
import { useUserStore } from '@/pinia'

const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.g-app-header {
  flex-shrink: 0;
  height: 48px;
  background-color: #fff;
  border-bottom: 1px solid #ebeef0;
  padding: 0 24px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 32px;
    height: 32px;
  }
  .app-name {
    margin-left: 8px;
    font-size: 24px;
    font-weight: bold;
  }
  .right {
    display: flex;
    align-items: center;
    .el-dropdown-link {
      padding: 8px 12px;
      display: flex;
      align-items: center;
      .name {
        margin-left: 8px;
      }
    }
  }
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
}
</style>
