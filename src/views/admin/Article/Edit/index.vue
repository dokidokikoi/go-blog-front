<script setup>
import MdEditer from "@/components/MdEditer/index.vue"
import Upload from "@/components/Upload/index.vue"
import { ref, onMounted } from "vue";
import { listCategory } from "@/api/category"
import { listTag } from "@/api/tag"
import { listSeries } from "@/api/series"
import { createArticle, getArticle, updateArticle } from "@/api/article"
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import Category from "../../Category/Upsert.vue";
import Series from "../../Series/Upsert.vue";
import Tag from "../../Tag/Upsert.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()
const ruleFormRef = ref(null)
const categoryDialogFormVisible = ref(false)
const seriesDialogFormVisible = ref(false)
const tagDialogFormVisible = ref(false)
const showSaveArticle = ref(false)
const articleParam = ref({
  id: 0,
  tags: [],
  article_body: "",
  cover: ""
})
const categories = ref([
])
const series = ref([
])
const tags = ref([
])

const formRules = ref({
  title: [
    { required: true, message: '请填写文章标题', trigger: 'blur' },
  ],
  category_id: [
    { required: true, message: '请选择文章分类', trigger: 'blur' },
  ],
  summary: [
    { required: true, message: '请填写文章介绍', trigger: 'blur' },
  ],
  cover: [
    { required: true, message: '请上传文章封面', trigger: 'change' },
  ]
})

function showDrawer() {
  showSaveArticle.value = true
}
function cancelClick() {
  showSaveArticle.value = false
}
function setImage(url) {
  articleParam.value.cover = url
}
function textChange(text, html) {
  articleParam.value.article_body = text
}
function setCategoryDialogFormVisible(bool) {
  categoryDialogFormVisible.value = bool
}
function setSeriesDialogFormVisible(bool) {
  seriesDialogFormVisible.value = bool
}
function setTagDialogFormVisible(bool) {
  tagDialogFormVisible.value = bool
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
function getArticleWithBody(id) {
  getArticle(id).then(res => {
    console.log(res)
    articleParam.value.id = res.data.id
    articleParam.value.category_id = res.data.category_id
    articleParam.value.series_id = res.data.series_id
    articleParam.value.article_body = res.data.article_body.content
    articleParam.value.article_body_id = res.data.article_body_id
    articleParam.value.cover = res.data.cover
    articleParam.value.summary = res.data.summary
    articleParam.value.title = res.data.title
    articleParam.value.tags = res.data.tags.map(elem => {
      return elem.id
    })
  }).catch(err => {
    ElMessage.error('获取文章失败')
  })
}
async function confirmClick(formEl) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      createArticle(articleParam.value).then(res => {
        if (res.data.id === 0) {
          ElMessage.error('发布失败')
        }

        articleParam.value.id = res.data.id
        router.push({name: "admin_article_edit", params: { id: res.data.id }})
        ElMessage.success('发布成功')
      })
    } else {
      ElMessage.error('请将参数填写完整')
    }
  })
}
async function confirmUpdateClick(formEl) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      updateArticle(articleParam.value).then(res => {
        ElMessage.success('更新成功')
      })
    } else {
      ElMessage.error('请将参数填写完整')
    }
  })
}
getCategoryList()
getSeriesList()
getTagList()

if (route.params.id) {
  getArticleWithBody(route.params.id)
}
</script>

<template>
  <div style="margin-bottom: 12px; padding-right: 20px;display: flex;justify-content: flex-end;">
    <el-button v-if="!route.params.id" type="primary" size="large" @click="showDrawer()" round style="box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);">发布文章</el-button>
    <el-button v-else type="primary" size="large" @click="showDrawer()" round style="box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);">更新文章</el-button>
  </div>
  <MdEditer :store-key="route.params.id?'edit':'write'" :body="articleParam.article_body" @text-change="textChange" />
  <el-drawer v-model="showSaveArticle" size="40%" direction="rtl">
    <template #header>
      <h4>文章信息</h4>
    </template>
    <template #default>
      <el-form :model="articleParam" ref="ruleFormRef" :rules="formRules" label-width="80px">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="articleParam.title" placeholder="文章标题" />
        </el-form-item>
        <el-form-item label="文章分类" prop="category_id">
          <el-select v-model="articleParam.category_id" clearable placeholder="选择分类">
            <el-option v-for="item in categories" :key="item.id" :label="item.category_name" :value="item.id" />
          </el-select>
          <el-button type="primary" @click="categoryDialogFormVisible=true" style="margin-left: 10px;" :icon="Plus" />
        </el-form-item>
        <el-form-item label="文章标签">
          <el-select v-model="articleParam.tags" multiple clearable placeholder="选择标签">
            <el-option v-for="item in tags" :key="item.id" :label="item.tag_name" :value="item.id" />
          </el-select>
          <el-button type="primary" @click="tagDialogFormVisible=true" style="margin-left: 10px;" :icon="Plus" />
        </el-form-item>
        <el-form-item label="文章系列">
          <el-select v-model="articleParam.series_id" clearable placeholder="选择系列">
            <el-option v-for="item in series" :key="item.id" :label="item.series_name" :value="item.id" />
          </el-select>
          <el-button type="primary" @click="seriesDialogFormVisible=true" style="margin-left: 10px;" :icon="Plus" />
        </el-form-item>
        <el-form-item label="文章描述" prop="summary">
          <el-input v-model="articleParam.summary" placeholder="文章描述" type="textarea" autosize />
        </el-form-item>
        <el-form-item label="文章封面" prop="cover">
          <el-input v-model="articleParam.cover" clearable placeholder="封面链接" style="margin-bottom: 10px;" />
          <div class="uploader">
            <Upload @setImage="setImage" :img="articleParam.cover" />
          </div>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button v-if="!route.params.id" type="primary" size="large" @click="confirmClick(ruleFormRef)">发布</el-button>
        <el-button v-else type="primary" size="large" @click="confirmUpdateClick(ruleFormRef)">更新</el-button>
      </div>
    </template>
  </el-drawer>

  <Category 
  :category-dialog-form-visible="categoryDialogFormVisible" 
  @setCategoryDialogFormVisible="setCategoryDialogFormVisible"
  @refresh="getCategoryList" />
  <Series 
  :series-dialog-form-visible="seriesDialogFormVisible" 
  @setSeriesDialogFormVisible="setSeriesDialogFormVisible"
  @refresh="getSeriesList" />
  <Tag 
  :tag-dialog-form-visible="tagDialogFormVisible" 
  @setTagDialogFormVisible="setTagDialogFormVisible"
  @refresh="getTagList" />
</template>

<style scoped>
.uploader {
  width: 308px;
  height: 178px;
}
</style>