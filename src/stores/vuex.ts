import { createStore } from "vuex";
// import { modulesVuex } from "@/modules/module";

// const debug = true; // false on production
import { APP } from "./app.vuex";

export const modulesVuex = {
  APP,
};

const vuex = createStore({
  strict: true,
  plugins: [],
  modules: {
    APP
  },
});

export default vuex;
