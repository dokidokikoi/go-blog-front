import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home/index.vue";
import { ElMessage } from 'element-plus'
import { getItem } from "../utlis/localStorage";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "/",
          name: "welcome",
          meta: {
            title: "harukaze"
          },
          component: () => import("../views/Home/Welcome.vue"),
        },
        {
          path: "/notes",
          name: "notes",
          meta: {
            title: "随笔"
          },
          component: () => import("../views/Notes/index.vue"),
        },
        {
          path: "/archives",
          name: "archives",
          meta: {
            title: "归档"
          },
          component: () => import("../views/Archive/index.vue"),
        },
        {
          path: "/shelf",
          name: "shelf",
          meta: {
            title: "书架"
          },
          component: () => import("../views/Shelf/index.vue"),
        },
        {
          path: "/link",
          name: "link",
          meta: {
            title: "友链"
          },
          component: () => import("../views/Link/index.vue"),
        },
        {
          path: "/intro",
          name: "intro",
          meta: {
            title: "关于"
          },
          component: () => import("../views/Intro/index.vue"),
        },
      ]
    },
    {
      path: "/admin",
      name: "admin_home",
      component: () => import("@/views/admin/Home/index.vue"),
      children: [
        {
          path: "",
          name: "admin_welcome",
          meta: {
            title: "主页"
          },
          component: () => import("../views/admin/Home/Welcome.vue"),
        },
        {
          path: "/admin/article/list",
          name: "admin_article_list",
          meta: {
            title: "文章"
          },
          component: () => import("../views/admin/Article/List/index.vue"),
        },
        {
          path: "/admin/article/edit",
          name: "admin_article_post",
          meta: {
            title: "编写文章"
          },
          component: () => import("../views/admin/Article/Edit/index.vue"),
        },
        {
          path: "/admin/article/edit/:id",
          name: "admin_article_edit",
          meta: {
            title: "编辑文章"
          },
          component: () => import("../views/admin/Article/Edit/index.vue"),
        },
        {
          path: "/admin/category",
          name: "admin_category",
          meta: {
            title: "分类"
          },
          component: () => import("../views/admin/Category/index.vue"),
        },
        {
          path: "/admin/tags",
          name: "admin_tags",
          meta: {
            title: "标签"
          },
          component: () => import("../views/admin/Tag/index.vue"),
        },
        {
          path: "/admin/series",
          name: "admin_series",
          meta: {
            title: "系列"
          },
          component: () => import("../views/admin/Series/index.vue"),
        },
        {
          path: "/admin/list",
          name: "admin_list",
          meta: {
            title: "列表"
          },
          component: () => import("../views/admin/List/index.vue"),
        },
        {
          path: "/admin/message",
          name: "admin_message",
          meta: {
            title: "留言"
          },
          component: () => import("../views/admin/Message/index.vue"),
        },
        {
          path: "/admin/sites",
          name: "admin_sites",
          meta: {
            title: "网站"
          },
          component: () => import("../views/admin/Site/index.vue"),
        },
        {
          path: "/admin/links",
          name: "admin_links",
          meta: {
            title: "友链"
          },
          component: () => import("../views/admin/Link/index.vue"),
        },
        {
          path: "/admin/profile",
          name: "admin_profile",
          meta: {
            title: "个人信息"
          },
          component: () => import("../views/admin/Profile/index.vue"),
        },
      ]
    },
    {
      path: "/login",
      name: "login",
      meta: {
        title: "登录"
      },
      component: () => import("@/views/admin/Login/index.vue"),
    },
    {
      path: "/:catchAll(.*)",
      name: "404",
      meta: {
        title: "404"
      },
      component: () => import("../views/404/index.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 将页面滚动到顶部
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  window.pageYOffset = 0;
  next();
})

router.beforeEach((to, from, next) => {
  const patt = /\/admin\/*/
  if (to.name === 'login') {
    next()
  } else if (patt.test(to.fullPath) && !getItem("token")) {
    ElMessage.info('请登录')
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
  next()
})

router.afterEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // const body = document.querySelector('.el-main')
  // if (body) body.scrollTop = 0
  // nprogress.done()
})

export default router;
