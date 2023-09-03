<script setup>
import { RouterLink } from 'vue-router';
let artciles = {
  "2023": {"8": ["golang高级技巧", "golang常用工具"], "9": ["nas搭建"]},
  "2022": {"6": ["linux常用命令"]},
}
</script>

<template>
<div>
  <template v-for="mths, years in artciles">
    <h3 class="year">{{ years }}</h3>
    <ul class="mth-list">
      <li class="mth-li" v-for="posts, mth in mths">
        <span class="mth-span">
          <span style="color: #6ecaf5;font-weight: 600;">{{ mth }}月</span>
          <span style="font-weight: 500;">    ({{ posts.length }} 篇文章)</span>
        </span>
        <ul class="post-list">
          <li class="post-li" v-for="post in posts">
            <RouterLink :to="`/`">{{ post }}</RouterLink>
          </li>
        </ul>
      </li>
    </ul>
  </template>
</div>
</template>

<style scoped>
.year {
  padding-left: 100px;
  margin: 0;
  font-weight: 600;
}
ul {
  list-style: none;
  margin: 0;
  left: -45px;
}
.post-li a {
  color: black;
  text-decoration: none;
  font-size: 1.1em;
  font-weight: 500;
}
.post-li a:hover {
  color: coral;
  cursor: pointer;
}
.mth-list {
  width: 100%;
  position: relative;
  display: inline-block;
}
.mth-list::before {
  height: 100%;
  width: 4px;
  background: #6ecaf5;
  position: absolute;
  left: 160px;
  content: "";
  top: 0;
}
.mth-span {
  position: relative;
}
.mth-span::before {
  position: absolute;
  left: 113px;
  background-color: white;
  height: 18px;
  width: 18px;
  border-radius: 9px;
  top: 3px;
  content: "";
  box-shadow: 1px 1px 1px #bbb;
  -webkit-box-shadow: 1px 1px 1px #bbb;
}
.mth-span::after {
  position: absolute;
  left: 116px;
  background: #6ecaf5;
  height: 12px;
  width: 12px;
  border-radius: 6px;
  top: 6px;
  content: "";
}
.post-list {
  margin-left: -2.7em;
}
.post-li {
  padding-left: 140px;
  position: relative;
}
.post-li::before {
  position: absolute;
  left: 116px;
  background-color: white;
  height: 12px;
  width: 12px;
  border-radius: 6px;
  top: 6px;
  content: "";
  box-shadow: 1px 1px 1px #bbb;
  box-shadow: 1px 1px 1px #bbb;
  -webkit-box-shadow: 1px 1px 1px #bbb;
}
.post-li::after {
  position: absolute;
  left: 118px;
  background: #6ecaf5;
  height: 8px;
  width: 8px;
  border-radius: 4px;
  top: 8px;
  content: "";
}
</style>