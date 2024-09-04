const useTagsStore = defineStore('tag', {
  state: () => {
    return {
      list: [],
      active: {},
      caches: []
    }
  },
  getters: {
    pathList() {
      return this.list.map(item => item.path)
    },
    activeIdx() {
      return this.list.findIndex(item => item.path === this.active.path)
    }
  },
  actions: {
    addTag(tag) {
      this.active = { ...toRaw(tag) }
      if (this.activeIdx === -1 && tag.meta.title) {
        this.list.push(this.active)
        this.caches = this.list.filter(item => item.meta.keepAlive).map(item => item.name)
      } else if (tag.meta.title) {
        this.list.splice(this.activeIdx, 1, this.active)
      }
    },
    removeTag(tag) {
      return new Promise((resolve, reject) => {
        const idx = this.list.findIndex(item => item.path === tag.path)
        this.list.splice(idx, 1)
        this.caches = this.list.filter(item => item.meta.keepAlive).map(item => item.name)
        resolve()
      })
    },
    removeOtherTags(tag) {
      return new Promise((resolve, reject) => {
        if (tag.path === this.active.path) {
          this.list = [this.active]
          this.caches = this.list.filter(item => item.meta.keepAlive).map(item => item.name)
          resolve()
        } else {
          this.active = { ...toRaw(tag) }
          this.list = [this.active]
          this.caches = this.list.filter(item => item.meta.keepAlive).map(item => item.name)
          resolve(this.active)
        }
      })
    },
    removeAllTags() {
      return new Promise((resolve, reject) => {
        this.list = []
        this.active = {}
        this.caches = []
        resolve()
      })
    }
  }
})

export default useTagsStore
