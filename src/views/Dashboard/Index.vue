<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="10">
        <TotalPie></TotalPie>
      </el-col>
      <el-col :span="14">
        <TrendLine></TrendLine>
      </el-col>
      <el-col :span="24" style="margin-top: 20px">
        <TrendBar></TrendBar>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { TotalPie, TrendLine, TrendBar } from './components'
</script>

<style lang="scss" scope>
.dashboard {
  width: 100%;
  height: 100%;
}
</style>
