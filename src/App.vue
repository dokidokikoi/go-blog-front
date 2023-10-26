<script setup>
import { RouterLink, RouterView } from "vue-router";
import Loading from '@/components/Loading/index.vue'

import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia'
import { ref } from "vue";

const globalStore = useGlobalStore()
const { loading } = storeToRefs(globalStore)
const right = ref(100)
const bottom = ref(100)
window.addEventListener('resize', function() {
  // 在窗口大小变化时执行的代码
  // 可以在这里处理响应式布局、调整元素大小、重新渲染等操作
  const windowWidth = window.innerWidth;
  if (windowWidth <= 800) {
    right.value = 20
    bottom.value = 50
  } else {
    right.value = 100
    bottom.value = 100
  }
})
const windowWidth = window.innerWidth;
if (windowWidth <= 800) {
  right.value = 20
  bottom.value = 50
} else {
  right.value = 100
  bottom.value = 100
}
</script>

<template>
  <RouterView />
  <Loading v-show="loading" />
  <el-backtop :visibility-height="400" :right="right" :bottom="bottom" />
</template>

<style scoped>
</style>
