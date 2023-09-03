<script setup>
import UnderLoading from '@/components/UnderLoading/index.vue';
import { ref } from 'vue';

const loading = ref(false);
function loadArticle() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
}
</script>

<template>
<div style="display: flex; align-items: center; flex-direction: column;">
  <div class="bookshelfs">
    <div class="bookshelf" v-for="i in 3" :key="i">
      <div class="book-grid">
        <ul>
          <li> <img src="https://images.penguinrandomhouse.com/cover/9781101931288"/></li>
          <li> <img src="https://i.harperapps.com/covers/9780062698162/x510.jpg"/></li>
          <li> <img src="https://i.harperapps.com/covers/9780062698162/x510.jpg"/></li>
          <li> <img src="https://www.canva.com/learn/wp-content/uploads/2015/03/draculabramstoker-tb-800x0.jpg"/></li>
        </ul>
      </div>
      <div class="shelf-shadows"></div>
      <div class="shelf"></div>
    </div>
  </div>
  <div class="previous">
    <button v-show="!loading" class="btn" @click="loadArticle()">Previous</button>
    <UnderLoading v-show="loading" class="loading" />
  </div>
</div>
</template>

<style scoped>
.bookshelfs {
  width: 900px;
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
.book-grid ul li {
  justify-self: center;
}
.book-grid ul img {
  display: block;
  box-shadow: 0px -5px 20px 2px rgba(0, 0, 0, 0.3);
  width: 170px;
  height: 240px;
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
.previous {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  position: relative;
}
.previous .btn {
  width: 90px;
  height: 50px;
  background-color: aqua;
  margin-top: 20px;
  border-radius: 50px;
  border-width: .1px;
  border-color: rgb(82, 156, 156);
}
.previous .btn:hover {
  box-shadow: 0 0 10px rgba(0,0,0,.1);
  cursor: pointer;
}
.previous .loading {
  margin: 20px 0;
}
</style>