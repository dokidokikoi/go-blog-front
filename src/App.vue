<script setup>
import { RouterLink, RouterView } from "vue-router";
import Loading from '@/components/Loading/index.vue'

import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia'

const globalStore = useGlobalStore()
const { loading } = storeToRefs(globalStore)

</script>

<template>
  <RouterView />
  <Loading v-show="loading" />
  <el-backtop :visibility-height="400" :right="100" :bottom="100" />
</template>

<style scoped>
</style>
