<script setup>

</script>

<template>
<div class="container">
  <slot></slot>
  <div class="cover"></div>
  <div class="waves">
    <div class="wave item1"></div>
    <div class="wave item2"></div>
    <div class="wave item3"></div>
  </div>
</div>
</template>

<style scoped>
.cover {
  position: fixed;
  width: 100%;
  height: 80vh;
  background-image: url('../../assets/images/bg.png');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  z-index: -1;
}
.container {
  width: 100%;
  height: 65vh;
  position: relative;
  overflow: hidden;
}
.waves {
  width: 100%;
  height: 75px;
  margin-bottom: -0.688rem;
  min-height: 3.125rem;
  max-height: 9.375rem;
  position: absolute;
  bottom: 0px;
}
.wave {
  background: url("https://gcore.jsdelivr.net/gh/starlovei/cdn/img/other/wave1.png");
  background-position: 0;
  background-repeat: repeat-x;
  /* background-size: contain; */
  position: absolute;
  left: -236px;
  bottom: 0;
  width: 400%;
  overflow: visible;
  background-position: 0;
}
.item1 {
  left: -236px;
  height: 77px;
  opacity: 1;
  animation: wave 22s linear infinite;
}
.item2 {
  left: -246px;
  height: 82px;
  opacity: 0.8;
  animation: wave 14s linear infinite;
}
.item3 {
  left: -286px;
  height: 100px;
  opacity: 0.6;
  animation: wave 18s linear infinite;
}

@keyframes wave {
  0% {
    background-position: -236px;
  }
  100% {
    background-position: -1233px;}
}
</style>