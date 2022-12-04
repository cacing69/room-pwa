import { RouteRecordRaw } from 'vue-router';
export const instagramRouter: Array<RouteRecordRaw> = [
  {
    path: "/:locale/instagram",
    name: "module:instagram",
    component: () => import("./instagram.page.vue"),
    meta: {
      layout: "default",
    },
  },
  {
    path: "/:locale/instagram/input",
    name: "module:instagram:input",
    component: () => import("./instagram.input.page.vue"),
    meta: {
      layout: "default",
    },
  },
  {
    path: "/:locale/instagram/:id/detail",
    name: "module:instagram:detail",
    component: () => import("./instagram.detail.page.vue"),
    meta: {
      layout: "default",
    },
  },
];
