<script setup>
import MdEditer from "@/components/MdEditer/index.vue"
import Upload from "@/components/Upload/index.vue"
import { ref } from "vue";

const showSaveArticle = ref(false)
const articleParam = ref({})

function showDrawer() {
  showSaveArticle.value = true
}
function cancelClick() {
  showSaveArticle.value = false
}
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
          <el-select v-model="articleParam.category" placeholder="选择分类">
            <el-option label="技术文章" value="tech" />
            <el-option label="随笔" value="note" />
          </el-select>
        </el-form-item>
        <el-form-item label="文章标签">
          <el-select v-model="articleParam.category" placeholder="选择标签">
            <el-option label="golang" value="golang" />
            <el-option label="linux" value="linux" />
          </el-select>
        </el-form-item>
        <el-form-item label="文章系列">
          <el-select v-model="articleParam.series" placeholder="选择系列">
            <el-option label="golang设计模式" value="golang设计模式" />
            <el-option label="linux内核" value="linux内核" />
          </el-select>
        </el-form-item>
        <el-form-item label="文章描述">
          <el-input v-model="articleParam.summary" type="textarea" autosize />
        </el-form-item>
        <el-form-item label="文章封面">
          <div class="uploader">
            <Upload />
          </div>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">cancel</el-button>
        <el-button type="primary" @click="confirmClick">confirm</el-button>
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