<script setup>
import Bannar from '@/components/Bannar/index.vue';
import Article from './Article.vue';
import InfoPanel from '@/components/InfoPanel/index.vue';
import { ref } from 'vue';
import { listArticle } from "@/api/article"
import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia'

const globalStore = useGlobalStore()
const { loading } = storeToRefs(globalStore)
loading.value = false
const articles = ref([])
const totalCount = ref(0)
const searchParams = ref({
  category: 2
})
const pagination = ref({
  page: 1,
  page_size: 6,
  order_by: "weight desc, created_at desc"
})

function loadArticle() {
  listArticle(searchParams.value, pagination.value).then(res => {
    articles.value = res.data.list
    totalCount.value = res.data.total
  }).finally(() => {
    loading.value = false
  })
}

async function currentChange(curr) {
  pagination.value.page=curr
  listArticle(searchParams.value, pagination.value).then(res => {
    articles.value = res.data.list
    totalCount.value = res.data.total
  }).finally(() => {
    document.body.scrollTop = 260;
    document.documentElement.scrollTop = 260;
    window.pageYOffset = 260;
  })
}

loadArticle()
</script>

<template>
<div>
  <Bannar />
  <div style="background-color: white; width: 100%;">
    <div class="body">
      <Article class="articles" v-if="articles.length > 0" :articles="articles" :page-size="pagination.page_size" :total="totalCount" @currentChange="currentChange" />
      <InfoPanel class="info-panel" />
    </div>
  </div>
</div>
</template>

<style scoped>
.body {
  display: flex;
  justify-content: space-between;
  max-width: 66rem;
  margin: auto;
  background-color: white;
}
@media (max-width: 800px) {
  .articles {
    width: 540px;
    margin: auto;
  }
  .info-panel {
    display: none !important;
  }
}
</style>