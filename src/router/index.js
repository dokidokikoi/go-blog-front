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
          path: "",
          name: "welcome",
          component: () => import("../views/Home/Welcome.vue"),
        },
        {
          path: "/techs",
          name: "techs",
          component: () => import("../views/404/index.vue"),
        },
        {
          path: "/notes",
          name: "notes",
          component: () => import("../views/404/index.vue"),
        },
        {
          path: "/archives",
          name: "archives",
          component: () => import("../views/404/index.vue"),
        },
        {
          path: "/shelf",
          name: "shelf",
          component: () => import("../views/404/index.vue"),
        },
        {
          path: "/link",
          name: "link",
          component: () => import("../views/404/index.vue"),
        },
        {
          path: "/intro",
          name: "intro",
          component: () => import("../views/404/index.vue"),
        },
      ]
    },
    {
      path: "/:catchAll(.*)",
      name: "404",
      component: () => import("../views/404/index.vue"),
    },
  ],
});

export default router;
