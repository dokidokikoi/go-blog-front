<script setup>
import GithubIcon from '../icons/GithubIcon.vue';
import QQIcon from '../icons/QQIcon.vue';
import EmailIcon from '../icons/EmailIcon.vue';
</script>

<template>
<div class="panel">
  <div class="intro">
    <div class="avatar">
      <img src="https://shoka.lostyu.me/images/avatar.jpg" alt="">
    </div>
    <div class="site">Harukaze</div>
    <div class="summary">时间流转，生命脉动</div>
    <div class="state">
      <div class="artcle" style="border-right-width: 1px;border-right-color: black;border-right-style: solid;">
        <span>23</span>
        <span>文章</span>
      </div>
      <div class="series" style="border-right-width: 1px;border-right-color: black;border-right-style: solid;">
        <span>2</span>
        <span>系列</span>
      </div>
      <div class="tags">
        <span>10</span>
        <span>标签</span>
      </div>
    </div>
    <div class="social">
      <GithubIcon />
      <QQIcon />
      <EmailIcon />
    </div>
  </div>
  <div class="all-tags">
    <div class="label">标签</div>
    <div class="content">
      <a class="tag">#golang</a>
      <a class="tag">#linux</a>
      <a class="tag">#c</a>
      <a class="tag">#os</a>
    </div>
  </div>
</div>
</template>

<style scoped>
.panel {
  width: 17rem;
  overflow: hidden;
  padding: 20px;
}
.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.intro .site {
  margin-top: 8px;
}
.intro .summary {
  margin-top: 10px;
  font-size: 1.2em;
  font-weight: 500;
  color: grey;
}
.avatar {
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 50%;
  margin: auto;
}
.avatar img {
  width: 100%;
  object-fit: cover;
}
.intro .state {
  width: 180px;
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
}
.intro .state div {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  line-height: 1.2;
}
.intro .state div span:nth-child(1) {
  font-size: 1.25em;
  font-weight: 600;
}
.intro .state div span:nth-child(2) {
  font-size: .7em;
}
.intro .social {
  display: flex;
  justify-content: space-between;
  width: 100px;
  margin-top: 16px;
}

.all-tags {
  width: 100%;
  margin-top: 50px;
} 
.all-tags .label {
  background: #000;
  color: white;
  clip-path: polygon(0 0,72% 0,100% 100%,0 100%);
  -webkit-clip-path: polygon(0 0,72% 0,100% 100%,0 100%);
  width: 90px;
  height: 30px;
  font-size: 1.2em;
  font-weight: 500;
  padding-left: 16px;
}
.all-tags .content {
  margin-top: 10px;
}
.all-tags .content .tag {
  margin: 0 6px;
  color: rgb(74, 74, 238);
  font-size: 1.1em;
  transition: all .2s ease-in-out 0s;
}
.all-tags .content .tag:hover {
  cursor: pointer;
  color: coral;
}
</style>