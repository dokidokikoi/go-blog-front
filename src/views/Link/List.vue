<script setup>

</script>

<template>
<ul class="links">
  <li class="link" v-for="i in 5" :key="i">
    <div class="info">
      <div class="title">Harukaze</div>
      <div class="desc">时间流转，生命脉动</div>
    </div>
    <div class="avatar">
      <img src="https://shoka.lostyu.me/images/avatar.jpg" alt="">
    </div>
  </li>
</ul>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  left: -45px;
}
ul::after {
    content: "";
    display: table;
    clear: both;
}
.links {
  position: relative;
}
.link {
  width: 30.8%;
  height: 90px;
  background-color:antiquewhite;
  border-radius: 8px;
  flex-wrap: wrap;
  margin: 10px;
  display: flex;
  padding: 10px;
  float: left;
}
.link:hover {
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.link .info {
  height: 100%;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.info .title{
  height: 50%;
  padding: 6px 0 0 10px;
  border-bottom: 1px dashed #ccc;
} 
.info .desc {
  height: 50%;
  padding: 8px 0 8px 10px;
  font-size: .875em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  color: grey;
}
.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 16px;
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>