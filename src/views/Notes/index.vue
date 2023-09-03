<script setup>
import Bannar from '@/components/Bannar/index.vue';
import Article from './Article.vue';
import InfoPanel from '@/components/InfoPanel/index.vue';
</script>

<template>
<div>
  <Bannar />
  <div style="background-color: white; width: 100%;">
    <div class="body">
      <Article />
      <InfoPanel />
    </div>
  </div>
</div>
</template>

<style scoped>
.body {
  display: flex;
  justify-content: space-between;
  width: 60rem;
  margin: auto;
  background-color: white;
}
</style>