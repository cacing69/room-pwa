// import { useRouterStore } from './stores/vuex';
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { modulesRouter } from "./modules/modules.router";
import { showLoadingToast, closeToast } from "vant";
import vuex from "./stores/vuex";


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

const routeGuard = async (to: any, from: any, next: any) => {
 const loadedRoutes = vuex.getters["GET_LOADED_ROUTES"];

 if (!loadedRoutes.includes(to.fullPath)) {
   const toast = showLoadingToast({
     duration: 0,
     forbidClick: true,
     loadingType: "spinner",
     message: "Loading...",
   });
 }

  next();
}

router.beforeEach(routeGuard);

router.afterEach((to) => {
  const loadedRoutes = vuex.getters["GET_LOADED_ROUTES"];

  if (!loadedRoutes.includes(to.fullPath)) {
    vuex.commit("PUSH_LOADED_ROUTES", to.fullPath);
  }
  closeToast();
  // ();
});
