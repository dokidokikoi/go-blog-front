<script setup>
import { ref } from 'vue';
import Bannar from '@/components/Bannar/index.vue';
import List from './List.vue';
import { getItem } from '@/utlis/localStorage'
 
const showInfo = ref(false)
const siteMsg = ref({}) 
const host = ref({})

function getLinkMsg() {
  showInfo.value = !showInfo.value
}

host.value = getItem('host')
</script>

<template>
<div>
  <Bannar />
  <div style="background-color: white; width: 100%; min-height: 740px;">
    <div class="body">
      <h1>INFO</h1>
      <div class="info">
          <p><span>title: </span><span>harukaze</span></p>
          <p><span>description: </span><span>{{ host.intro }}</span></p>
          <p><span>url: </span><span>https://harukaze.top</span></p>
          <p><span>avatar: </span><span>{{ host.avatar }}</span></p>
      </div>
      <h3>欢迎添加友链</h3>
      <div class="msg">
        <div style="margin-bottom: 20px;">请在添加本站友链后发送信息到<strong>邮箱</strong>，信息格式如下：</div>
        <el-form :model="form" label-width="100px" style="width: 80%;margin: auto;margin-bottom: 20px;">
          <el-form-item label="title: ">
            <el-input maxlength="10" v-model="siteMsg.title" placeholder="站点名，10字符以内" />
          </el-form-item>
          <el-form-item label="description: ">
            <el-input autosize type="textarea" v-model="siteMsg.description" placeholder="站点介绍" />
          </el-form-item>
          <el-form-item label="url: ">
            <el-input type="text" v-model="siteMsg.url" placeholder="站点网址" />
          </el-form-item>
          <el-form-item label="avatar: ">
            <el-input type="text" v-model="siteMsg.avatar" placeholder="站点封面" />
          </el-form-item>
            <div class="btn-div">
              <el-button type="primary"  @click="getLinkMsg">生成友链信息</el-button>
            </div>
        </el-form>
        <div id="link-info" v-show="showInfo">
          <h1>INFO</h1>
          <div class="info">
            <div class="">
              <p><span>title: </span><span>{{ siteMsg.title }}</span></p>
              <p><span>description: </span><span>{{ siteMsg.description }}</span></p>
              <p><span>url: </span><span>{{ siteMsg.url }}</span></p>
              <p><span>avatar: </span><span>{{ siteMsg.avatar }}</span></p>
            </div>
          </div>
        </div>
      </div>
      <h3>友链列表</h3>
      <List />
    </div>
  </div>
</div>
</template>

<style scoped>
.body {
  /* display: flex;
  justify-content: space-between; */
  max-width: 54rem;
  margin: auto;
  background-color: white;
}
.body h1 {
  text-align: center;
  position: relative;
  top: 10px;
  width: 200px;
  margin: auto;
  background-color: white;
  color: cadetblue;
  font-weight: 600;
}
.info {
  width: 550px;
  margin: auto;
  margin-bottom: 40px;
  padding: 20px;
  border: 2px dashed #ccc;
  /* border-top: none; */
  /* display: flex;
  align-items: center;
  justify-content: center; */
}
.info p span:nth-child(1) {
  display: inline-block;
  width: 40%;
  text-align: right;
  padding-right: 10px;
}
.info p span:nth-child(2) {
  display: inline-block;
  width: 60%;
}
.body h3 {
  font-size: 1.4em;
  font-weight: 500;
  padding: 5px 16px;
  margin-bottom: 20px;
  border-left: 4px solid palevioletred;
}
.msg {
  margin: auto;
}
.msg strong {
  color: palevioletred;
  font-weight: 600;
}
.btn-div {
  /* position: relative;
  float: right;
  margin-bottom: 30px; */
  display: flex;
  justify-content: end;
}
#link-info {
  transition-duration: .3s;
}
</style>