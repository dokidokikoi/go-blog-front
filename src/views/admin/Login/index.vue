<script setup>
import { ref, onMounted } from 'vue';
import { getCaptcha, login } from '@/api/user'
import { setItem } from "@/utlis/localStorage"
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()

const loginParam = ref({
  email: "",
  password: "",
  uuid: "",
  code: ""
})

const captchaImg = ref("")

function userLogin() {
  login(loginParam.value).then(res => {
    if (res.code !== 0) {
      ElMessage.error('登陆失败')
      return
    }
    setItem("token", res.data.token)
    // 跳转回原来页面
    let redirect = route.query.redirect
    if (typeof redirect !== 'string') {
      redirect = '/admin'
    }
    router.replace(redirect)
  }).catch(err => {
    console.log(err)
  })
}
 
function captcha() {
  getCaptcha().then(res => {
    console.log(res)
    loginParam.value.uuid = res.data.uuid
    captchaImg.value = res.data.captcha
  })
}

onMounted(() => {
  captcha()
})
</script>

<template>
<div class="body">
  <div class="login">
    <h1>Login</h1>
    <form method="post">
      <input type="text" v-model="loginParam.email" name="e" placeholder="Email" required="required" />
      <input type="password" v-model="loginParam.password" name="p" placeholder="Password" required="required" />
      <div class="captha">
        <input type="text" v-model="loginParam.code" name="c" placeholder="Captha" required="required" />
        <div style="width: 35%;margin-bottom: 10px;" @click="captcha">
          <img :src="captchaImg" alt="">
        </div>
      </div>
      <el-button color="#626aef" @click="userLogin" :dark="isDark" style="width: 100%; margin-top: 20px;">Login in</el-button>
    </form>
  </div>
</div>
</template>

<style scoped>
.body {
  width: 100%;
  height: 100vh;
  font-family: "Open Sans", sans-serif;
  background: #092756;
  background: -moz-radial-gradient(
      0% 100%,
      ellipse cover,
      rgba(104, 128, 138, 0.4) 10%,
      rgba(138, 114, 76, 0) 40%
    ),
    -moz-linear-gradient(top, rgba(57, 173, 219, 0.25) 0%, rgba(42, 60, 87, 0.4)
          100%),
    -moz-linear-gradient(-45deg, #670d10 0%, #092756 100%);
  background: -webkit-radial-gradient(
      0% 100%,
      ellipse cover,
      rgba(104, 128, 138, 0.4) 10%,
      rgba(138, 114, 76, 0) 40%
    ),
    -webkit-linear-gradient(top, rgba(57, 173, 219, 0.25) 0%, rgba(
            42,
            60,
            87,
            0.4
          )
          100%),
    -webkit-linear-gradient(-45deg, #670d10 0%, #092756 100%);
  background: -o-radial-gradient(
      0% 100%,
      ellipse cover,
      rgba(104, 128, 138, 0.4) 10%,
      rgba(138, 114, 76, 0) 40%
    ),
    -o-linear-gradient(top, rgba(57, 173, 219, 0.25) 0%, rgba(42, 60, 87, 0.4)
          100%),
    -o-linear-gradient(-45deg, #670d10 0%, #092756 100%);
  background: -ms-radial-gradient(
      0% 100%,
      ellipse cover,
      rgba(104, 128, 138, 0.4) 10%,
      rgba(138, 114, 76, 0) 40%
    ),
    -ms-linear-gradient(top, rgba(57, 173, 219, 0.25) 0%, rgba(42, 60, 87, 0.4)
          100%),
    -ms-linear-gradient(-45deg, #670d10 0%, #092756 100%);
  background: -webkit-radial-gradient(
      0% 100%,
      ellipse cover,
      rgba(104, 128, 138, 0.4) 10%,
      rgba(138, 114, 76, 0) 40%
    ),
    linear-gradient(
      to bottom,
      rgba(57, 173, 219, 0.25) 0%,
      rgba(42, 60, 87, 0.4) 100%
    ),
    linear-gradient(135deg, #670d10 0%, #092756 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3E1D6D', endColorstr='#092756',GradientType=1 );
}
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -150px;
  width: 300px;
  height: 300px;
}
.login h1 {
  color: #fff;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
  text-align: center;
  margin-bottom: 40px;
}

input {
  width: 100%;
  margin-bottom: 10px;
  background: rgba(0, 0, 0, 0.3);
  border: none;
  outline: none;
  padding: 10px;
  font-size: 13px;
  color: #fff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  box-shadow: inset 0 -5px 45px rgba(100, 100, 100, 0.2),
    0 1px 1px rgba(255, 255, 255, 0.2);
  -webkit-transition: box-shadow 0.5s ease;
  -moz-transition: box-shadow 0.5s ease;
  -o-transition: box-shadow 0.5s ease;
  -ms-transition: box-shadow 0.5s ease;
  transition: box-shadow 0.5s ease;
}
input:focus {
  box-shadow: inset 0 -5px 45px rgba(100, 100, 100, 0.4),
    0 1px 1px rgba(255, 255, 255, 0.2);
}
.captha {
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
}
.captha input {
  width: 60%;
}
.captha img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>