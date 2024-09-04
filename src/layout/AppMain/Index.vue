<template>
  <section class="g-app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="tagStore.caches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script setup>
import { useTagStore } from '@/pinia'
const tagStore = useTagStore()
</script>

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
