<template>
  <template v-for="item in menus" :key="item.path">
    <el-sub-menu v-if="hasChildren(item)" :index="item.path">
      <template #title>
        <ft-icon v-if="item.meta.icon" class="el-icon" :name="item.meta.icon" size="20px"></ft-icon>
        <span class="nav-title">{{ item.meta.title }}</span>
      </template>
      <menu-item :menus="item.children"></menu-item>
    </el-sub-menu>
    <el-menu-item v-else :index="item.path" @click="linkTo(item.path)">
      <ft-icon v-if="item.meta.icon" class="el-icon" :name="item.meta.icon" size="20px"></ft-icon>
      <span class="nav-title">{{ item.meta.title }}</span>
    </el-menu-item>
  </template>
</template>

<script setup>
defineProps({
  menus: {
    type: Array,
    default: () => []
  }
})
const hasChildren = val => {
  let flag = false
  if (Array.isArray(val.children) && val.children.length > 0) {
    for (const item of val.children) {
      if (item.visible !== false) {
        flag = true
        break
      }
    }
  }
  return flag
}

const router = useRouter()

const linkTo = path => {
  router.push(path)
}
</script>
