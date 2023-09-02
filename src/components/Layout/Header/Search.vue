<script setup>
import {Search} from '@element-plus/icons-vue'
</script>

<template>
  <div class="search">
    <el-icon size="30">
      <Search />
    </el-icon>
    <div class="show"></div>
  </div>

</template>

<style scoped>
.search {
  width: 60px;
  height: 60px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
}
.show {
  width: 60%;
  height: 60%;
  position: absolute;
  border-radius: 50%;
  cursor: pointer;
}
</style>