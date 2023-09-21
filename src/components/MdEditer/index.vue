<template>
  <v-md-editor 
  :disabled-menus="[]" 
  v-model="text"
  @change="updateValue"
  height="530px" 
  @upload-image="handleUploadImage"
  @save="saveText"
  @image-click="imageFocus"
  tab-size="4"
  :include-level="[1, 2, 3,4]"
  ></v-md-editor>
  <el-dialog v-model="dialogImageVisible" center>
    <el-carousel :initial-index="dialogImageIndex" :autoplay="false" height="400px">
      <el-carousel-item v-for="item in dialogImages" :key="item">
        <el-image :src="item" fit="cover"/>
      </el-carousel-item>
    </el-carousel>
  </el-dialog>
</template>

<script setup>
import { ref, watch, computed } from "vue"
import { setItem, getItem } from "../../utlis/localStorage";
import { ElMessage } from 'element-plus'
import { policy } from "../../api/oss"
import axios from "axios"
import { getTimeStamp } from "../../utlis/time"

const emit = defineEmits()
const props = defineProps({
  body: {
    type: String,
    default: ''
  },
  key: {
    type: String,
    default: 'edit'
  }
})

const text = ref(
// '## test \n' +
// '```go \n' +
// 'fmt.Println("test") \n' + 
// '```\n' +
// '![golang](https://www.freecodecamp.org/news/content/images/2021/10/golang.png)\n' +
// '![golang](https://www.freecodecamp.org/news/content/images/2021/10/golang.png)'
)

watch(
  () => props.body,
  (newProps) => {
    text.value = newProps
  }, { immediate: true }
)

let dialogImageVisible = ref(false)
let dialogImages = ref([])
let dialogImageIndex = ref(0)

async function handleUploadImage(event, insertImage, files) {
  // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
  const rawFile = files[0]
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }

  let dataObj = {}
  await policy().then(response => {
    dataObj.policy = response.data.policy
    dataObj.signature = response.data.signature
    dataObj.OSSAccessKeyId = response.data.accessid
    dataObj.key = response.data.dir + getTimeStamp() + '_${filename}'
    dataObj.dir = response.data.dir
    dataObj.host = response.data.host
  })

  dataObj.file = rawFile
  dataObj.success_action_status = 200
  console.log(dataObj)
  axios.postForm("https://" + dataObj.host, dataObj).then(res => {
    if (res.status == 200) {
      insertImage({
        url:
          `https://${dataObj.host}/${dataObj.key.replace('${filename}', encodeURIComponent(rawFile.name))}`,
        desc: 'image',
        // width: 'auto',
        // height: 'auto',
      });

      // ElMessage.success('上传成功')
    }
  })
}

function updateValue(h, t) {
  emit("textChange", h, t)
}

function saveText() {
  setItem(props.key, text.value)
  console.log(getItem(props.key))
}

function imageFocus(images, currentIndex) {
  // console.log(images, currentIndex)
  dialogImageVisible.value = true
  dialogImages.value = images
  dialogImageIndex = currentIndex
}

// setInterval(()=>{
//   saveText()
// }, 10000)
</script>


<style scoped>

</style>