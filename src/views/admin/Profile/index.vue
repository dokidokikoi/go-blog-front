<script setup>
import { getUser, updateUser } from "@/api/user"
import { ref } from 'vue'
import Pin from "@/components/icons/Pin.vue"
import Upload from "@/components/Upload/index.vue"
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const userInfo = ref({})
const showNickname = ref(true)
const showEmail = ref(true)
const showIntro = ref(true)
const dialogVisible = ref(false)

function updateUserInfo() {
  showNickname.value = true
  showEmail.value = true
  showIntro.value = true
  updateUser(userInfo.value).then(res => {
    ElMessage.success("更新成功")
    getUser(userStore.user.id).then(res => {
      userInfo.value = res.data
      userStore.setUser(res.data)
    })
  })
}

function setImage(url) {
  userInfo.value.avatar = url
}

function updateAvatar() {
  updateUserInfo()
  dialogVisible.value = false
}

userInfo.value = userStore.user
</script>

<template>
<div class="body">
  <div class="over-avatar">
    <div class="avatar">
      <img :src="userInfo.avatar" alt="">
    </div>
    <Pin class="pin" @click="dialogVisible=true" width="30" height="30"/>
  </div>
  <div class="info"> 
    <h2 v-show="showNickname" style="font-size: 1.5em;font-weight: 500;" @click="showNickname=false"> {{ userInfo.nick_name }} </h2>
    <el-input v-show="!showNickname" :autofocus="true" @blur="updateUserInfo" v-model="userInfo.nick_name"></el-input>
    <h3 style="margin-left: 4px;color: gray;position: relative;top: -7px;">@{{userInfo.account}}</h3>
    <div>
      <span>邮箱:</span>
      <span v-if="showEmail" style="margin-left: 10px;" @click="showEmail=false">{{userInfo.email}}</span>
      <el-input v-else :autofocus="true" @blur="updateUserInfo" v-model="userInfo.email"></el-input>
    </div>
  </div>
  <p v-if="showIntro" class="intro" @click="showIntro=false">
    {{ userInfo.intro === "" ? "暂无内容":userInfo.intro }}
  </p>
  <el-input class="intro" v-else :autofocus="true" @blur="updateUserInfo" v-model="userInfo.intro" type="textarea" autosize></el-input>

  <el-dialog
    :close-on-click-modal="false"
    v-model="dialogVisible"
    title="更新头像"
    width="400px"
    :before-close="handleClose"
  >
    <div class="over-uploader">
      <div style="display: flex;width: 100%;align-items: center;">
        <span style="width: 80px;">头像链接</span>
        <el-input v-model="userInfo.avatar"></el-input>
      </div>
      <div class="uploader">
        <Upload @setImage="setImage" :img="userInfo.avatar" /> 
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateAvatar">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</div>
</template>

<style scoped>
.body {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.avatar {
  height: 320px;
  width: 320px;
  border-radius: 50%;
  overflow: hidden;
}
.avatar img {
  width: inherit;
  object-fit: cover;
}
.over-avatar {
  position: relative;
}
.pin {
  position: absolute;
  bottom: 42px;
  right: 28px;
}
.pin:hover {
  cursor: pointer;
}
.info {
  max-width: 600px;
  min-width: 300px;
}
.intro {
  max-width: 600px;
  margin-top: 40px;
}
.uploader {
  height: 320px;
  width: 320px;
  border-radius: 50%;
  margin-top: 20px;
  /* overflow: hidden; */
}
.over-uploader {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>