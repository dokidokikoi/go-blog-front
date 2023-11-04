<script setup>
import { RouterLink } from 'vue-router';
import { getYear, getMonth } from '@/utlis/time'
import { listArticle } from "@/api/article"
import { ref } from 'vue';
import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia'

const globalStore = useGlobalStore()
const { loading } = storeToRefs(globalStore)
loading.value = false

const articles = ref(new Map())
// let artciles = {
//   "2023": {"8": ["golang高级技巧", "golang常用工具"], "9": ["nas搭建"]},
//   "2022": {"6": ["linux常用命令"]},
// }
const searchParams = ref({

})
const pagination = ref({
  page: 1,
  page_size: 1000,
  order_by: "created_at desc"
})

function getTimeLine(data) {
  data.forEach(element => {
    const y = getYear(element.created_at)
    const m = getMonth(element.created_at)
    if (articles.value.has(y)) {
      if (articles.value.get(y).has(m)) {
        articles.value.get(y).get(m).push(element)
      } else {
        articles.value.get(y).set(m, [element])
      }
    } else {
      articles.value.set(y, new Map().set(m, [element]))
    }
  });
  console.log(articles.value)
}

function loadArticle() {
  listArticle(searchParams.value, pagination.value).then(res => {
    getTimeLine(res.data.list)
  }).finally(() => {
    loading.value = false
  })
}
loadArticle()
</script>

<template>
<div>
  <template v-if="articles">
    <template v-for="years in articles">
      <h3 class="year">{{ years[0] }}</h3>
      <ul class="mth-list">
        <li class="mth-li" v-for="mth in years[1]">
          <span class="mth-span">
            <span style="color: #6ecaf5;font-weight: 600;">{{ mth[0] }}月</span>
            <span style="font-weight: 500;">    ({{ mth[1].length }} 篇文章)</span>
          </span>
          <ul class="post-list">
            <li class="post-li" v-for="post in mth[1]">
              <RouterLink :to="`/article/${post.id}`">{{ post.title }}</RouterLink>
            </li>
          </ul>
        </li>
      </ul>
    </template>
  </template>
</div>
</template>

<style scoped>
.year {
  padding-left: 100px;
  margin: 0;
  font-weight: 600;
}
ul {
  list-style: none;
  margin-left: 30px;
  left: -45px;
}
.post-li a {
  color: black;
  text-decoration: none;
  font-size: 1.1em;
  font-weight: 500;
}
.post-li a:hover {
  color: coral;
  cursor: pointer;
}
.mth-list {
  width: 100%;
  position: relative;
  display: inline-block;
}
.mth-list::before {
  height: 100%;
  width: 4px;
  background: #6ecaf5;
  position: absolute;
  left: 160px;
  content: "";
  top: 0;
}
.mth-span {
  position: relative;
}
.mth-span::before {
  position: absolute;
  left: 113px;
  background-color: white;
  height: 18px;
  width: 18px;
  border-radius: 9px;
  top: 3px;
  content: "";
  box-shadow: 1px 1px 1px #bbb;
  -webkit-box-shadow: 1px 1px 1px #bbb;
}
.mth-span::after {
  position: absolute;
  left: 116px;
  background: #6ecaf5;
  height: 12px;
  width: 12px;
  border-radius: 6px;
  top: 6px;
  content: "";
}
.post-list {
  margin-left: -2.7em;
}
.post-li {
  padding-left: 140px;
  position: relative;
}
.post-li::before {
  position: absolute;
  left: 116px;
  background-color: white;
  height: 12px;
  width: 12px;
  border-radius: 6px;
  top: 6px;
  content: "";
  box-shadow: 1px 1px 1px #bbb;
  box-shadow: 1px 1px 1px #bbb;
  -webkit-box-shadow: 1px 1px 1px #bbb;
}
.post-li::after {
  position: absolute;
  left: 118px;
  background: #6ecaf5;
  height: 8px;
  width: 8px;
  border-radius: 4px;
  top: 8px;
  content: "";
}
</style>