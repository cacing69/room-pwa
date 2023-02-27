import { RouteRecordRaw } from "vue-router";
export const excelEngineRouter: Array<RouteRecordRaw> = [
  {
    path: "/:locale/excel-engine",
    name: "module:excel-engine",
    component: () => import("./excel.engine.page.vue"),
    meta: {
      layout: "default",
    },
  },
];
