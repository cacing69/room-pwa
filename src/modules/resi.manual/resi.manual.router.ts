import { RouteRecordRaw } from "vue-router";
export const resiManualRouter: Array<RouteRecordRaw> = [
  {
    path: "/:locale/resi-manual",
    name: "module:resi-manual",
    component: () => import("./resi.manual.page.vue"),
    meta: {
      layout: "default",
    },
  },
];
