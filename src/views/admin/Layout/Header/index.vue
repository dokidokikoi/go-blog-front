<script setup>
import { ElNotification as notify } from 'element-plus'

const onBack = () => {
  notify('Back')
}
</script>

<template>
  <div class="contanier">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: './page-header.html' }">
        homepage
      </el-breadcrumb-item>
      <el-breadcrumb-item
        ><a href="./page-header.html">route 1</a></el-breadcrumb-item
      >
      <el-breadcrumb-item>route 2</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped>
.contanier {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>