<script setup>
import { ref } from "vue"
import { Plus, Edit, Delete  } from '@element-plus/icons-vue'

const tableData = ref([
  {
    id: 1,
    name: "golang",
    type: "文章"
  }
])
const dialogFormVisible = ref(false)
const tagFrom = ref({})

function showDialog() {
  dialogFormVisible.value = true
}
</script>

<template>
  <el-button type="primary" @click="showDialog" :icon="Plus" />
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="name" label="标签名" />
    <el-table-column prop="type" label="标签类型" />
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
  <el-dialog v-model="dialogFormVisible" title="添加标签">
    <el-form :model="tagFrom" label-width="80px">
      <el-form-item label="标签名">
        <el-input v-model="tagFrom.name" placeholder="标签名" />
      </el-form-item>
      <el-form-item label="标签类别" :label-width="formLabelWidth">
        <el-select v-model="tagFrom.type" placeholder="标签类别">
          <el-option label="文章" value="文章" />
          <el-option label="网站" value="网站" />
        </el-select>
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
</style>