<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import UnderLoading from '@/components/UnderLoading/index.vue';

const loading = ref(false);
function loadArticle() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
}
</script>

<template>
<div class="article-page">
  <div class="article-section">
    <div class="article" v-for="i in 5" :key="i">
      <RouterLink class="cover" to="/">
        <img src="https://img.timelessq.com/images/2022/07/26/e1077c43120f41fdab6a5b79cc10a94b.jpg" alt="">
      </RouterLink>
      <div class="info">
        <div class="meta">
          <p>2023-08-31</p>
          <p style="margin-left: 10px;">1023字</p>
        </div>
        <h2 class="title">文章标题</h2>
        <br>
        <p class="description">文章描述 文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述述文章描述文章描述文章描述文章描述文章描述述文章描述文章描述文章描述文章描述文章描述述文章描述文章描述文章描述文章描述文章描述述文章描述文章描述文章描述文章描述文章描述</p>
        <br>
        <div class="category">技术文章</div>
      </div>
    </div>
  </div>
  <div class="previous">
    <button v-show="!loading" class="btn" @click="loadArticle()">Previous</button>
    <UnderLoading v-show="loading" class="loading" />
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
  margin: 16px;
  display: flex;
  border-radius: .625rem;
  overflow: hidden;
  transition: all .2s ease-in-out 0s;
}
.article:hover {
  box-shadow: 0 0 2rem var(--box-bg-shadow);
  box-shadow: 0 0 10px rgba(0,0,0,.1);
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
  padding: 20px 20px 40px 0;
  position: relative;
}

.article:nth-child(even) .info {
  padding: 20px 0 40px 20px;
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
}

.article:nth-child(odd) .meta {
  justify-content: flex-end;
}
.category {
  position: absolute;
  bottom: 12px;
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
</style>