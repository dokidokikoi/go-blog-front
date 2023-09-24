<template>
  <h1>首页</h1>
  <el-button @click="load">测试按钮</el-button>
  <div>
    <template  v-for="cate in categories">
      <el-card class="box-card" v-if="cate.total > 0">
        <template #header>
          <div class="card-header">
            <span>{{ cate.category_name }}</span>
          </div>
        </template>
        <ul>
          <li class="site" @click="jump(site)" v-for="site in cate.sites">
            <div class="info">
              <el-avatar :src="site.logo" />
              <p>{{ site.site_name }}</p>
            </div>
            <!-- <p>{{ site.summary }}</p> -->
          </li>
        </ul>
       <div style="display: flex; justify-content: center;position: relative; top: 12px;color: gray;font-size: .8em;">
          <a class="more" v-if="cate.total > cate.sites.length" @click="loadMore(cate)"> &gt;&gt; 查看更多 &lt;&lt; </a>
       </div>
      </el-card>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia'
import { listCategory } from "@/api/category"
import { listSite } from "@/api/site"

const globalStore = useGlobalStore()
const { loading } = storeToRefs(globalStore)
const categories = ref([
])

function load() {
  loading.value = true
}

function getCategoryList() {
  listCategory({type: 2}).then(res => {
    categories.value = res.data.list
    categories.value.forEach(e => {
      listSite({category_id: e.id, page: 1, page_size: 5, order_by: "id asc"}).then(res => {
        e.sites = res.data.list
        e.total = res.data.total
      })
    })
  })
}

function jump(site) {
  // 打开一个新窗口并跳转到指定页面
  var newWindow = window.open(site.url, '_blank');

  // 在新窗口上执行其他操作（可选）
  newWindow.focus();
}

function loadMore(cate) {
  listSite({category_id: cate.id, page: 2, page_size: 5, order_by: "id asc"}).then(res => {
    cate.sites = cate.sites.concat(res.data.list);
    cate.total = res.data.total
  })
}

getCategoryList()
</script>

<style scoped>
.box-card {
  min-width: 400px;
  margin-top: 20px;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  left: -45px;
}
ul::after {
    content: "";
    display: table;
    clear: both;
}
.more:hover {
  cursor: pointer;
  color: orange;
}
.site {
  width: 300px;
  background-color:rgb(252, 250, 248);
  box-shadow: 0 0 1px 1px #d3d2d2;
  border-radius: 8px;
  flex-wrap: wrap;
  margin: 10px;
  display: flex;
  padding: 10px 20px;
  float: left;
  cursor: pointer;
}
.info {
  display: flex;
  align-items: center;
}
.info p {
  margin-left: 20px;
}
</style>
