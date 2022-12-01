import { RouteRecordRaw } from 'vue-router';
export const settingRouter: Array<RouteRecordRaw> = [
  {
    path: "/:locale/setting",
    name: "module:setting",
    component: () => import("./setting.page.vue"),
    meta: {
      layout: "home.tab",
    },
  },
];
