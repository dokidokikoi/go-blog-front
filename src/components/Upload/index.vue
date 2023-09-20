<script setup>
import { ref, watch, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { getTimeStamp } from "../../utlis/time"
import { policy } from "../../api/oss"
import axios from "axios"

const imageUrl = ref('')
const dialogVisible = ref(false)
const emit = defineEmits()
const dataObj = {
  // policy: "eyJleHBpcmF0aW9uIjoiMjAyMy0wOS0xOVQwNzoyMTowMFoiLCJjb25kaXRpb25zIjpbWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJkZGQiXV19",
  // signature: "waluwzuYEYbs4sWQ4PQoNxtuiGQ=",
  // key: "ddd1695034522438_${filename}",
  // OSSAccessKeyId: "LTAI5tSTppw38FT39WYoar2e",
  // dir: "ddd",
  // host: "harukaze-blog.oss-cn-shenzhen.aliyuncs.com",
  // expire: 1695064368732
  // callback:'',
}

const props = defineProps({
  img: {
    type: String,
    default: ''
  }
})

watch(
  () => props.img,
  (newProps) => {
    imageUrl.value = newProps
    console.log(imageUrl.value)
  }, { immediate: true }
)


const  beforeAvatarUpload = async (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }

  return new Promise((resolve, reject) => {
    policy().then(response => {
      // console.log('响应的数据', response)
      dataObj.policy = response.data.policy
      dataObj.signature = response.data.signature
      dataObj.OSSAccessKeyId = response.data.accessid
      dataObj.key = response.data.dir + getTimeStamp() + '_${filename}'
      dataObj.dir = response.data.dir
      dataObj.host = response.data.host
      // dataObj.expire = response.data.expire
      // console.log('响应的数据222。。。', dataObj)
      resolve(true)
      // reject(true)
    })
  })
}

const upload = (params) => {
  dataObj.file = params.file
  dataObj.success_action_status = 200
  console.log(dataObj)
  axios.postForm(params.action, dataObj).then(res => {
    if (res.status == 200) {
      imageUrl.value = `https://${dataObj.host}/${dataObj.key.replace('${filename}', encodeURIComponent(params.file.name))}`
      emit("setImage", imageUrl.value)

      ElMessage.success('上传成功')
    }
  })
}

onMounted(() => {
})
</script>

<template>
  <el-upload
    class="uploader"
    action="https://harukaze-blog.oss-cn-shenzhen.aliyuncs.com"
    :data="dataObj"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :http-request="upload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<style scoped>
.uploader {
  width: 100%;
  height: 100%;
  border: 1.6px dashed rgb(212, 211, 211);
  display: flex;
  justify-content: center;
  align-items: center;
}
.uploader .avatar {
  width: inherit;
  height: inherit;
  display: block;
  object-fit: cover;
}
.uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
::v-deep(.el-upload.el-upload--text) {
  width: inherit;
  height: inherit;
}
</style>