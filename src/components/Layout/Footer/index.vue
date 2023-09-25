<script setup>
import { calcDays } from '@/utlis/time'
import { getItem } from '@/utlis/localStorage'
import { ref } from 'vue';

const host = ref({})
host.value = getItem('host')

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();

</script>

<template>
<div class="footer">
  <div class="item">©{{ year }} <span class="u26FA"></span>harukaze</div>
  <div class="item"><a href="https://beian.miit.gov.cn/">湘ICP备2021019471号</a></div>
  <br>
  <p class="item">本站于 {{year}}-{{month}}-{{day}} 日确认存活，已运行 {{calcDays(host.created_at)}}</p>
</div>
</template>

<style scoped>
.footer {
  margin: 50px 0;
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
}
.item {
  text-align: center;
}
.u26FA:before {
    content: '\26FA';
}
</style>