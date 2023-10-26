<script setup>
import Header from '@/components/Layout/Header/index.vue'
import Footer from '@/components/Layout/Footer/index.vue'
import { RouterView } from "vue-router";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header"><Header /></el-header>
      <el-main class="main"><RouterView :key="new Date().getTime()" /></el-main>
      <el-footer><Footer /></el-footer>
    </el-container>
  </div>
</template>

<style scoped>
/* .common-layout { */
  /* position: relative; */
/* } */
.el-header {
  --el-header-padding: 0;
}

.header {
  position: fixed;
  width: 100%;
  z-index: 999;
}
.main {
  /* margin-top: 60px; */
  padding: 0;
  overflow-x: hidden;
}

.el-footer {
  --el-footer-height: inherit;
  background-color: white;
}
</style>