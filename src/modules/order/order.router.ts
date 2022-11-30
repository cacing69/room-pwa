import { RouteRecordRaw } from 'vue-router';
export const orderRouter: Array<RouteRecordRaw> = [
  {
    path: "/:locale/home/order",
    name: "module:order",
    component: () => import("./order.page.vue"),
    meta: {
      layout: "home.tab",
    },
  },
];
