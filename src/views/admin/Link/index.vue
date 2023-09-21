<script setup>
import { ref } from "vue"
import { Plus, Edit, Delete  } from '@element-plus/icons-vue'
import { listLink, createLink, updateLink, deleteLink } from "@/api/link"
import Upload from "@/components/Upload/index.vue"
import { ElMessage, ElMessageBox } from 'element-plus'

const tableData = ref([
])
const dialogFormVisible = ref(false)
const linkForm = ref({})

const ruleFormRef = ref(null)
const formRules = ref({
  link_name: [
    { required: true, message: '请填写网站名称', trigger: 'blur' },
  ],
  summary: [
    { required: true, message: '请填写网站介绍', trigger: 'blur' },
  ],
  url: [
    { required: true, message: '请填写网站链接', trigger: 'blur' },
  ],
})

function showCreatelink() {
  linkForm.value = {}
  dialogFormVisible.value = true
}
function showUpdateLink(data) {
  linkForm.value = JSON.parse(JSON.stringify(data))
  dialogFormVisible.value = true
}

function setImage(url) {
  linkForm.value.avatar = url
}

function getLinkList() {
  listLink().then(res => {
    tableData.value = res.data.list
  })
}

async function confirmClick(formEl) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      createLink(linkForm.value).then(res => {
        ElMessage.success('添加成功')
        dialogFormVisible.value = false
        getLinkList()
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
      updateLink(linkForm.value).then(res => {
        dialogFormVisible.value = false
        getLinkList()
        ElMessage.success('更新成功')
      })
    } else {
      ElMessage.error('请将参数填写完整')
    }
  })
}

function delLink(id) {
  ElMessageBox.confirm(
    '是否删除友链？',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      deleteLink([id]).then(res => {
        ElMessage.success('删除成功')
        getLinkList()
      })
    })
    .catch(() => {
    })
}

getLinkList()
</script>

<template>
  <el-button type="primary" @click="showCreatelink" :icon="Plus" />
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="link_name" label="友链名" />
    <el-table-column prop="avatar" label="logo" />
    <el-table-column prop="url" label="url" />
    <el-table-column prop="summary" label="简介" />
    <el-table-column prop="action" label="操作">
      <template #default="{row}" style="padding: 10px, 0;">
        <el-button
          type="primary"
          size="small"
          @click="showUpdateLink(row)"
        >
          <el-icon><Edit /></el-icon>
        </el-button>
        <el-button
          type="danger"
          size="small"
          style="margin-left: 6px;"
          @click="delLink(row.id)"
        >
          <el-icon><Delete /></el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  
  <el-drawer v-model="dialogFormVisible" size="40%" direction="rtl">
    <template #header>
      <h4>友链信息</h4>
    </template>
    <template #default>
      <el-form :model="linkForm" ref="ruleFormRef" :rules="formRules" label-width="80px">
        <el-form-item label="友链名" prop="link_name">
          <el-input v-model="linkForm.link_name" placeholder="友链名" />
        </el-form-item>
        <el-form-item label="友链链接" prop="url">
          <el-input v-model="linkForm.url" placeholder="友链链接" />
        </el-form-item>
        <el-form-item label="友链描述" prop="summary">
          <el-input v-model="linkForm.summary" placeholder="友链描述" type="textarea" autosize />
        </el-form-item>
        <el-form-item label="友链logo" prop="logo">
          <el-input v-model="linkForm.avatar" clearable placeholder="logo链接" style="margin-bottom: 10px;" />
          <div class="uploader">
            <Upload @setImage="setImage" :img="linkForm.avatar" />
          </div>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button v-if="!linkForm.id" type="primary" size="large" @click="confirmClick(ruleFormRef)">添加</el-button>
        <el-button v-else type="primary" size="large" @click="confirmUpdateClick(ruleFormRef)">更新</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped>
.uploader {
  height: 50px;
  width: 50px;
}
</style>