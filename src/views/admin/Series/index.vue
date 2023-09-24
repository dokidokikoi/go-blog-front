<script setup>
import { ref } from "vue"
import { Plus, Edit, Delete  } from '@element-plus/icons-vue'
import { listSeries, deleteSeries } from '@/api/series'
import Upsert from './Upsert.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const op = ref("")
const tableData = ref([
])
const dialogFormVisible = ref(false)
const seriesForm = ref({})

function setDialogFormVisible(bool) {
  dialogFormVisible.value = bool
}

function getSeriesList() {
  listSeries().then(res => {
    tableData.value = res.data.list
  })
}

function editSeries(data) {
  op.value = "update"
  seriesForm.value = data
  setDialogFormVisible(true)
}

function createSeries() {
  op.value = "create"
  seriesForm.value = {}
  setDialogFormVisible(true)
}

function delSeries(id) {
  ElMessageBox.confirm(
    '是否删除系列？',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      deleteSeries([id]).then(res => {
        ElMessage.success('删除成功')
        getSeriesList()
      })
    })
    .catch(() => {
    })
}

getSeriesList()
</script>

<template>
  <el-button type="primary" @click="createSeries(true)" :icon="Plus" />
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="id" label="ID" width="60"/>
    <el-table-column prop="series_name" label="系列名" />
    <el-table-column prop="summary" label="系列介绍" />
    <el-table-column prop="action" label="操作" fixed="right" width="110">
      <template #default="{row}" style="padding: 10px, 0;">
        <el-button
          type="primary"
          size="small"
          @click="editSeries(row)"
        >
          <el-icon><Edit /></el-icon>
        </el-button>
        <el-button
          type="danger"
          size="small"
          style="margin-left: 6px;"
          @click="delSeries(row.id)"
        >
          <el-icon><Delete /></el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  
  <Upsert 
  :op="op"
  :data="seriesForm"
  :series-dialog-form-visible="dialogFormVisible" 
  @setSeriesDialogFormVisible="setDialogFormVisible"
  @refresh="getSeriesList" />
</template>

<style scoped>
</style>