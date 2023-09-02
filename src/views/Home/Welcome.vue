<script setup>
import ArticlePage from '@/components/ArticlePage/index.vue';
import InfoPanel from '@/components/InfoPanel/index.vue';
import Brand from './Brand.vue';
</script>

<template>
<div class="container">
  <Brand />
  <div style="background-color: white; width: 100%;">
    <div class="body">
      <ArticlePage />
      <InfoPanel />
    </div>
  </div>
</div>
</template>

<style scoped>
.body {
  display: flex;
  justify-content: space-between;
  width: 74rem;
  margin: auto;
}
</style>