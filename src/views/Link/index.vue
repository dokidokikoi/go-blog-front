<script setup>
import Bannar from '@/components/Bannar/index.vue';
import List from './List.vue';
</script>

<template>
<div>
  <Bannar />
  <div style="background-color: white; width: 100%;">
    <div class="body">
      <List />
    </div>
  </div>
</div>
</template>

<style scoped>
.body {
  /* display: flex;
  justify-content: space-between; */
  max-width: 54rem;
  margin: auto;
  background-color: white;
}
</style>