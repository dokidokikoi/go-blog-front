import "./assets/base.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// highlight
import Prism from 'prismjs';

// codemirror 编辑器的相关资源
import Codemirror from 'codemirror';
// mode
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/vue/vue';
// edit
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
// placeholder
import 'codemirror/addon/display/placeholder';
// active-line
import 'codemirror/addon/selection/active-line';
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
// style
import 'codemirror/lib/codemirror.css';

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// 快速复制代码
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
// markdown支持显示代码行数
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
// markdown支持emoji
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';
import 'prismjs/components/prism-json';
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';
// align 插件
import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align';
// 高亮代码行
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index';
import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css';
// 提示插件 --vuepress 主题已内置此插件
// import createTipPlugin from '@kangc/v-md-editor/lib/plugins/tip/index';
// import '@kangc/v-md-editor/lib/plugins/tip/tip.css';
VMdEditor.Codemirror = Codemirror;
VMdEditor.use(vuepressTheme, {
  Prism,
	codeHighlightExtensionMap: {
    vue: 'html',
  },
})
.use(createLineNumbertPlugin())
.use(createEmojiPlugin())
.use(createTodoListPlugin())
.use(createAlignPlugin())
.use(createHighlightLinesPlugin())
// .use(createTipPlugin())

VMdPreview.use(vuepressTheme, {
  Prism,
	codeHighlightExtensionMap: {
    vue: 'html',
  },
})
.use(createCopyCodePlugin())
.use(createLineNumbertPlugin())
.use(createEmojiPlugin())
.use(createTodoListPlugin())
.use(createHighlightLinesPlugin())
.use(createAlignPlugin())
// .use(createTipPlugin())

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus)
app.use(VMdEditor)
app.use(VMdPreview)
app.mount("#app");
