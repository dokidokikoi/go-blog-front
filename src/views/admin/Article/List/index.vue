<template>
  <el-row :gutter="20">
    <el-col :span="6"><el-input v-model="inputParam.title" placeholder="Please input" /></el-col>
    <el-col :span="6"><el-input v-model="inputParam.summay" placeholder="Please input" /></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="6"><el-button type="primary" :icon="Search">Search</el-button></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="6"><el-button type="primary" @click="toEditPage" :icon="EditPen">写文章</el-button></el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
            <div m="4">
              <p m="t-0 b-2">Title: {{ props.row.title }}</p>
              <h3>Family</h3>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180" />
        <el-table-column prop="category" label="类别" />
        <el-table-column prop="tags" label="标签" />
        <el-table-column prop="views" label="观看数" />
        <el-table-column prop="comments" label="评论数" />
        <el-table-column prop="created_at" sortable label="发布时间" />
        <el-table-column prop="updated_at" sortable label="更新时间" />
        <el-table-column prop="status" label="文章状态" />
        <el-table-column prop="action" label="操作">
          <template #default="props" style="padding: 10px, 0;">
            <div class="xyz">
              <el-tooltip
                effect="dark"
                content="编辑文章"
                placement="top-start"
              >
                <el-button
                  type="primary"
                  size="small"
                >
                  <el-icon><Edit /></el-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip
                effect="dark"
                content="删除文章"
                placement="top-start"
              >
                <el-button
                  type="danger"
                  size="small"
                  style="margin: 0;"
                >
                  <el-icon><Delete /></el-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip
                effect="dark"
                content="置顶文章"
                placement="bottom-start"
                style="margin: 10px;"
              >
                <el-badge
                  is-dot
                  style="z-index: 100;"
                >
                  <el-button
                    type="info"
                    size="small"
                  >
                    <el-icon><Star /></el-icon>
                  </el-button>
                </el-badge>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-pagination background layout="prev, pager, next" :total="1000" />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Search, Star, Edit, Delete, EditPen } from '@element-plus/icons-vue'

const tableData = ref([
  {
    title: "linux泰酷辣",
    date: '2016-05-03',
    name: 'Tom',
    cover: '',
  },
  {
    title: "linux泰酷辣",
    date: '2016-05-03',
    name: 'Tom',
    cover: '',
  },
])
const inputParam = ref({})
const router = useRouter();
function toEditPage() {
  router.push('/admin/article/edit');
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.xyz {
  padding: 6px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
