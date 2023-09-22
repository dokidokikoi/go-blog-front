<template>
  <h1>首页</h1>
  <el-button @click="load">测试按钮</el-button>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia'

const globalStore = useGlobalStore()
const { loading } = storeToRefs(globalStore)

function load() {
  loading.value = true
}
</script>

<style scoped>

</style>
