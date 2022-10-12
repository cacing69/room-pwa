import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { modulesRouter } from "./modules/modules.router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    redirect: {
      name: "module:home",
      params: {
        locale: "en",
      },
    },
  },
  {
    path: "/:locale",
    name: "default",
    redirect: {
      name: "home",
      params: {
        locale: "en",
      },
    },
  },
  {
    path: "/:locale/home",
    name: "module:home",
    component: () => import("./modules/home/home.page.vue"),
    meta: {
      layout: "home.tab",
    },
  },
];

export const mergeRouter = [...routes, ...modulesRouter];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: mergeRouter,
});
