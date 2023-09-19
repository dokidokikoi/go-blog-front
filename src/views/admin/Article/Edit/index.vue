<script setup>
import MdEditer from "@/components/MdEditer/index.vue"
import Upload from "@/components/Upload/index.vue"
import { ref } from "vue";
import { listCategory } from "@/api/category"
import { listTag } from "@/api/tag"
import { listSeries } from "@/api/series"

const showSaveArticle = ref(false)
const articleParam = ref({
  tags: []
})
const categories = ref([
])
const series = ref([
])
const tags = ref([
])

function showDrawer() {
  showSaveArticle.value = true
}
function cancelClick() {
  showSaveArticle.value = false
}
function setImage(url) {
  articleParam.value.cover = url
  console.log("setimage", url)
}
function getCategoryList() {
  listCategory({type: 1}).then(res => {
    categories.value = res.data.list
  })
}
function getSeriesList() {
  listSeries().then(res => {
    series.value = res.data.list
  })
}
function getTagList() {
  listTag({type: 1}).then(res => {
    tags.value = res.data.list
  })
}
getCategoryList()
getSeriesList()
getTagList()
</script>

<template>
  <div style="margin-bottom: 12px; padding-right: 20px;display: flex;justify-content: flex-end;">
    <el-button type="primary" size="large" @click="showDrawer()" round style="box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);">发布文章</el-button>
  </div>
  <MdEditer />
  <el-drawer v-model="showSaveArticle" size="40%" direction="rtl">
    <template #header>
      <h4>文章信息</h4>
    </template>
    <template #default>
      <el-form :model="articleParam" label-width="80px">
        <el-form-item label="文章标题">
          <el-input v-model="articleParam.title" />
        </el-form-item>
        <el-form-item label="文章分类">
          <el-select v-model="articleParam.category" clearable placeholder="选择分类">
            <el-option v-for="item in categories" :key="item.id" :label="item.category_name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="文章标签">
          <el-select v-model="articleParam.tags" multiple clearable placeholder="选择标签">
            <el-option v-for="item in tags" :key="item.id" :label="item.tag_name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="文章系列">
          <el-select v-model="articleParam.series" clearable placeholder="选择系列">
            <el-option v-for="item in series" :key="item.id" :label="item.series_name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="文章描述">
          <el-input v-model="articleParam.summary" type="textarea" autosize />
        </el-form-item>
        <el-form-item label="文章封面">
          <div class="uploader">
            <Upload @setImage="setImage" />
          </div>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button type="primary" size="large" @click="confirmClick">发布</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped>
.uploader {
  width: 308px;
  height: 178px;
}
</style>