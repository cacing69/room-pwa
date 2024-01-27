import { RouteRecordRaw } from "vue-router";
export const priceTagRouter: Array<RouteRecordRaw> = [
  {
    path: "/:locale/price-tag",
    name: "module:price-tag",
    component: () => import("./price.tag.page.vue"),
    meta: {
      layout: "default",
    },
  },
];
