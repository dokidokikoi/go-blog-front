<script setup>
import { ref } from "vue"
import { Plus, Edit, Delete  } from '@element-plus/icons-vue'
import Upsert from "./Upsert.vue"
import { listTag, deleteTag } from "@/api/tag"
import { ElMessage, ElMessageBox } from 'element-plus'

const typeList = ref([
  "unknow", "文章", "网站"
])
const tableData = ref([
])
const typeParam = ref(1)
const typeData = ref([
  {
    label: "文章",
    value: 1,
  },
  {
    label: "网站",
    value: 2,
  },
])
const op = ref("")
const tagParam = ref({})
const dialogFormVisible = ref(false)
function getTagList() {
  listTag({type: typeParam.value}).then(res => {
    tableData.value = res.data.list
  })
}
function setDialogFormVisible(bool) {
  dialogFormVisible.value = bool
}

function typeChange() {
  getTagList()
}

function editTag(data) {
  op.value = "update"
  tagParam.value = data
  setDialogFormVisible(true)
}

function createTag() {
  op.value = "create"
  tagParam.value = {}
  setDialogFormVisible(true)
}

function delTag(id) {
  ElMessageBox.confirm(
    '是否删除分类？',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      deleteTag([id]).then(res => {
        ElMessage.success('删除成功')
        getTagList()
      })
    })
    .catch(() => {
    })
}

getTagList()
</script>

<template>
  <el-button type="primary" @click="createTag" :icon="Plus" />
  <el-select v-model="typeParam" style="margin-left: 20px;" @change="typeChange" clearable placeholder="请选择类型">
    <el-option
      v-for="item in typeData"
      :key="item.label"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <el-table :data="tableData" stripe style="width: 100%;margin-top: 20px;">
    <el-table-column prop="id" label="ID" width="60"/>
    <el-table-column prop="tag_name" label="标签名" />
    <el-table-column prop="type" label="标签类型" width="110">
      <template #default="{row}" style="padding: 10px, 0;">
        {{ typeList[row.type] }}
      </template>
    </el-table-column>
    <el-table-column prop="action" label="操作" fixed="right" width="110">
      <template #default="{row}" style="padding: 10px, 0;">
        <el-button
          type="primary"
          size="small"
          @click="editTag(row)"
        >
          <el-icon><Edit /></el-icon>
        </el-button>
        <el-button
          type="danger"
          size="small"
          style="margin-left: 6px;"
          @click="delTag(row.id)"
        >
          <el-icon><Delete /></el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  
  <Upsert 
  :op="op"
  :ty="typeParam"
  :data="tagParam"
  :tag-dialog-form-visible="dialogFormVisible" 
  @setTagDialogFormVisible="setDialogFormVisible"
  @refresh="getTagList" />
</template>

<style scoped>
</style>