<template>
	<div
		v-for="anchor in titles"
		:style="{ padding: `5px 0 5px ${anchor.indent * 20}px` }"
		@click="handleAnchorClick(anchor)"
	>
		<a style="cursor: pointer">{{ anchor.title }}</a>
	</div>
	<v-md-preview :text="text" ref="preview" @image-click="imageFocus"></v-md-preview>
	<el-dialog v-model="dialogImageVisible" center>
    <el-carousel :initial-index="dialogImageIndex" :autoplay="false" height="400px">
      <el-carousel-item v-for="item in dialogImages" :key="item">
        <el-image :src="item" fit="cover"/>
      </el-carousel-item>
    </el-carousel>
  </el-dialog>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from "vue"

let text = ref(`
# heading 1
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent

## heading 2
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent
![golang](https://www.freecodecamp.org/news/content/images/2021/10/golang.png){{{width="100" height="auto"}}}

### heading 3
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent

## heading 2
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent

### heading 3
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent
`)

let dialogImageVisible = ref(false)
let dialogImages = ref([])
let dialogImageIndex = ref(0)

let titles = ref([])
let _this = {}
onMounted(() => {
	_this = getCurrentInstance()
	const anchors = _this.refs.preview.$el.querySelectorAll('h1,h2,h3,h4,h5,h6');
	titles.value = Array.from(anchors).filter((title) => !!title.innerText.trim());

	if (!titles.value.length) {
		titles.value = [];
		return;
	}

	const hTags = Array.from(new Set(titles.value.map((title) => title.tagName))).sort();

	titles.value = titles.value.map((el) => ({
		title: el.innerText,
		lineIndex: el.getAttribute('data-v-md-line'),
		indent: hTags.indexOf(el.tagName),
	}));
})

function handleAnchorClick(anchor) {
	const { preview } = _this.refs;
	const { lineIndex } = anchor;

	const heading = preview.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);

	if (heading) {
		preview.scrollToTarget({
			target: heading,
			scrollContainer: window,
			top: 60,
		});
	}
}

function imageFocus(images, currentIndex) {
  // console.log(images, currentIndex)
  dialogImageVisible.value = true
  dialogImages.value = images
  dialogImageIndex = currentIndex
}
</script>

<style scoped>
</style>