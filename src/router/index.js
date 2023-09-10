import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home/index.vue";

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
          component: () => import("../views/Home/Welcome.vue"),
        },
        {
          path: "/notes",
          name: "notes",
          component: () => import("../views/Notes/index.vue"),
        },
        {
          path: "/archives",
          name: "archives",
          component: () => import("../views/Archive/index.vue"),
        },
        {
          path: "/shelf",
          name: "shelf",
          component: () => import("../views/Shelf/index.vue"),
        },
        {
          path: "/link",
          name: "link",
          component: () => import("../views/Link/index.vue"),
        },
        {
          path: "/intro",
          name: "intro",
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
          component: () => import("../views/admin/Home/Welcome.vue"),
        },
        {
          path: "/admin/article/list",
          name: "admin_article_list",
          component: () => import("../views/admin/Article/List/index.vue"),
        },
        {
          path: "/admin/article/edit",
          name: "admin_article_edit",
          component: () => import("../views/admin/Article/Edit/index.vue"),
        },
        {
          path: "/admin/category",
          name: "admin_category",
          component: () => import("../views/admin/Category/index.vue"),
        },
        {
          path: "/admin/tags",
          name: "admin_tags",
          component: () => import("../views/admin/Tag/index.vue"),
        },
        {
          path: "/admin/series",
          name: "admin_series",
          component: () => import("../views/admin/Series/index.vue"),
        },
        {
          path: "/admin/list",
          name: "admin_list",
          component: () => import("../views/admin/List/index.vue"),
        },
        {
          path: "/admin/message",
          name: "admin_message",
          component: () => import("../views/admin/Message/index.vue"),
        },
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/admin/Login/index.vue"),
    },
    {
      path: "/:catchAll(.*)",
      name: "404",
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

export default router;
