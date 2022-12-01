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
];
