<script setup>
import { ref, watch } from 'vue';
import { getTimeStamp } from "@/utlis/time"

const props = defineProps({
  list: {
    type: Array,
    default: []
  }
})

const loading = ref(false)

watch(props.list, async (newQuestion, oldQuestion) => {
  if (newQuestion == [] && oldQuestion != []) {
    loading.value = true 
  } else {
    loading.value = false 
  }
})

</script>

<template>
<div style="display: flex; align-items: center; flex-direction: column;">
  <div class="bookshelfs">
    <div class="bookshelf" v-for="items in list" >
      <div class="book-grid">
        <ul>
          <li v-for="item in items" :key="item.id"> 
            <div class="container">
              <div class="card" @click="flip">
                <div class="card-inner front">
                  <img :src="item.cover"/>
                </div>
                <div class="card-inner back">
                  <div class="header">
                    <p class="title" :title="item.item_name">{{item.item_name}}</p>
                    <p class="author">-- {{item.author}}</p>
                    <div class="rate">
                      <el-rate v-model="item.rate" size="small" disabled allow-half :texts="['oops', 'disappointed', 'normal', 'good', 'great']" />
                    </div>
                  </div>
                  <div class="footer">
                    <p class="intro" :title="item.summary">{{item.summary}}</p>
                    <div class="progress">
                      <el-progress :percentage="Math.floor(item.progress/item.total*100)" :stroke-width="5" striped color="#005CAF" striped-flow />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="shelf-shadows"></div>
      <div class="shelf"></div>
    </div>
  </div>
</div>
</template>

<style scoped>
.bookshelfs {
  max-width: 900px;
  margin-top: 40px;
}
.bookshelf {
  margin-top: 60px;
  text-align: center;
  position: relative;
  box-sizing: border-box;
}
.book-grid {
  z-index: 2;
  position: relative;
  transform: translateY(-15px);
}
.book-grid ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
@media (max-width: 800px) {
    /*0~320*/
  .book-grid ul {
    grid-template-columns: repeat(2, 1fr);
  }
}
.book-grid ul li {
  justify-self: center;
  display: flex;
  justify-content: center;
  width: 214px;
  height: 240px;
}
.container {
  position: relative;
  width: 170px;
	height: 100%;
}
.card {
	width: 100%;
	height: 100%;
	position: absolute;
	perspective: 1000px;
	transform-style: preserve-3d;
	transition: transform 300ms ease-in-out;
	will-change: transform;
	box-shadow: 0 8px 16px rgba(0,0,0,.4);
  bottom: 0;
}
.card .card-inner {
	position: absolute;
	width: 100%;
	height: 100%;
	backface-visibility: hidden;
  bottom: 0;
}
.front {
	display: flex;
	justify-content: center;
	align-items: center;
}
.back	{
	background-color:#fff;
	transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
.back .header, .footer {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.back .header {
  top: 10px;
}
.back .footer {
  bottom: 20px;
}
.back .title {
  padding: 0 10px;
  font-size: 1.1em;
  font-weight: 500;
  height: 1.5rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
}
.back .progress {
  width: 100%;
  padding: 0 16px;
}
:deep(.el-progress__text)  {
  font-size: 4px !important;
  min-width: 0 !important;
  color: #005CAF;
}
.back .rate {
  padding: 0 10px;
  position: relative;
  top: -6px;
}
.back .intro {
  height: 6.4rem;
  font-size: .875em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  width: 100%;
  padding: 0 10px;
  margin-bottom: 20px;
}
.back .author {
  font-size: .8em;
  color: rgb(88, 86, 86);
  position: relative;
  top: -4px;
}
.container:hover .card {
	transform: translateY(-20px) scale(1.2) rotatey(180deg);
}
.book-grid ul img {
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
     object-fit: cover;
}

.shelf-shadows {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  border-radius: 2px;
  z-index: 1;
  box-shadow: 0px -5px 3px 0px rgba(170, 170, 170, 0.2), 0px 15px 20px 0px rgba(170, 170, 170, 0.7), 0px 5px 5px 0px rgba(119, 119, 119, 0.3);
}
.shelf {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  background-color: #f9f9f9;
  border-radius: 2px;
  z-index: 3;
}
</style>