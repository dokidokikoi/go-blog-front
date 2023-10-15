<script setup>
import { ref } from "vue"
import { Plus, Edit, Delete  } from '@element-plus/icons-vue'
import Upload from "@/components/Upload/index.vue"
import { ElMessage, ElMessageBox } from 'element-plus'
import { formatTime } from "@/utlis/time"
import { listSite, createSite, updateSite, deleteSite } from "@/api/site"
import Category from "../Category/Upsert.vue";
import Tag from "../Tag/Upsert.vue";
import { listCategory } from "@/api/category"
import { listTag } from "@/api/tag"

const tableData = ref([
])
const searchParam = ref({
  page: 1,
  page_size: 10,
  oreder_by: "id desc" 
})
const totalCount = ref(0)
const dialogFormVisible = ref(false)
const categoryDialogFormVisible = ref(false)
const tagDialogFormVisible = ref(false)
const siteForm = ref({
  tags: []
})
const categories = ref([
])
const tags = ref([
])

const ruleFormRef = ref(null)
const formRules = ref({
  site_name: [
    { required: true, message: '请填写网站名称', trigger: 'blur' },
  ],
  category_id: [
    { required: true, message: '请选择网站分类', trigger: 'blur' },
  ],
  summary: [
    { required: true, message: '请填写网站介绍', trigger: 'blur' },
  ],
  url: [
    { required: true, message: '请填写网站链接', trigger: 'blur' },
  ]
})

function setCategoryDialogFormVisible(bool) {
  categoryDialogFormVisible.value = bool
}
function setTagDialogFormVisible(bool) {
  tagDialogFormVisible.value = bool
}
function showCreateSite() {
  siteForm.value = {}
  dialogFormVisible.value = true
}
function showUpdateSite(data) {
  siteForm.value = JSON.parse(JSON.stringify(data))
  siteForm.value.tags = siteForm.value.tags.map(e => {
    return e.id
  })
  dialogFormVisible.value = true
}

function setImage(url) {
  siteForm.value.logo = url
}

function getCategoryList() {
  listCategory({type: 2}).then(res => {
    categories.value = res.data.list
  })
}
function getTagList() {
  listTag({type: 2}).then(res => {
    tags.value = res.data.list
  })
}
function getSiteList() {
  listSite(searchParam.value).then(res => {
    tableData.value = res.data.list
    totalCount.value = res.data.total
  })
}

async function confirmClick(formEl) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      createSite(siteForm.value).then(res => {
        ElMessage.success('添加成功')
        dialogFormVisible.value = false
        getSiteList()
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
      updateSite(siteForm.value).then(res => {
        dialogFormVisible.value = false
        getSiteList()
        ElMessage.success('更新成功')
      })
    } else {
      ElMessage.error('请将参数填写完整')
    }
  })
}

function delSite(id) {
  ElMessageBox.confirm(
    '是否删除网站？',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      deleteSite([id]).then(res => {
        ElMessage.success('删除成功')
        getSiteList()
      })
    })
    .catch(() => {
    })
}

getCategoryList()
getTagList()
getSiteList()
</script>

<template>
  <el-button type="primary" @click="showCreateSite" :icon="Plus" />
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="site_name" label="网站名" />
    <el-table-column prop="logo" label="logo">
      <template #default="{row}">
        <el-avatar shape="square" :src="row.logo" />
      </template>
    </el-table-column>
    <el-table-column prop="url" label="url" />
    <el-table-column prop="summary" label="简介" />
    <el-table-column prop="category" label="分类">
      <template #default="{row}" style="padding: 10px, 0;">
        {{ row.category.category_name }}
      </template>
    </el-table-column>
    <el-table-column prop="tags" label="标签">
      <template #default="{row}">
        <div style="width:100%;margin-right: 20px;">
          <el-tag v-for="item in row.tags">{{ item.tag_name }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="created_at" label="创建日期">
      <template #default="{row}" style="padding: 10px, 0;">
        {{ formatTime(row.created_at) }}
      </template>
    </el-table-column>
    <el-table-column prop="action" fixed="right" label="操作">
      <template #default="{row}" style="padding: 10px, 0;">
        <el-button
          type="primary"
          size="small"
          @click="showUpdateSite(row)"
        >
          <el-icon><Edit /></el-icon>
        </el-button>
        <el-button
          type="danger"
          size="small"
          style="margin-left: 6px;"
          @click="delSite(row.id)"
        >
          <el-icon><Delete /></el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  
  <el-drawer v-model="dialogFormVisible" size="40%" direction="rtl">
    <template #header>
      <h4>网站信息</h4>
    </template>
    <template #default>
      <el-form :model="siteForm" ref="ruleFormRef" :rules="formRules" label-width="80px">
        <el-form-item label="网站名" prop="site_name">
          <el-input v-model="siteForm.site_name" placeholder="网站名" />
        </el-form-item>
        <el-form-item label="网站链接" prop="url">
          <el-input v-model="siteForm.url" placeholder="网站链接" />
        </el-form-item>
        <el-form-item label="网站描述" prop="summary">
          <el-input v-model="siteForm.summary" placeholder="网站描述" type="textarea" autosize />
        </el-form-item>
        <el-form-item label="网站分类" prop="category_id">
          <el-select v-model="siteForm.category_id" clearable placeholder="选择分类">
            <el-option v-for="item in categories" :key="item.id" :label="item.category_name" :value="item.id" />
          </el-select>
          <el-button type="primary" @click="categoryDialogFormVisible=true" style="margin-left: 10px;" :icon="Plus" />
        </el-form-item>
        <el-form-item label="网站标签">
          <el-select v-model="siteForm.tags" multiple clearable placeholder="选择标签">
            <el-option v-for="item in tags" :key="item.id" :label="item.tag_name" :value="item.id" />
          </el-select>
          <el-button type="primary" @click="tagDialogFormVisible=true" style="margin-left: 10px;" :icon="Plus" />
        </el-form-item>
        <el-form-item label="网站logo" prop="logo">
          <el-input v-model="siteForm.logo" clearable placeholder="logo链接" style="margin-bottom: 10px;" />
          <div class="uploader">
            <Upload @setImage="setImage" :img="siteForm.logo" />
          </div>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button v-if="!siteForm.id" type="primary" size="large" @click="confirmClick(ruleFormRef)">添加</el-button>
        <el-button v-else type="primary" size="large" @click="confirmUpdateClick(ruleFormRef)">更新</el-button>
      </div>
    </template>
  </el-drawer>

  <Category 
  :ty="2"
  :category-dialog-form-visible="categoryDialogFormVisible" 
  @setCategoryDialogFormVisible="setCategoryDialogFormVisible"
  @refresh="getCategoryList" />
  <Tag 
  :ty="2"
  :tag-dialog-form-visible="tagDialogFormVisible" 
  @setTagDialogFormVisible="setTagDialogFormVisible"
  @refresh="getTagList" />
</template>

<style scoped>
.uploader {
  height: 50px;
  width: 50px;
}
</style>