<template>
  <el-config-provider :locale="config.locale">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.min.mjs'

const config = {
  locale: zhCn
}
</script>
