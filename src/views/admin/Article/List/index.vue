<template>
  <el-form>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="关键字">
          <el-input v-model="searchParams.keyword" placeholder="Please input" />
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="分类">
          <el-select v-model="searchParams.category" clearable placeholder="Select">
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.category_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="系列">
          <el-select v-model="searchParams.series" clearable placeholder="Select">
            <el-option
              v-for="item in series"
              :key="item.id"
              :label="item.series_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="标签">
          <el-select v-model="searchParams.tags" multiple clearable placeholder="Select">
            <el-option
              v-for="item in tags"
              :key="item.id"
              :label="item.tag_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-row :gutter="20">
    <el-col :span="6"><el-button type="primary" @click="search" :icon="Search">Search</el-button></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="6"><el-button type="primary" @click="toEditPage" :icon="EditPen">写文章</el-button></el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="expand" fixed>
          <template #default="props">
            <div m="4">
              <p m="t-0 b-2">Title: {{ props.row.title }}</p>
              <h3>Family</h3>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title" fixed label="标题" width="180" />
        <el-table-column prop="category" label="类别">
          <template #default="{row}">
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
        <el-table-column prop="views" label="观看数" />
        <el-table-column prop="comments" label="评论数" />
        <el-table-column prop="created_at" sortable label="发布时间" />
        <el-table-column prop="updated_at" sortable label="更新时间" />
        <el-table-column prop="status" label="文章状态" />
        <el-table-column prop="action" label="操作" fixed="right"  width="140">
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
  <el-pagination background layout="prev, pager, next" :total="totalCount" />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Search, Star, Edit, Delete, EditPen } from '@element-plus/icons-vue'
import { listArticle } from "@/api/article"
import { listCategory } from "@/api/category"
import { listTag } from "@/api/tag"
import { listSeries } from "@/api/series"

const totalCount = ref(0)
const searchParams = ref({
  keyword: "",
  tags: [],
})
const categories = ref([
])
const series = ref([
])
const tags = ref([
])
const tableData = ref([
])

const router = useRouter();

function search() {
  listArticle(searchParams.value).then(res => {
    tableData.value = res.data.list
    totalCount.value = res.data.total
  })
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

function toEditPage() {
  router.push('/admin/article/edit');
}

search()
getCategoryList()
getSeriesList()
getTagList()
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
