<script setup>
import { ref, watch } from "vue"
import { createCategory, updateCategory } from "@/api/category"
import { ElMessage } from 'element-plus'

const visible = ref(false)

const props = defineProps({
  categoryDialogFormVisible: {
    type: Boolean,
    default: false
  },
  op: {
    type: String,
    default: "create"
  },
  ty: {
    type: Number,
    default: 1
  },
  data: {
    type: Object,
    default: {}
  }
})

const emit = defineEmits()

watch(
  () => props.categoryDialogFormVisible,
  (newProps) => {
    visible.value = newProps
  }, { immediate: true }
)
const categoryForm = ref({})
watch(
  () => props.data,
  (newProps) => {
    categoryForm.value = newProps
  }, { immediate: true }
)
const rules = ref({
  category_name: [
    { required: true, message: '请填写分类名', trigger: 'blur' },
  ],
  summary: [
    { required: true, message: '请填写分类介绍', trigger: 'blur' },
  ]
})

const formRef = ref(null)

async function submit() {
  if (!formRef) return
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      categoryForm.value.type = props.ty
      if (props.op == "create") {
        createCategory(categoryForm.value).then(res => {
          ElMessage.success("添加成功")
          emit('refresh')
          emit('setCategoryDialogFormVisible', false)
        })
      } else {
        updateCategory(categoryForm.value).then(res => {
          ElMessage.success("更新成功")
          emit('refresh')
          emit('setCategoryDialogFormVisible', false)
        })
      }
    } else {
      ElMessage.error('请将参数填写完整')
    }
  })
}
</script>

<template>
  <el-dialog v-model="visible" :title="op=='create'? '新增分类':'修改分类'" @close="emit('setCategoryDialogFormVisible', false)">
    <el-form :model="categoryForm" ref="formRef" :rules="rules">
      <el-form-item label="分类名" prop="category_name" label-width="80px">
        <el-input v-model="categoryForm.category_name" />
      </el-form-item>
      <el-form-item label="分类简介" prop="summary" label-width="80px">
        <el-input v-model="categoryForm.summary" type="textarea"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('setCategoryDialogFormVisible', false)">取消</el-button>
        <el-button type="primary" @click="submit()">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>