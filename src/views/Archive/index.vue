<script setup>
import Bannar from '@/components/Bannar/index.vue';
import TimeLine from './TimeLine.vue';
</script>

<template>
<div>
  <Bannar />
  <div style="background-color: white; width: 100%;">
    <div class="body">
      <TimeLine />
    </div>
  </div>
</div>
</template>

<style scoped>
.body {
  /* display: flex;
  justify-content: space-between; */
  max-width: 45rem;
  margin: auto;
  background-color: white;
}
</style>