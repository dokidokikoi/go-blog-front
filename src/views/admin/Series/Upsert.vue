<script setup>
import { ref, watch } from "vue"
import { createSeries, updateSeries } from "@/api/series"
import { ElMessage } from 'element-plus'

const visible = ref(false)

const props = defineProps({
  seriesDialogFormVisible: {
    type: Boolean,
    default: false
  },
  op: {
    type: String,
    default: "create"
  },
  data: {
    type: Object,
    default: {}
  }
})

const emit = defineEmits()

watch(
  () => props.seriesDialogFormVisible,
  (newProps) => {
    visible.value = newProps
  }, { immediate: true }
)
const seriesForm = ref({})
watch(
  () => props.data,
  (newProps) => {
    seriesForm.value = newProps
  }, { immediate: true }
)
const rules = ref({
  series_name: [
    { required: true, message: '请填写系列名', trigger: 'blur' },
  ],
  summary: [
    { required: true, message: '请填写系列介绍', trigger: 'blur' },
  ]
})

const formRef = ref(null)

async function submit() {
  if (!formRef) return
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      if (props.op === "create") {
        createSeries(seriesForm.value).then(res => {
          ElMessage.success("添加成功")
          emit('refresh')
          emit('setSeriesDialogFormVisible', false)
        })
      } else {
        updateSeries(seriesForm.value).then(res => {
          ElMessage.success("更新成功")
          emit('refresh')
          emit('setSeriesDialogFormVisible', false)
        })
      }
    } else {
      ElMessage.error('请将参数填写完整')
    }
  })
}
</script>

<template>
  <el-dialog v-model="visible" :title="op=='create'? '新增系列':'修改系列'" @close="emit('setSeriesDialogFormVisible', false)">
    <el-form :model="seriesForm" ref="formRef" :rules="rules">
      <el-form-item label="系列名" prop="series_name" label-width="80px">
        <el-input v-model="seriesForm.series_name" />
      </el-form-item>
      <el-form-item label="系列简介" prop="summary" label-width="80px">
        <el-input v-model="seriesForm.summary" type="textarea"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('setSeriesDialogFormVisible', false)">取消</el-button>
        <el-button type="primary" @click="submit()">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>