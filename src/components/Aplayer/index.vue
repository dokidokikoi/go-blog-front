<template>
  <aplayer autoplay
  :music="playList[0]"
  :list="playList"
  :volume="1"
  />
</template>


<script setup>
import { ref } from 'vue';
import Aplayer from 'vue3-aplayer'

let playList = ref([
  {
    title: 'secret base~君がくれたもの~',
    artist: 'Silent Siren',
    src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
    pic: 'https://www.freecodecamp.org/news/content/images/2021/10/golang.png'
  }
])
</script>


<style scoped>

</style>