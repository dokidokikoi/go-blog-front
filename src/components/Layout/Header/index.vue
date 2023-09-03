<script setup>
import TechIcon from '@/components/icons/TechIcon.vue';
import NoteIcon from '../../icons/NoteIcon.vue';
import ArchiveIcon from '../../icons/ArchiveIcon.vue';
import ShekfIcon from '../../icons/ShekfIcon.vue';
import LinkIcon from '../../icons/LinkIcon.vue';
import RobotIcon from '../../icons/RobotIcon.vue';
import Search from './Search.vue';
import Avatar from './Avatar.vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

onMounted(() => {
  const menu = document.getElementById('menu');
  window.addEventListener('scroll', function () {
    // 获取滚动条的垂直位置
    var scrollHeight = window.scrollY || document.documentElement.scrollTop;

    // 在这里可以根据滚动条高度执行相应的操作
    if (scrollHeight >= 380) {
      menu.style.backgroundColor = 'cyan';
    } else {
      menu.style.backgroundColor = 'transparent';
    }
  });
})

const router = useRouter();
function jump(path) {
  router.push(path);
}
</script>

<template>
  <ul class="menu" id="menu">
    <li class="title menu-item" @click="jump('/')">Harukaze</li>
    <li class="menu-item" @click="jump('/')"><TechIcon class="menu-icon"/>首页</li>
    <li class="menu-item" @click="jump('/notes')"><NoteIcon class="menu-icon"/>随笔</li>
    <li class="menu-item" @click="jump('/archives')"><ArchiveIcon class="menu-icon"/>归档</li>
    <li class="menu-item" @click="jump('/shelf')"><ShekfIcon class="menu-icon"/>书架</li>
    <li class="menu-item" @click="jump('/link')"><LinkIcon class="menu-icon"/>友链</li>
    <li class="menu-item" @click="jump('/intro')"><RobotIcon class="menu-icon"/>关于</li>
    <li class="last">
      <div class="last-item"><Avatar /></div>
      <div class="last-item"><Search /></div>
    </li>
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu {
  width: 100%;
  height: 60px;
  /* background: rgb(36, 216, 216); */
  padding: 0 20px;
  user-select: none;
  background-color: transparent;
  transition-duration: .3s;
}
.menu:hover {
  background: cyan!important;
}
.menu-item {
  /* display: inline-block; */
  box-sizing: border-box;
  float: left;
  min-width: 90px;
  height: 100%;
  text-align: center;
  line-height: 70px;
  margin-right: 10px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  transition-duration: .3s;
}

.menu-item:hover {
  background-color:cyan;
}

.menu-icon {
  margin-right: 7px;
}

.title.menu-item {
  width: 150px;
  font-size: 28px;
  font-weight: bold;
  margin-right: 40px;
  transition-delay: .3s;
}
.title.menu-item:hover {
  background: rgba(67, 237, 237, 1);
}

.last {
  float: right;
  width: 450px;
  height: 100%;
  /* background: #fff; */
  text-align: center;
  line-height: 70px;
  margin-right: 10px;
  font-size: 20px;
  font-weight: 400;
}

.last-item {
  float: right;
  height: 100%;
  /* background: #ccc; */
  margin-left: 20px;
}
</style>