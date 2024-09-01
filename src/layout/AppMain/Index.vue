<template>
  <section class="g-app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </router-view>
  </section>
</template>

<style lang="scss" scoped>
.g-app-main {
  width: 100%;
  height: calc(100vh - $gAppHeaderHeight - $gAppTagHeight);
  padding: 16px;
  box-sizing: border-box;
  overflow: auto;
}
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: opacity 0.5s;
}
.fade-transform-enter,
.fade-transform-leave-to {
  opacity: 0;
}
</style>
