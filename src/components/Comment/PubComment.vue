<template>
  <el-form
    :model="commentParam"
    :rules="rules"
    label-position="top"
    ref="commentForm"
  >
    <el-form-item
      label="评论"
      prop="content"
    >
      <el-input
        type="textarea"
        v-model="commentParam.content"
        :autosize="{ minRows: 4, maxRows: 4}"
        placeholder="不写点什么吗..."
      />
    </el-form-item>
    <el-form-item
      label="昵称"
      prop="nickname"
      style="width: 45%"
    >
      <el-input
        placeholder="姓名或昵称"
        v-model="commentParam.nickname"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="success"
        style="width: 100px"
        @click="recover"
        :loading="isLoad"
      >
        点击发表
      </el-button>
      <slot />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { createComment } from '@/api/comment'

const props = defineProps({
  parentId: {
    type: Number,
    default: 0
  },
  articleId: {
    type: Number,
    default: 0
  },
  toUserName: {
    type: String,
    default: ''
  },
  // loadList: {
  //   default: () => {}
  // },
  cancel: {
    default: () => {}
  }
})
const emit = defineEmits()
const commentParam = reactive({
  content: '',
  article_id: 0,
  nickname: '',
  pid: 0,
  to_nickname: ''
})

const init = () => {
  commentParam.pid = props.parentId
  commentParam.article_id = props.articleId
  commentParam.to_nickname = props.toUserName
}
init()

const rules = reactive({
  content: [
    { required: true, message: '居然什么都不写...', trigger: 'blur' }
  ],
  nickname: [
    { required: true, message: '无名氏吗...', trigger: 'blur' }
  ]
})

const isLoad = ref(false)
const commentForm = ref(null)
const recover = async () => {
  isLoad.value = true
  // 表单验证
  const valid = await commentForm.value?.validate()
  if (!valid) {
    return false
  }

  const data = await createComment(commentParam).finally(() => {
    isLoad.value = false
  })

  if (data.code === 0) {
    ElMessage.success('发布成功')
    commentParam.content = ''
    commentParam.nickname = ''
    // props.cancel()
    // props.loadList()
    emit("loadList")
    emit("cancel")
  }
}

</script>

<style scoped>

</style>
