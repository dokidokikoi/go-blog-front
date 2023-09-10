<script setup>
import ArticlePage from '@/components/ArticlePage/index.vue';
import InfoPanel from '@/components/InfoPanel/index.vue';
import Bannar from '@/components/Bannar/index.vue';
import SayHello from '@/components/SayHello/index.vue';
</script>

<template>
<div class="container">
  <Bannar style="height: 80vh;"><SayHello width="100" /></Bannar>
  <div style="background-image: linear-gradient(white, rgb(255, 255, 250)); width: 100%;">
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
  max-width: 74rem;
  min-width: 60rem;
  margin: auto;
}
</style>