<script setup>
import Bannar from '@/components/Bannar/index.vue';
import BookShelf from './BookShelf.vue';
import AnimeIcon from '@/components/icons/AnimeIcon.vue';
import BookIcon from '@/components/icons/BookIcon.vue';
import GameIcon from '@/components/icons/GameIcon.vue';
import MoviceIcon from '@/components/icons/MoviceIcon.vue';

function active(type) {
  const a = document.querySelector('.active')
  if (a) {
    a.classList.remove('active');
  }
  
  document.querySelector(type).classList.add('active');
}
</script>

<template>
<div>
  <Bannar />
  <div style="background-color: white; width: 100%;">
    <div class="body">
      <div class="nav">
        <div class="books btn active" @click="active('.books')">
          <BookIcon class="icon" width="30" height="30" />
          <span style="display: none;">书籍</span>
        </div>
        <div class="anime btn" @click="active('.anime')">
          <AnimeIcon class="icon" width="30" height="30" />
          <span style="display: none;">动漫</span>
        </div>
        <div class="games btn" @click="active('.games')">
          <GameIcon class="icon" width="30" height="30" />
          <span style="display: none;">游戏</span>
        </div>
        <div class="movice btn" @click="active('.movice')">
          <MoviceIcon class="icon" width="30" height="30" />
          <span style="display: none;">电影</span>
        </div>
      </div>
      <BookShelf />
    </div>
  </div>
</div>
</template>

<style scoped>
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80rem;
  margin: auto;
  padding-top: 30px;
  background-color: white;
}
.nav {
  width: 300px;
  height: 70px;
  background-color:rgba(252, 248, 244, .7);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.btn {
  transition-duration: .3s;
}
.btn:hover {
  height: 40px;
  width: 90px;
  background-color: aqua;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 8px;
  cursor: pointer;
}
.btn:hover span {
  display: block !important;
  font-size: 1.1em;
  font-weight: bold;
}
.active {
  height: 40px;
  width: 50px;
  background-color: aqua;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 8px;
}
</style>