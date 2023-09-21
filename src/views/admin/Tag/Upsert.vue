<script setup>
import { ref, watch } from "vue"
import { createTag, updateTag } from "@/api/tag"
import { ElMessage } from 'element-plus'

const visible = ref(false)

const props = defineProps({
  tagDialogFormVisible: {
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
  () => props.tagDialogFormVisible,
  (newProps) => {
    visible.value = newProps
  }, { immediate: true }
)
const tagForm = ref({})
watch(
  () => props.data,
  (newProps) => {
    tagForm.value = newProps
  }, { immediate: true }
)
const rules = ref({
  tag_name: [
    { required: true, message: '请填写标签名', trigger: 'blur' },
  ],
})

const formRef = ref(null)

async function submit() {
  if (!formRef) return
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      tagForm.value.type = props.ty
      if (props.op === "create") {
        createTag(tagForm.value).then(res => {
          ElMessage.success("添加成功")
          emit('refresh')
          emit('setTagDialogFormVisible', false)
        })
      } else {
        updateTag(tagForm.value).then(res => {
          ElMessage.success("更新成功")
          emit('refresh')
          emit('setTagDialogFormVisible', false)
        })
      }
    } else {
      ElMessage.error('请将参数填写完整')
    }
  })
}
</script>

<template>
  <el-dialog v-model="visible" :title="op=='create'? '新增标签':'修改标签'" @close="emit('setTagDialogFormVisible', false)">
    <el-form :model="tagForm" ref="formRef" :rules="rules">
      <el-form-item label="标签名" prop="tag_name" label-width="80px">
        <el-input v-model="tagForm.tag_name" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('setTagDialogFormVisible', false)">取消</el-button>
        <el-button type="primary" @click="submit()">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>