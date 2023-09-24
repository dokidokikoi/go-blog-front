<script setup>
import Nav from './Nav/index.vue'
import Header from './Header/index.vue'
import { RouterView } from 'vue-router';
import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router';
import { watch } from 'vue'

const route = useRoute()

const globalStore = useGlobalStore()
const { loading } = storeToRefs(globalStore)

watch(route, async (newQuestion, oldQuestion) => {
  loading.value = false
})
loading.value = false
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"><Nav /></el-aside>
      <el-container>
        <el-header><Header /></el-header>
        <el-main><RouterView :key="new Date().getTime()" /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.el-container {
  height: 100vh;
}
.el-header {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.el-aside {
  background-color: #304156;
}
</style>