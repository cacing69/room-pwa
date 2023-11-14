import { RouteRecordRaw } from "vue-router";
export const orderRouter: Array<RouteRecordRaw> = [
  {
    path: "/:locale/order",
    name: "module:order",
    component: () => import("./order.page.vue"),
    meta: {
      layout: "home.tab",
    },
  },
  {
    path: "/:locale/order/:id",
    name: "module:order_detail",
    component: () => import("./order_detail.page.vue"),
    meta: {
      layout: "default",
    },
  },
];
