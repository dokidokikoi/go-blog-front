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
    <li class="menu-item show" @click="jump('/')"><TechIcon class="menu-icon"/>首页</li>
    <li class="menu-item show" @click="jump('/notes')"><NoteIcon class="menu-icon"/>随笔</li>
    <li class="menu-item show" @click="jump('/archives')"><ArchiveIcon class="menu-icon"/>归档</li>
    <li class="menu-item show" @click="jump('/shelf')"><ShekfIcon class="menu-icon"/>书架</li>
    <li class="menu-item show" @click="jump('/link')"><LinkIcon class="menu-icon"/>友链</li>
    <li class="menu-item show" @click="jump('/intro')"><RobotIcon class="menu-icon"/>关于</li>
    <li class="last">
      <!-- <div class="last-item"><Avatar /></div> -->
      <div class="last-item hidden">
        <input id="menu-btn" @click="console.log('hi')" type="checkbox">
        <label for="menu-btn">
          <ul class="mini-menu">
            <li class="mini-menu-item" @click="jump('/')"><TechIcon class="menu-icon"/>首页</li>
            <li class="mini-menu-item" @click="jump('/notes')"><NoteIcon class="menu-icon"/>随笔</li>
            <li class="mini-menu-item" @click="jump('/archives')"><ArchiveIcon class="menu-icon"/>归档</li>
            <li class="mini-menu-item" @click="jump('/shelf')"><ShekfIcon class="menu-icon"/>书架</li>
            <li class="mini-menu-item" @click="jump('/link')"><LinkIcon class="menu-icon"/>友链</li>
            <li class="mini-menu-item" @click="jump('/intro')"><RobotIcon class="menu-icon"/>关于</li>
          </ul>
        </label>
      </div>
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
  margin-left: 0px;
  display: flex;
  align-items: center;
}

@media (max-width: 900px) {
  .menu-item.show {
    display: none;
  }
}
@media (min-width: 901px) {
  .hidden {
    display: none;
  }
}

.hidden {
  width: 30px;
  height: 100%;
}

#menu-btn {
  visibility: hidden;
} /* hiding the checkbox */ 

/* hamburger */
label {
  width: 35px;
  height:4px;
  border-radius:5px;
  background:black;
  cursor:pointer;
  -webkit-transition:0.6s;
  transition:0.6s;
  margin-left:-50px;
  margin-top:-7.5px;
  position: relative;
  left: 37px;
  bottom: -5px;
}
label:before{
  content:"";
  width: 35px;
  height:4px;
  background: black;
  position:absolute;
  left: 0;
  transform:translateY(-12px);
  -webkit-transform:translateY(-12px);
  border-radius:5px;
  -webkit-transition:0.6s;
  transition:0.6s;
}
label:after{
  content:"";
  width: 35px;
  height: 4px;
  background: black;
  position: absolute;
  left: 0;
  transform:translateY(12px);
  -webkit-transform:translateY(12px);
  border-radius:5px;
  transition:0.6s;
  -webkit-transition:0.6s;
}

/* animation when checked */
#menu-btn:checked + label {
  width: 0px;
}
#menu-btn:checked + label:before {
  transform: rotate(45deg) translateY(0px);
  -webkit-transform: rotate(45deg) translate(0px);
}
#menu-btn:checked + label:after {
  transform: rotate(-45deg) translateY(0px);
  -webkit-transform: rotate(-45deg) translate(0px);
}
.mini-menu {
  position: fixed;
  top: 60px;
  right: 0;
  background-color: #fff;
  padding: 10px;
  width:200px;
  height: 100%;
  float: right;
  box-shadow: 0 0 10px rgba(0,0,0,.1);
  transition:0.6s;
  -webkit-transition:0.6s;
  transform: translateX(200px);
  -webkit-transform: translateX(200px);
}
#menu-btn:checked + label .mini-menu {
  transform: translateX(0px);
  -webkit-transform: translateX(0px);
}
.mini-menu li:hover {
  cursor: pointer;
}
</style>