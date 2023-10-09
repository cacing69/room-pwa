import { RouteRecordRaw } from "vue-router";
export const checkPriceRouter: Array<RouteRecordRaw> = [
  {
    path: "/:locale/check-price",
    name: "module:check-price",
    component: () => import("./check.price.page.vue"),
    meta: {
      layout: "default",
    },
  },
];
