import { RouteRecordRaw } from 'vue-router';
export const captionRouter: Array<RouteRecordRaw> = [
  {
    path: "/:locale/home/caption",
    name: "module:caption",
    component: () => import("./caption.page.vue"),
    meta: {
      layout: "home.tab",
    },
  },
];
