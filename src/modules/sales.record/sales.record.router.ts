import { RouteRecordRaw } from "vue-router";
export const salesRecordRouter: Array<RouteRecordRaw> = [
  {
    path: "/:locale/sales-record",
    name: "module:sales-record",
    component: () => import("./sales.record.page.vue"),
    meta: {
      layout: "default",
    },
  },
];
