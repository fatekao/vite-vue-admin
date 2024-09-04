<template>
  <div class="g-app-tag">
    <el-scrollbar ref="scrollbarRef">
      <div class="g-app-tags-content" ref="tagsRef">
        <template v-for="item in tagStore.list" :key="item.path">
          <div class="g-app-tags-item" @click="tagChoose(item)" @contextmenu.prevent="openTagMenu(item)" :class="{ active: item.path === route.path }">
            <span>{{ item.meta.title }}</span>
            <ft-icon name="el-icon Close" @click.stop="tagClose(item)" />
          </div>
        </template>
      </div>
    </el-scrollbar>
    <div class="g-app-tags-control">
      <div class="prev" @click="tagsMove(-1)">
        <ft-icon name="el-icon ArrowLeft" />
      </div>
      <div class="next" @click="tagsMove(1)">
        <ft-icon name="el-icon ArrowRight" />
      </div>
    </div>
    <div v-show="tagMenu.visible" class="g-app-tags-menu" :style="{ width: tagMenu.width + 'px', left: tagMenu.x + 'px', top: tagMenu.y + 'px' }">
      <div v-show="tagMenu.currentTag.path === tagStore.active.path" class="g-app-tags-menu-item" @click="tagRefresh(tagMenu.currentTag)">刷新</div>
      <div class="g-app-tags-menu-item" @click="tagClose(tagMenu.currentTag)">关闭</div>
      <div v-show="tagStore.list.length > 1" class="g-app-tags-menu-item" @click="tagCloseOther(tagMenu.currentTag)">关闭其他</div>
      <div class="g-app-tags-menu-item" @click="tagCloseAll()">关闭所有</div>
    </div>
  </div>
</template>

<script setup>
import { useTagStore } from '@/pinia'

const route = useRoute()
const tagStore = useTagStore()

// tag移动（上一个，下一个）
const tagsMove = num => {
  const nextTags = tagStore.list[tagStore.activeIdx + num]
  if (nextTags) {
    tagChoose(nextTags)
  }
}

// tag跳转
const router = useRouter()
const tagChoose = val => {
  router.push(val.path)
}

// tag刷新
const tagRefresh = val => {
  const idx = tagStore.caches.findIndex(item => item === val.name)
  tagStore.caches.splice(idx, 1)
  router.replace({
    path: '/redirect' + val.fullPath,
    query: route.query
  })
}
// tag关闭
const tagClose = val => {
  tagStore.removeTag(val).then(() => {
    if (val.path === route.path) {
      router.push(tagStore.pathList[0] || '/welcome')
    }
  })
}
// tag关闭其他
const tagCloseOther = val => {
  tagStore.removeOtherTags(val).then(newTag => {
    newTag && router.push(newTag.path)
  })
}
// tag关闭所有
const tagCloseAll = val => {
  tagStore.removeAllTags().then(() => {
    router.push('/welcome')
  })
}

const scrollbarRef = ref()
const tagsRef = ref()
// 滚动到当前激活的tag
const moveToActiveTag = () => {
  const items = tagsRef.value.children
  const activeItem = items[tagStore.activeIdx]
  if (!scrollbarRef.value || tagStore.activeIdx === -1) return

  const activeItemRect = activeItem.getBoundingClientRect()
  const firstItemRect = items[0].getBoundingClientRect()
  const scrollbarRect = scrollbarRef.value.wrapRef.getBoundingClientRect()

  if (activeItemRect.left < scrollbarRect.left) {
    scrollbarRef.value.setScrollLeft(activeItemRect.left - firstItemRect.left)
  } else if (activeItemRect.right > scrollbarRect.right) {
    scrollbarRef.value.setScrollLeft(activeItemRect.right - scrollbarRect.width - firstItemRect.left)
  }
}

// 监听路由变化，插入新的tag并跳转到正确位置
watch(
  () => route.fullPath,
  () => {
    tagStore.addTag(route)
    nextTick(() => {
      moveToActiveTag()
    })
  },
  { flush: 'post', immediate: true }
)

const tagMenu = reactive({
  width: 100,
  x: 0,
  y: 0,
  currentTag: '',
  visible: false
})
// tag右键菜单弹出
const openTagMenu = tag => {
  tagMenu.currentTag = { ...tag }
  const currentTagIdx = tagStore.list.findIndex(item => item.path === tag.path)
  const currentTag = tagsRef.value.children[currentTagIdx]
  const { x, y, width, height } = currentTag.getBoundingClientRect()
  tagMenu.x = x + width / 2 - tagMenu.width / 2
  tagMenu.y = y + height + 8
  tagMenu.visible = true
}
// tag右键菜单关闭
const closeTagMenu = () => {
  tagMenu.visible = false
}
// 监听tag右键菜单，绑定or取消关闭事件
watch(
  () => tagMenu.visible,
  val => {
    val ? document.body.addEventListener('click', closeTagMenu) : document.body.removeEventListener('click', closeTagMenu)
  }
)
// 卸载组件时，移除绑定事件
onUnmounted(() => {
  document.body.removeEventListener('click', closeTagMenu)
})
</script>

<style lang="scss">
.g-app-tag {
  width: 100%;
  height: $gAppTagHeight;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
}
.g-app-tags-content {
  display: flex;
  height: $gAppTagHeight;
}
.g-app-tags-item {
  font-size: 12px;
  color: #616a6e;
  line-height: 18px;
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 7px 12px;
  border-left: 1px solid var(--el-bg-color-page);
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s;
  .ft-icon {
    margin-left: 6px;
    display: none;
  }
  &.active {
    color: #19272e;
    background-color: var(--el-bg-color-page);
    border-color: transparent;
  }
  &:last-child {
    border-right: 1px solid var(--el-bg-color-page);
  }
  &.active,
  &:hover {
    .ft-icon {
      display: block;
    }
  }
}
.g-app-tags-control {
  width: 64px;
  height: $gAppTagHeight;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  > div {
    width: $gAppTagHeight;
    height: $gAppTagHeight;
    border-left: 1px solid var(--el-bg-color-page);
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.g-app-tags-menu {
  position: fixed;
  z-index: 99999;
  background-color: var(--el-bg-color-overlay);
  border: 1px solid var(--el-border-color-light);
  box-shadow: var(--el-box-shadow-light);
  box-sizing: border-box;
  .g-app-tags-menu-item {
    padding: 4px 12px;
    text-align: center;
    color: var(--el-text-color-regular);
    font-size: var(--el-font-size-base);
    font-weight: 400;
    cursor: pointer;
    &:hover {
      color: var(--el-color-primary);
      background-color: var(--el-color-primary-light-9);
    }
  }
}
</style>
