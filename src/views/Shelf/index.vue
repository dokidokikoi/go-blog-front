<script setup>
import Bannar from '@/components/Bannar/index.vue';
import BookShelf from './BookShelf.vue';
import AnimeIcon from '@/components/icons/AnimeIcon.vue';
import BookIcon from '@/components/icons/BookIcon.vue';
import GameIcon from '@/components/icons/GameIcon.vue';
import MoviceIcon from '@/components/icons/MoviceIcon.vue';
import UnderLoading from '@/components/UnderLoading/index.vue';
import { listList } from '@/api/list'
import { ref } from 'vue'
import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia'

const globalStore = useGlobalStore()
const { loading } = storeToRefs(globalStore)
loading.value = false

const pageLoading = ref(false);

const totalCount = ref(0)
const searchParam = ref({
  page: 1,
  page_size: 10,
  order_by: "created_at desc",
  type: 4
})
const list = ref([])
const shelfData = ref([])

function getListList() {
  pageLoading.value = false
  listList(searchParam.value).then(res => {
    list.value = list.value.concat(res.data.list)
    shelfData.value = []
    let level = -1
    let cnt = 0
    list.value.forEach(e => {
      if (cnt++%4 == 0) {
        level++
        shelfData.value.push([e])
      } else {
        shelfData.value[level].push(e)
      }
    })
    totalCount.value = res.data.total
  }).finally(() => {
    loading.value = false
    pageLoading.value = false
  })
}
function typeChange(type) {
  loading.value = true
  list.value = []
  searchParam.value.type = type
  getListList()
}
function active(type) {
  const a = document.querySelector('.active')
  if (a) {
    a.classList.remove('active');
  }
  
  document.querySelector(type).classList.add('active');
  switch (type) {
    case ".books":
    typeChange(4)
      break;
    case ".anime":
    typeChange(1)
      break
    case ".games":
    typeChange(2)
      break
    case ".movice":
    typeChange(3)
      break
    default:
    typeChange(4)
      break;
  }
}

getListList()
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
      <BookShelf v-if="shelfData.length > 0" :list="shelfData" />
      <div class="previous" v-show="totalCount>list.length">
        <button v-show="!pageLoading&&totalCount>list.length" class="btn" @click="getListList()">Previous</button>
        <UnderLoading v-show="pageLoading" class="loading" />
      </div>
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
.previous {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  position: relative;
}
.previous .btn {
  width: 90px;
  height: 50px;
  background-color: aqua;
  margin-top: 20px;
  border-radius: 50px;
  border-width: .1px;
  border-color: rgb(82, 156, 156);
}
.previous .btn:hover {
  box-shadow: 0 0 10px rgba(0,0,0,.1);
  cursor: pointer;
}
.previous .loading {
  margin: 20px 0;
}
</style>