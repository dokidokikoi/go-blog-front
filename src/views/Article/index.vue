<script setup>
import MdViewer from "@/components/MdViewer/index.vue"
import { ref } from 'vue'
import { getArticle } from "@/api/article"
import { useRoute, useRouter } from "vue-router";
import { formatTime } from "@/utlis/time"
import Clock from '@/components/icons/Clock.vue'
import Category from '@/components/icons/Category.vue'
import Tag from '@/components/icons/Tag.vue'
import Pen from '@/components/icons/Pen.vue'
import LeftQuote from '@/components/icons/LeftQuote.vue'
import RightQuote from '@/components/icons/RightQuote.vue'
import Comment from "@/components/Comment/index.vue"
import { getItem } from "@/utlis/localStorage";
import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia'

const globalStore = useGlobalStore()
const { loading } = storeToRefs(globalStore)
loading.value = false

const route = useRoute()
const router = useRouter()
const article = ref({})
const host = ref({})

function getArticleWithBody(id) {
  getArticle(id).then(res => {
    article.value = res.data
  }).catch(err => {
    ElMessage.error('获取文章失败')
  }).finally(() => {
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

getArticleWithBody(route.params.id)
host.value = getItem("host")
</script>

<template>
<div class="body" v-if="article.category">
  <div class="cover">
    <div class="mask">
      <div class="info">
        <p class="title">title</p>
        <div style="display: flex;">
          <span style="display: flex;align-items: center;"><Clock fill="#e6e6e6"/> <span>{{ formatTime(article.created_at) }}</span></span>
          <span class="dot">·</span>
          <span style="display: flex;align-items: center;" class="category" @click="to(article.category.id, 'category')"><Category fill="#e6e6e6" width="18" height="18"/> <span>{{ article.category.category_name }}</span></span>
          <span class="dot">·</span>
          <span v-for="tag in article.tags" @click="to(tag.id, 'tag')" class="tag" style="margin-right:10px;display: flex;align-items: center;">
            <Tag fill="#e6e6e6" />
            <span>{{ tag.tag_name }}</span>
          </span>
        </div>
      </div>
    </div>
    <img :src="article.cover" alt="">
  </div>
  <div class="viewer">
    <MdViewer v-if="article.article_body" :text="article.article_body.content"/>
    <div class="author">
      <div class="out-avatar">
        <div class="avatar">
          <img :src="host.avatar" alt="">
        </div>
      </div>
      <p class="host-name"><Pen width="16" height="16" /> <span style="margin-left: 6px;">{{ host.nick_name }}</span></p>
      <p class="wraning">
        <LeftQuote />
        <span>转载请注明出处</span>
        <RightQuote />
      </p>
    </div>
    <Comment class="comments" :articleId="parseInt(route.params.id)" />
  </div>
</div>
</template>

<style scoped>
.body {
  width: 100%;
}
.comments {
  min-width: 400px;
  max-width: 840px;
  margin: auto;
  margin-top: 40px;
}
.viewer {
  min-width: 800px;
  max-width: 1100px;
  margin: auto;
}
.cover {
  width: 100%;
  height: 480px;
  overflow: hidden;
  position: relative;
  top: -1px;
}
.cover img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
.cover .mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .3);
  display: flex;
  justify-content: center;
}
.mask .info {
  width: 800px;
  position: absolute;
  bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  color: aliceblue;
}
.info .title {
  font-size: 3em;
  font-weight: 600;
  margin-bottom: 20px;
}
.dot {
  margin: 0 5px;
}
.author {
  min-width: 400px;
  max-width: 840px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 2px dashed rgb(236, 235, 235);
  border-bottom: 2px dashed rgb(236, 235, 235);
  padding: 20px;
}
.author .out-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
}
.author .avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
}
.author .avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.author .host-name {
  margin-top: 10px;
  color: gray;
  font-size: 1.2em;
  font-weight: 500;
  display: flex;
  align-items: center;
  position: relative;
  left: -6px;
}
.wraning {
  margin-top: 20px;
  color: #707070;
}
.wraning span {
  font-weight: 600;
}
.category:hover {
  cursor: pointer;
  color: chocolate;
}
.tag:hover {
  cursor: pointer;
  color: chocolate;
}
</style>