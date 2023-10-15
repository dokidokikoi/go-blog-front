<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import UnderLoading from '@/components/UnderLoading/index.vue';
import { listArticle } from "@/api/article"
import Clock from '@/components/icons/Clock.vue'
import Category from '@/components/icons/Category.vue'
import Tag from '@/components/icons/Tag.vue'
import Comment from '@/components/icons/Comment.vue'
import Eye from '@/components/icons/Eye.vue'
import { formatDay } from '../../utlis/time';
import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router';

const globalStore = useGlobalStore()
const { loading } = storeToRefs(globalStore)

const router = useRouter()
const pageLoading = ref(false);
const articles = ref([])
const totalCount = ref(0)
const searchParams = ref({
  category: 1
})
const pagination = ref({
  page: 0,
  page_size: 6,
  order_by: "weight desc, created_at desc"
})
function loadArticle() {
  pageLoading.value = true;
  pagination.value.page += 1
  listArticle(searchParams.value, pagination.value).then(res => {
    articles.value = articles.value.concat(res.data.list)
    totalCount.value = res.data.total
  }).finally(()=>{
    pageLoading.value = false
    loading.value = false
  })
}

function to(id, type) {
  router.push({
    path: `/group/${id}`,
    query: {
      type: type
    }
  })
}

loadArticle()
</script>

<template>
<div class="article-page">
  <div class="article-section">
    <div class="article" v-for="item in articles" :key="item.id">
      <div class="fixed-top" v-if="item.weight > 1">
      置顶
      </div>
      <RouterLink class="cover" :to="`/article/${item.id}`">
        <img :src="item.cover" alt="">
      </RouterLink>
      <div class="info">
        <div class="meta">
          <p style="display: flex; align-items: center;"><Clock /> <span>{{ formatDay(item.created_at) }}</span></p>
          <p style="display: flex; align-items: center;margin-left: 8px;"><Eye width="17" height="17" /> <span> {{ item.view_counts }}</span></p>
          <p style="display: flex; align-items: center;margin-left: 8px;"><Comment width="14" height="14" /> <span> {{ item.comment_counts }}</span></p>
          <!-- <p style="margin-left: 10px;">1023字</p> -->
        </div>
        <RouterLink class="title" :to="`/article/${item.id}`">{{item.title}}</RouterLink>
        <br>
        <p class="description">{{ item.summary }}</p>
        <br>
        <div class="info-footer">
          <div class="category" @click="to(item.category.id, 'category')"> <Category width="18" height="18"/> <span>{{ item.category.category_name }}</span></div>
          <div class="tags">
            <span class="tag" @click="to(tag.id, 'tag')" v-for="tag in item.tags"> 
              <Tag width="12" height="12" />
              <span>{{tag.tag_name}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="previous">
    <button v-show="!pageLoading&&totalCount>articles.length" class="btn" @click="loadArticle()">Previous</button>
    <UnderLoading v-show="pageLoading" class="loading" />
  </div>
</div>
</template>

<style scoped>
.article-page {
  padding: 20px;
  width: calc(100% - 17rem);
  min-width: calc(50% - 2rem);
}
.article-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.article {
  margin: auto;
  height: 250px;
  /* background-color: aqua; */
  width: 87%;
  margin: 16px;
  display: flex;
  border-radius: .625rem;
  overflow: hidden;
  transition: all .2s ease-in-out 0s;
  background-color: white;
  box-shadow: 0 0 10px rgba(0,0,0,.1);
  position: relative;
}
.article:hover {
  box-shadow: 0 0 2rem var(--box-bg-shadow);
  box-shadow: 0 0 10px rgba(0,0,0,.2);
}
.article:nth-child(even) {
  flex-direction: row-reverse;
}
.cover {
  width: 50%;
  clip-path: polygon(0 0,92% 0,100% 100%,0 100%);
  -webkit-clip-path: polygon(0 0,92% 0,100% 100%,0 100%);
  margin-right: 24px;
  margin-left: 0px;
}
.article:nth-child(even) .cover {
  clip-path: polygon(0 0,100% 0,100% 100%,8% 100%);
  -webkit-clip-path: polygon(0 0,100% 0,100% 100%,8% 100%);
  margin-left: 24px;
  margin-right: 0;
}
.cover img{
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: all .2s ease-in-out 0s;
}
.article:hover .cover img {
  transform: scale(1.05) rotate(1deg);
}
.article:nth-child(even):hover .cover img {
  transform: scale(1.05) rotate(-1deg);
}
.info {
  width: 50%;
  padding: 16px 20px 40px 0;
  position: relative;
}
.title {
  text-decoration: none;
  color: black;
  font-size: 1.4em;
  font-weight: 600;
  margin: 20px 0;
  display: inline-block;
}
.title:hover {
  cursor: pointer;
  color: red;
}
.article:nth-child(even) .info {
  padding: 24px 0 40px 20px;
}

.meta {
  display: flex;
  justify-content: flex-start;
  font-size: .875em;
  color: grey;
}
.info .description {
  height: 5rem;
  font-size: .875em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
}

.article:nth-child(odd) .meta {
  justify-content: flex-end;
}
.info-footer {
  position: absolute;
  bottom: 12px;
  color: grey;
  font-size: .8em;
  display: flex;
}
.category {
  display: flex;
  align-items: center;
}
.category:hover {
  cursor: pointer;
  color: chocolate;
}
.tags {
  right: 20px;
  margin-left: 10px;
  display: flex;
}
.tag {
  margin-left: 5px;
  display: flex;
  align-items: center;
}
.tag:hover {
  cursor: pointer;
  color: chocolate;
}
.previous {
  margin-top: 30px;
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

.fixed-top {
  position: absolute;
  top: 5px;
  left: 5px;
  background-color: red;
  color: aliceblue;
  font-size: .7em;
  padding: 1px 5px;
  border-radius: 3px;
  z-index: 10;
}
</style>