<template>
  <div class="ft-card" :class="{ single: single }">
    <div v-if="title || slots.title || slots.extra" class="ft-card__header">
      <div v-if="title || slots.title" class="ft-card__header-title">
        <div class="ft-card-triangle"></div>
        <slot name="title">
          <span class="title">
            {{ title }}
          </span>
        </slot>
        <div class="ft-card-parallelogram">
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
        </div>
      </div>
      <div v-if="slots.extra" class="ft-card__header-extra">
        <slot name="extra"></slot>
      </div>
    </div>
    <div class="ft-card__body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup name="FtCard">
defineProps({
  title: {
    type: String,
    default: ''
  },
  subTitle: {
    type: String,
    default: ''
  },
  single: {
    type: Boolean,
    default: false
  }
})

const slots = useSlots()
</script>

<style lang="scss" scoped>
.ft-card {
  box-sizing: border-box;
  background: var(--el-bg-color);

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  .ft-card__header {
    width: 100%;
    height: 52px;
    padding: 16px 16px 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .ft-card__header-title {
      line-height: 20px;
      height: 20px;
      flex-shrink: 0;
      display: flex;
      align-items: center;

      .title {
        padding: 0 8px;
        font-size: 14px;
      }

      .sub-title {
        font-size: 14px;
        opacity: 0.3;
      }
    }

    :deep(.ft-card__header-extra) {
      margin-left: auto;
      overflow: auto;
      display: flex;
      align-items: center;
      overflow: hidden;
      > * {
        margin-left: 10px;
      }
    }

    .ft-card-triangle {
      width: 0;
      height: 0;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent transparent var(--el-color-primary);
    }

    .ft-card-parallelogram {
      display: flex;

      .item {
        width: 12px;
        height: 10px;
        top: 10px;
        clip-path: polygon(6px 0px, 0px 10px, 5px 10px, 11px 0px);
        background-color: var(--el-color-primary);
        margin-right: -2px;

        &:nth-child(1) {
          background: linear-gradient(to right, rgba($primaryColor, 0.8), rgba($primaryColor, 0.4));
        }

        &:nth-child(2) {
          background: linear-gradient(to right, rgba($primaryColor, 0.5), rgba($primaryColor, 0.1));
        }

        &:nth-child(3) {
          background: linear-gradient(to right, rgba($primaryColor, 0.3), rgba($primaryColor, 0));
        }
      }
    }
  }

  .ft-card__body {
    position: relative;
    padding: 16px;
  }

  &.single {
    min-height: 100%;
  }
}
</style>
