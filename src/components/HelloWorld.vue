<template>
  <el-date-picker v-model="date" type="date" placeholder="选择日期时间"> </el-date-picker>
  <el-button type="primary" size="default" @click="showMessage">显示选中时间</el-button>
  <el-button type="primary" size="default" @click="showMessageBox">显示当前时间</el-button>
</template>

<script setup>
const date = ref('')

const showMessage = () => {
  ElMessage.success(`您选择了${date.value}`)
}

const showMessageBox = () => {
  ElMessageBox.alert(`当前时间是${new Date().toLocaleString()}`, '提示', {
    confirmButtonText: '确定'
  })
}
</script>
