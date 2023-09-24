<script setup>
import { listLink } from "@/api/link" 
import { ref } from 'vue'
import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia'

const globalStore = useGlobalStore()
const { loading } = storeToRefs(globalStore)
loading.value = false
const links = ref([])

function getLinkList() {
  listLink().then(res => {
    links.value = res.data.list
  }).finally(() => {
    loading.value = false
  })
}

function jump(site) {
  // 打开一个新窗口并跳转到指定页面
  var newWindow = window.open(site.url, '_blank');

  // 在新窗口上执行其他操作（可选）
  newWindow.focus();
}

getLinkList()
</script>

<template>
<ul class="links" v-if="links.length > 0">
  <li class="link" v-for="link in links" :key="link" @click="jump(link.url)">
    <div class="info">
      <div class="title">{{ link.link_name }}</div>
      <div class="desc">{{ link.summary }}</div>
    </div>
    <div class="avatar">
      <img :src="link.avatar" alt="">
    </div>
  </li>
</ul>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  left: -45px;
}
ul::after {
    content: "";
    display: table;
    clear: both;
}
.links {
  position: relative;
}
.link {
  width: 30.8%;
  height: 90px;
  background-color:rgb(252, 250, 246);
  border-radius: 8px;
  flex-wrap: wrap;
  margin: 10px;
  display: flex;
  padding: 10px;
  float: left;
}
.link:hover {
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.link .info {
  height: 100%;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.info .title{
  height: 50%;
  padding: 6px 0 0 10px;
  border-bottom: 1px dashed #ccc;
} 
.info .desc {
  height: 50%;
  padding: 8px 0 8px 10px;
  font-size: .875em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  color: grey;
}
.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 16px;
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>