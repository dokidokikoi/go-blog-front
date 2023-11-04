<template>
	<div class="viewer" ref="viewerRef">

		<v-md-preview class="content" :include-level="[3, 4]" :text="text" ref="preview" @image-click="imageFocus"></v-md-preview>
		<div class="dummy">

		</div>
		<div class="index" :style="`height:${pageHeight}px`">
			<div class="toc">
				<div
					v-for="anchor in titles"
					:style="{ padding: `5px 0 5px ${anchor.indent * 20}px` }"
					@click="handleAnchorClick(anchor)"
				>
					<a style="cursor: pointer">{{ anchor.title }}</a>
				</div>
			</div>
		</div>
	</div>

	<div class="dialog" @dblclick="close()">
		<el-dialog v-model="dialogImageVisible" center fullscreen  @close="close">
    <el-carousel :initial-index="dialogImageIndex" :autoplay="false" height="85vh" title="双击关闭">
      <el-carousel-item v-for="item in dialogImages" :key="item">
        <img :src="item" style="fit:cover; width: 100%;"/>
      </el-carousel-item>
    </el-carousel>
  </el-dialog>
	</div>
</template>

<script setup>
import { onMounted, nextTick, ref, watch, getCurrentInstance, onUpdated } from "vue"

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  storeKey: {
    type: String,
    default: 'edit'
  }
})

const viewerRef = ref(null)
const pageHeight = ref(0)

onMounted(() => {
	let imgs = document.querySelectorAll('.content img')
	imgs.forEach(e => {
		e.addEventListener('load', function () {
			pageHeight.value = viewerRef.value.clientHeight-20;
		})
	})
})
// let text = ref(`
// # heading 1
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent

// ## heading 2
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
// ![golang](https://www.freecodecamp.org/news/content/images/2021/10/golang.png){{{width="100" height="auto"}}}

// ### heading 3
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent

// ## heading 2
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent

// ### heading 3
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
// `)

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
	document.body.style.overflow = 'hidden'
}
function close() {
	dialogImageVisible.value = false
	document.body.style.overflow = 'auto'
}
</script>

<style scoped>
.viewer {
	display: flex;
}
.content {
	width: calc(100% - 17em);
	max-width: 845px;
	margin: auto;
	margin-top: 10px;
}
.dummy {
	width: 17em;
	height: 100%;
}
.index {
	top: 0;
	right: calc((100% - 950px - 250px)/2);
	position: absolute;
	width: 17em;
	padding-left: 20px;
	margin-top: 490px;
}
.toc {
	position: -webkit-sticky;
	position: sticky;
	top: 80px;
	overflow-y: auto;
	max-height: 500px;
}
@media (max-width: 1100px) {
  .dummy {
		display: none;
	}
	.index {
		display: none;
	}
	.content {
		width: 90%;
	}
}
.dialog :deep(.el-dialog) {
	background-color: transparent;
}
</style>