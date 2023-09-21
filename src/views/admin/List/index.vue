<script setup>
import { ref } from "vue"
import { Plus, Edit, Delete  } from '@element-plus/icons-vue'
import Upload from "@/components/Upload/index.vue"
import { listList, updateList, createList, deleteList } from '@/api/list'
import { ElMessage, ElMessageBox } from 'element-plus'
import { formatTime, formatDay } from "@/utlis/time"

const tableData = ref([
])
const showSaveItem = ref(false)
const typeList = ref([
  {
    label: "动漫",
    value: 1
  },
  {
    label: "游戏",
    value: 2
  },
  {
    label: "电影",
    value: 3
  },
  {
    label: "书籍",
    value: 4
  },
])
const itemParam = ref({})
const ruleFormRef = ref(null)
const formRules = ref({
  item_name: [
    { required: true, message: '请填写项目名', trigger: 'blur' },
  ],
  cover: [
    { required: true, message: '请上上传项目封面', trigger: 'change' },
  ],
  summary: [
    { required: true, message: '请填写项目介绍', trigger: 'blur' },
  ],
  total: [
    { required: true, message: '请填写项目总流程', trigger: 'blur' },
  ],
  progress: [
    { required: true, message: '请填写项目进度', trigger: 'blur' },
  ],

})
const totalCount = ref(0)
const searchParam = ref({
  page: 1,
  page_size: 10,
  order_by: "id asc",
  type: 1
})
function createItem() {
  itemParam.value = {}
  showSaveItem.value = true
}
function updateitem(data) {
  itemParam.value = JSON.parse(JSON.stringify(data))
  showSaveItem.value = true
}

function setImage(url) {
  itemParam.cover = url
}

function getListList() {
  listList(searchParam.value).then(res => {
    tableData.value = res.data.list
    totalCount.value = res.data.total
  })
}
function currentChange(curr) {
  searchParam.value.page = curr
  getListList()
}

function typeChange() {
  getListList()
}

async function confirmClick(formEl) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      itemParam.value.type = searchParam.value.type
      createList(itemParam.value).then(res => {
        ElMessage.success('添加成功')
        getListList()
        showSaveItem.value = false
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
      itemParam.value.type = searchParam.value.type
      updateList(itemParam.value).then(res => {
        ElMessage.success('更新成功')
        getListList()
        showSaveItem.value = false
      })
    } else {
      ElMessage.error('请将参数填写完整')
    }
  })
}

function delItem(id) {
  ElMessageBox.confirm(
    '是否删除项目？',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      deleteList([id]).then(res => {
        ElMessage.success('删除成功')
        getListList()
      })
    })
    .catch(() => {
    })
}

getListList()
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <el-select v-model="searchParam.type" placeholder="列表类别" @change="typeChange">
          <el-option v-for="item in typeList" :key="item.label" :label="item.label" :value="item.value" />
        </el-select>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" @click="createItem" :icon="Plus" />
    </el-col>
  </el-row>
  
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column type="expand" fixed>
      <template #default="{row}">
        <div style="margin-left: 20px;">
          <p>项目简介:</p>
          <br>
          <p style="margin-left: 20px;">{{ row.summary }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="item_name" label="项目名" />
    <el-table-column prop="total" label="总流程" />
    <el-table-column prop="progress" label="当前进度" />
    <el-table-column prop="company" label="发行商" />
    <el-table-column prop="author" label="作者" />
    <el-table-column prop="serial_number" label="序列号" />
    <el-table-column prop="rate" label="评分" />
    <el-table-column prop="production_date" label="发售日期">
      <template #default="{row}" style="padding: 10px, 0;">
        {{ formatDay(row.production_date) }}
      </template>
    </el-table-column>
    <el-table-column prop="created_at" label="创建日期">
      <template #default="{row}" style="padding: 10px, 0;">
        {{ formatTime(row.created_at) }}
      </template>
    </el-table-column>
    <el-table-column prop="action" label="操作" width="110">
      <template #default="{row}" style="padding: 10px, 0;">
        <el-button
          type="primary"
          size="small"
          @click="updateitem(row)"
        >
          <el-icon><Edit /></el-icon>
        </el-button>
        <el-button
          type="danger"
          size="small"
          style="margin-left: 6px;"
          @click="delItem(row.id)"
        >
          <el-icon><Delete /></el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next"  style="margin-top: 20px;"
  @current-change="currentChange" @prev-click="currentChange" @next-click="currentChange" :total="totalCount" />
  
  <el-drawer v-model="showSaveItem" size="40%" direction="rtl">
    <template #header>
      <h4>项目信息</h4>
    </template>
    <template #default>
      <el-form :model="itemParam" ref="ruleFormRef" :rules="formRules" label-width="100px">
        <el-form-item label="项目名" prop="item_name">
          <el-input v-model="itemParam.item_name" placeholder="项目名" />
        </el-form-item>
        <el-form-item label="项目总流程" prop="total">
          <el-input v-model.number="itemParam.total" type="number" placeholder="项目总流程" />
        </el-form-item>
        <el-form-item label="项目进度" prop="progress">
          <el-input v-model.number="itemParam.progress" type="number" placeholder="项目进度" />
        </el-form-item>
        <el-form-item label="项目简介" prop="summary">
          <el-input v-model="itemParam.summary" placeholder="项目简介" type="textarea" autosize />
        </el-form-item>
        <el-form-item label="发行商" prop="company">
          <el-input v-model="itemParam.company" placeholder="发行商" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="itemParam.author" placeholder="作者" />
        </el-form-item>
        <el-form-item label="序列号" prop="serial_number">
          <el-input v-model="itemParam.serial_number" placeholder="序列号" />
        </el-form-item>
        <el-form-item label="发行日期" prop="production_date">
          <el-date-picker
            v-model="itemParam.production_date"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="评分" prop="rate">
          <el-rate v-model="itemParam.rate" allow-half />
        </el-form-item>
        <el-form-item label="项目封面" prop="cover">
          <el-input v-model="itemParam.cover" clearable placeholder="封面链接" style="margin-bottom: 10px;" />
          <div class="uploader">
            <Upload @setImage="setImage" :img="itemParam.cover" />
          </div>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button v-if="!itemParam.id" type="primary" size="large" @click="confirmClick(ruleFormRef)">发布</el-button>
        <el-button v-else type="primary" size="large" @click="confirmUpdateClick(ruleFormRef)">更新</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.uploader {
  height: 300px;
  width: 240px;
}

</style>