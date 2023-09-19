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
</template>

<style scoped>

</style>
