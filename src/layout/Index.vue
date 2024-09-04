<template>
  <div class="g-app-layout">
    <AppHeader></AppHeader>
    <div class="g-app-container">
      <AppSider></AppSider>
      <div class="g-app-content">
        <AppTag></AppTag>
        <AppMain></AppMain>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from './AppHeader/Index.vue'
import AppSider from './AppSider/Index.vue'
import AppTag from './AppTag/Index.vue'
import AppMain from './AppMain/Index.vue'
</script>

<style lang="scss" scoped>
.g-app-layout {
  width: 100vw;
  height: 100vh;
  background-color: var(--el-bg-color-page);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .g-app-container {
    width: 100vw;
    height: calc(100vh - $gAppHeaderHeight);
    display: flex;
    .g-app-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: auto;
    }
  }
}
</style>
