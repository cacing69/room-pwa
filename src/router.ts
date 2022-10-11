import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// const routes: Array<RouteRecordRaw> =
const routes: Array<RouteRecordRaw> = [
  // { path: "/", component: () => import("./modules/home/Home.vue") },
  {
    path: "/",
    name: "index",
    redirect: {
      name: "home",
      params: {
        locale : 'en',
      },
    },
  },
  {
    path: "/:locale",
    name: "default",
    redirect: {
      name: "home",
      params: {
        locale : 'en',
      },
    },
  },
  {
    path: "/:locale/",
    name: "home",
    component: () => import("./modules/home/Home.vue"),
    meta: {
      layout: "menu-tab-default",
    },
  },
];

export const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});
