<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <!-- {{ $store.state.user?.user_info.nickname }} -->
      <el-avatar
        shape="square"
        :size="35"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <!-- <el-icon><CaretBottom /></el-icon> -->
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="toProfilePage">个人中心</el-dropdown-item>
        <el-dropdown-item @click="handleLogout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import {CaretBottom} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';

const router = useRouter()
// const store = useStore()

// const handleLogout = () => {
//   // 退出提示
//   ElMessageBox.confirm('确认退出吗？', '退出提示', {
//     confirmButtonText: '确定',
//     cancelButtonText: '取消',
//     type: 'warning'
//   }).then(async () => {
    // 确认发出退出请求
  //   await logout()

  //   // 清除用户登录信息
  //   store.commit('setUser', null)

  //   ElMessage({
  //     type: 'success',
  //     message: '退出成功!'
  //   })

  //   // 跳转到登录页
  //   router.push({
  //     name: 'login'
  //   })
  // }).catch(() => {
  //   ElMessage({
  //     type: 'info',
  //     message: '已取消退出'
  //   })
  // })
// }

function toProfilePage() {
  router.push("/admin/profile")
}
</script>

<style scoped>
.el-dropdown:hover {
  cursor: pointer;
}
</style>
