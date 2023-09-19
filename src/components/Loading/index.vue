<script setup>

</script>

<template>
<div class="cover">
  <div class='loader'></div>
</div>
</template>

<style scoped>
.cover {
  position: fixed; /* Positioned relative to the viewport */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 1); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Place above other content */
  overflow: hidden;
}

.loader {
  --animation-duration: 1.8s;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 10px;
  background: #3498db;
  border-radius: 5px;
  animation: load 1.8s ease-in-out infinite;
  &:before,
  &:after {
    position: absolute;
    display: block;
    content: "";
    animation: load 1.8s ease-in-out infinite;
    height: 10px;
    border-radius: 5px;
  }
  &:before {
    top: -20px;
    left: 10px;
    width: 40px;
    background: #ef4836;
  }
  &:after {
    bottom: -20px;
    width: 35px;
    background: #f5ab35;
  }
}

@keyframes load {
  0% {
    transform: translateX(40px);
  }

  50% {
    transform: translateX(-30px);
  }
  100% {
    transform: translateX(40px);
  }
}

</style>