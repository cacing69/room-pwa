import { RouteRecordRaw } from "vue-router";
export const checkPercentagesRouter: Array<RouteRecordRaw> = [
  {
    path: "/:locale/check-percentages",
    name: "module:check-percentages",
    component: () => import("./check.percentages.page.vue"),
    meta: {
      layout: "default",
    },
  },
];
