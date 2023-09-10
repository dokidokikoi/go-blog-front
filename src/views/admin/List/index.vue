<script setup>
import { ref } from "vue"
import { Plus, Edit, Delete  } from '@element-plus/icons-vue'

const tableData = ref([
  {
    id: 1,
    name: "技术文章",
    type: "文章"
  }
])
const dialogFormVisible = ref(false)
const listType = ref("")

function showDialog() {
  dialogFormVisible.value = true
}
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <el-select v-model="listType" placeholder="列表类别">
          <el-option label="书籍" value="书籍" />
          <el-option label="动漫" value="动漫" />
          <el-option label="电影" value="电影" />
        </el-select>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" @click="showDialog" :icon="Plus" />
    </el-col>
  </el-row>
  
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="name" label="项目名" />
    <el-table-column prop="progress" label="当前进度" />
    <el-table-column prop="total" label="总流程" />
    <el-table-column prop="compony" label="公司" />
    <el-table-column prop="author" label="作者" />
    <el-table-column prop="production_date" label="发售日期" />
    <el-table-column prop="action" label="操作">
      <template #default="props" style="padding: 10px, 0;">
        <el-button
          type="primary"
          size="small"
        >
          <el-icon><Edit /></el-icon>
        </el-button>
        <el-button
          type="danger"
          size="small"
          style="margin-left: 6px;"
        >
          <el-icon><Delete /></el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogFormVisible" title="添加系列">
    <el-form :model="seriesFrom" label-width="80px">
      <el-form-item label="系列名">
        <el-input v-model="seriesFrom.name" placeholder="系列名" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>