<script setup>

</script>

<template>
<div class="container">
  <div class="article-section">
    <div class="article" v-for="i in 5" :key="i">
      <div class="cover">
        <img src="https://img.timelessq.com/images/2022/07/26/e1077c43120f41fdab6a5b79cc10a94b.jpg" alt="">
      </div>
      <RouterLink class="info" to="/">
        <h2 class="title">文章标题</h2>
        <div class="meta">
          <p>2023-08-31</p>
          <p style="margin-left: 10px;">1023字</p>
        </div>
        <br>
        <p class="description">文章描述 文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述述文章描述文章描述文章描述文章描述文章描述述文章描述文章描述文章描述文章描述文章描述述文章描述文章描述文章描述文章描述文章描述述文章描述文章描述文章描述文章描述文章描述</p>
        <br>
        <div class="category">技术文章</div>
      </RouterLink>
    </div>
  </div>
  <el-pagination background layout="prev, pager, next" style="margin-top: 30px;" :total="100" />
</div>
</template>

<style scoped>
.container {
  padding: 20px;
  width: calc(100% - 17rem);
  min-width: calc(50% - 2rem);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.article-section {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
.article {
  margin: auto;
  width: 100%;
  height: 280px;
  background-color: aqua;
  margin: 16px;
  border-radius: .625rem;
  overflow: hidden;
  transition: all .2s ease-in-out 0s;
  position: relative;
  box-sizing: border-box;
}
.article:hover {
  box-shadow: 0 0 2rem var(--box-bg-shadow);
  box-shadow: 0 0 10px rgba(0,0,0,.1);
}
.cover {
  width: 100%;
  height: 100%;
  position: absolute;
}
.cover img{
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: all .2s ease-in-out 0s;
  z-index: -10;
}
.article:hover .cover img {
  transform: scale(1.05) rotate(1deg);
}
.info {
  width: 100%;
  height: 100% !important;
  padding: 20px;
  text-decoration: none;
  color: wheat;
  position: absolute;
  top: 0;
  transition-duration: .3s;
}
.info:hover {
  background: rgba(0,0,0,.5);
}
.title {
  text-align: center;
}
.meta {
  display: flex;
  justify-content: center;
  font-size: .875em;
  color: grey;
  opacity: 0;
  transition-duration: .3s;
}
.info:hover .meta {
  opacity: 1;
}
.info .description {
  height: 5rem;
  font-size: .875em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  text-overflow: ellipsis;
  z-index: 10;
  opacity: 0;
  transition-duration: .3s;
}
.info:hover .description {
  opacity: 1;
}
.category {
  position: absolute;
  bottom: 12px;
  opacity: 0;
  transition-duration: .3s;
}
.info:hover .category {
  opacity: 1;
}
</style>