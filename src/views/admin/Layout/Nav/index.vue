<template>
  <div style="height: 60px;display: flex;justify-content: center; align-items: center;">
    <h1 style="font-size: 1.5em;font-weight: 800; color: aliceblue;">Haru Admin</h1>
  </div>
  <el-menu
    router
    :collapse-transition="true"
    :default-active="$route.path"
    :unique-opened="true"
    class="el-menu-vertical-demo"
    background-color="#304156"
    text-color="#fff"
  >
    <el-menu-item index="/admin">
      <el-icon><HomeFilled /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="/admin/article">
      <template #title>
        <el-icon><Notebook /></el-icon>
        <span>文章</span>
      </template>
      <el-menu-item index="/admin/article/list">
        <el-icon><WindPower /></el-icon>
        文章列表
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/admin/category">
      <el-icon><WindPower /></el-icon>
      分类管理
    </el-menu-item>
    <el-menu-item index="/admin/tags">
      <el-icon><WindPower /></el-icon>
      标签管理
    </el-menu-item>
    <el-menu-item index="/admin/series">
      <el-icon><WindPower /></el-icon>
      系列管理
    </el-menu-item>
    <el-menu-item index="/admin/list">
      <el-icon><Message /></el-icon>
      <span>列表管理</span>
    </el-menu-item>
    <el-menu-item index="/admin/message">
      <el-icon><Message /></el-icon>
      <span>留言</span>
    </el-menu-item>
    <el-menu-item index="/admin/link">
      <el-icon><Link /></el-icon>
      <span>友链</span>
    </el-menu-item>
    <el-sub-menu index="/admin/permission">
      <template #title>
        <el-icon><Lock /></el-icon>
        <span>权限</span>
      </template>
      <el-menu-item index="/admin/permission/role">
        <el-icon><WindPower /></el-icon>
        <span>角色</span>
      </el-menu-item>
      <el-menu-item index="/admin/permission/permission">
        <el-icon><WindPower /></el-icon>
        权限规则
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/admin/log">
      <el-icon><DataLine /></el-icon>
      <span>日志</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import {HomeFilled, Notebook, WindPower, Message, Link, Lock, User, DataLine} from '@element-plus/icons-vue'
</script>

<style scoped>
.el-menu {
  border-right: none;
}

.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu.el-menu--collapse span{
  display: none !important;
}

::-webkit-scrollbar {
  display: none;
}
</style>
