import { RouteRecordRaw } from "vue-router";
export const resiBatchRouter: Array<RouteRecordRaw> = [
  {
    path: "/:locale/resi-batch",
    name: "module:resi-batch",
    component: () => import("./resi.batch.page.vue"),
    meta: {
      layout: "default",
    },
  },
];
