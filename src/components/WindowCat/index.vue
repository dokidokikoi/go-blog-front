<script setup>

</script>

<template>
<div class="body">
  <div class="container">
  <h1>Window Cat</h1>

  <div class="window">
    <div class="window-details"></div>
    <div class="mountains-left"></div>
    <div class="mountains-right"></div>
    <div class="moon"></div>
    <div class="star star-glow star-1"></div>
    <div class="star star-glow star-2"></div>
    <div class="star star-3"></div>
    <div class="star star-4"></div>
    <div class="star star-5"></div>
    <div class="clouds">
      <span></span>
      <span></span>
    </div>

    <div class="cat">
      <div class="cat-body">
        <div class="cat-ears"></div>
      </div>
      <div class="cat-belly"></div>
    </div>

  </div>

  <p>Designed by <a href="https://dribbble.com/motionauthors">Motion Authors</a><br><br>Animated by <a href="http://jackiezen.com/">Jackie Zen</a></p>

</div>
</div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

*:before,
*:after {
  content: "";
  position: absolute;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

h1,
p {
  font-family: "Sanchez", serif;
  color: white;
  text-align: center;
  font-weight: 400;
  opacity: 0.7;
}

h1 {
  font-size: 30px;
  margin-bottom: 30px;
}

p {
  font-size: 16px;
  line-height: 16px;
  margin-top: 100px;
}

p a:link,
p a:active,
p a:visited {
  color: inherit;
  text-decoration: none;
  border-bottom: 1px dotted;
  border-bottom-color: inherit;
  opacity: 0.6;
  transition: all 0.1s linear;
}

p a:link:hover {
  opacity: 1;
}

.body {
  /* background-color: #c9533d; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.window {
  width: 275px;
  height: 440px;
  background-color: #294679;
  border: 18px solid #2d2623;
  position: relative;
  border-bottom: none;
}

.window:before {
  background-color: #2d2623;
  width: calc(100% + 68px);
  height: 18px;
  left: -34px;
  bottom: 0;
  border-top: 6px solid #22366c;
}

.window:after {
  width: calc(100% + 18px);
  height: 6px;
  background-color: #439abf;
  bottom: 12px;
  left: -9px;
}

.window-details {
  position: relative;
  height: 12px;
  width: 100%;
  top: 190px;
  background-color: #2d2623;
}

.window-details:before,
.window-details:after {
  border: 6px solid #439abf;
  width: 100%;
  border-top: none;
}

.window-details:before {
  height: 190px;
  top: -190px;
}

.window-details:after {
  height: 208px;
  bottom: -208px;
  border-bottom: none;
}

.mountains-left,
.mountains-right {
  position: absolute;
  bottom: 18px;
  width: 0;
  height: 0;
  border-bottom: 60px solid #22366c;
}

.mountains-left {
  left: 6px;
  border-right: 22px solid transparent;
}

.mountains-right {
  right: 6px;
  border-left: 22px solid transparent;
}

.mountains-left:before,
.mountains-left:after,
.mountains-right:before {
  width: 0;
  height: 0;
  border-left: 22px solid transparent;
  border-right: 22px solid transparent;
  border-bottom: 60px solid #22366c;
}

.mountains-left:before {
  left: 22px;
}

.mountains-right:before {
  right: 0px;
}

.moon {
  background-color: #e9ae4b;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  left: 35px;
  top: 35px;
}

.moon:before {
  background-color: #294679;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  position: absolute;
  left: 12px;
  top: 4px;
}

.star,
.star:before,
.star:after {
  background-color: #e9ae4b;
  position: absolute;
  border-radius: 50%;
}

.star-glow {
  animation: glow ease-in-out infinite alternate;
}

.star-1 {
  width: 8px;
  height: 8px;
  top: 230px;
  left: 50%;
  animation-duration: 5s;
}

.star-1:before {
  width: 4px;
  height: 4px;
  left: -90px;
  top: 60px;
  animation: glow ease-in-out infinite alternate;
  animation-duration: 6s;
}

.star-1:after {
  width: 3px;
  height: 3px;
  left: 80px;
  top: 10px;
  animation: glow ease-in-out infinite alternate;
  animation-duration: 2s;
}

.star-2 {
  width: 4px;
  height: 4px;
  top: 30px;
  left: 50%;
  animation-duration: 8s;
}

.star-2:before {
  width: 4px;
  height: 4px;
  left: 70px;
  top: 80px;
  animation: glow ease-in-out infinite alternate;
  animation-duration: 4s;
}

.star-2:after {
  width: 4px;
  height: 4px;
  left: -80px;
  top: 100px;
  animation: glow ease-in-out infinite alternate;
  animation-duration: 3s;
}

.star-3 {
  width: 6px;
  height: 6px;
  top: 215px;
  left: 45px;
}

.star-3:before {
  width: 3px;
  height: 3px;
  top: 54px;
  left: 75px;
}

.star-3:after {
  width: 3px;
  height: 3px;
  top: 10px;
  left: 140px;
}

.star-4 {
  width: 3px;
  height: 3px;
  top: 20px;
  left: 100px;
}

.star-4:before {
  width: 6px;
  height: 6px;
  top: 32px;
  left: -18px;
}

.star-4:after {
  width: 3px;
  height: 3px;
  top: 135px;
  left: -35px;
}

.star-5 {
  width: 3px;
  height: 3px;
  top: 40px;
  left: 210px;
}

.star-5:before {
  width: 3px;
  height: 3px;
  top: 110px;
  left: 10px;
}

@keyframes glow {
  0%,
  50% {
    box-shadow: 0px 0px 0px 0px #e9ae4b;
  }
  80%,
  100% {
    box-shadow: 0px 0px 8px 2px #e9ae4b;
  }
}

.clouds {
  background-color: #22366c;
  width: 180px;
  height: 12px;
  position: absolute;
  left: 25px;
  top: 74px;
  border-radius: 14px;
}

.clouds:before,
.clouds:after,
.clouds span {
  height: inherit;
  border-radius: inherit;
  background-color: inherit;
  position: absolute;
}

.clouds:before {
  width: 95px;
  top: 24px;
  left: 35px;
}

.clouds:after {
  width: 55px;
  top: -24px;
  left: 100px;
}

.clouds span:first-child {
  width: 55px;
  top: -12px;
  left: 100px;
}

.clouds span:nth-child(2) {
  width: 70px;
  top: 12px;
  left: 35px;
}

.clouds span:before,
.clouds span:after {
  height: inherit;
  border-radius: 14px;
  background-color: #294679;
  width: 40px;
}

.clouds span:before {
  left: -20px;
}

.clouds span:after {
  right: -25px;
}

.cat {
  background-color: #2d2623;
  z-index: 100;
  position: absolute;
  bottom: 0;
  left: 90px;
  animation: breathe-belly 8s ease infinite;
}

.cat-body {
  position: absolute;
  width: 45px;
  height: 125px;
  border-top-left-radius: 45px;
  border-top-right-radius: 45px;
  background-color: inherit;
  bottom: 0;
  transform-origin: left bottom;
  animation: breathe-body 8s ease infinite;
}

@keyframes breathe-body {
  0%,
  5%,
  100% {
    height: 125px;
  }
  20%,
  55% {
    height: 125px;
  }

  60%,
  90% {
    height: 88px;
  }
}

.cat-belly {
  background-color: inherit;
  position: absolute;
  width: 85px;
  height: 85px;
  bottom: 0;
  border-radius: 50%;
  transform-origin: left bottom;
}

.cat-belly:before {
  background-color: inherit;
  width: 12px;
  height: 100px;
  top: 73px;
  right: 14px;
  border-radius: 12px;
}

@keyframes breathe-belly {
  0%,
  20%,
  50%,
  100% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.02);
  }
}

.cat-ears:before {
  width: 0;
  height: 0;
  border-bottom: 30px solid #2d2623;
  border-right: 35px solid transparent;
  top: -10px;
}

.cat-ears:after {
  width: 0;
  height: 0;
  border-bottom: 30px solid #2d2623;
  border-left: 35px solid transparent;
  top: -10px;
  right: 0;
}

</style>