<script setup>
import Clock from '@/components/icons/Clock.vue'
import Category from '@/components/icons/Category.vue'
import Tag from '@/components/icons/Tag.vue'
import { formatDay } from '../../utlis/time';
import Comment from '@/components/icons/Comment.vue'
import Eye from '@/components/icons/Eye.vue'

const props = defineProps({
  articles: {
    type: Array,
    default: []
  },
  total: {
    type: Number,
    default: 0
  },
  pageSize: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits()

function currentChange(curr) {
  emit('currentChange', curr)
}
</script>

<template>
<div class="container">
  <div class="article-section">
    <div class="article" v-for="article in articles" :key="article.id">
      <div class="cover">
        <img :src="article.cover" alt="">
      </div>
      <RouterLink class="info" :to="`/article/${article.id}`">
        <div class="top">
          <h2 class="title">{{ article.title }}</h2>
          <div class="meta">
            <p style="display: flex; align-items: center;color:rgb(208, 228, 246);"><Clock fill="rgb(208, 228, 246)" /> <span>{{ formatDay(article.created_at) }}</span></p>
            <p style="display: flex; align-items: center;margin-left: 8px;color:rgb(208, 228, 246);"><Eye fill="rgb(208, 228, 246)" width="17" height="17" /> <span> {{ article.view_counts }}</span></p>
            <p style="display: flex; align-items: center;margin-left: 8px;color:rgb(208, 228, 246);"><Comment fill="rgb(208, 228, 246)" width="14" height="14" /> <span> {{ article.comment_counts }}</span></p>
            <!-- <p style="margin-left: 10px;">1023字</p> -->
          </div>
        </div>
        <p class="description">{{ article.summary }}</p>
        <!-- <div class="category">{{ article.category.category_name }}</div> -->
        <div class="info-footer">
          <div class="category"> <Category fill="wheat" width="18" height="18"/> <span>{{ article.category.category_name }}</span></div>
          <div class="tags">
            <span class="tag" v-for="tag in article.tags"> 
              <Tag fill="wheat" width="12" height="12" />
              <span>{{tag.tag_name}}</span>
            </span>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
  <el-pagination background layout="prev, pager, next" style="margin-top: 30px;" :page-size="pageSize"
  @current-change="currentChange" @prev-click="currentChange" @next-click="currentChange" :total="total" />
</div>
</template>

<style scoped>
.container {
  padding: 20px;
  width: calc(100% - 21rem);
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
  position: absolute;
  bottom: 20px;
  overflow-wrap: break-word;
  left: 0;
  width: 100%;
  padding: 0 20px;
}
.info:hover .description {
  opacity: 1;
  bottom: 40px;
}
.info-footer {
  position: absolute;
  bottom: -12px;
  font-size: .8em;
  display: flex;
  opacity: 0;
  transition-duration: .3s;
}
.category {
  display: flex;
  align-items: center;
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
.info:hover .info-footer {
  opacity: 1;
  bottom: 12px;
}
.top {
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  transition-duration: .3s;
}
.article:hover .top {
  top: 40px;
}
</style>