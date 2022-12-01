export enum APP_MUTATION {
  SET_LOCALE = `SET_LOCALE`,
  PUSH_LOADED_ROUTES = `PUSH_LOADED_ROUTES`,
}

export enum APP_GETTERS {
  GET_LOCALE = `GET_LOCALE`,
  GET_LOADED_ROUTES = `GET_LOADED_ROUTES`,
}

export const APP = {
  namespace: true,
  state: () => ({
    app: {
      locale: "en",
    },
    routes: {
      loaded: ["/"],
    },
  }),
  actions: {},
  mutations: {
    [APP_MUTATION.SET_LOCALE]: (state: any, payload: any) => {
      state.app.locale = payload;
    },
    [APP_MUTATION.PUSH_LOADED_ROUTES]: (state: any, payload: any) => {
      if ((payload?.length || 0) > 0) {
        if (!Object.values(state.routes.loaded).includes(payload)) {
          state.routes.loaded.push(payload);
        }
      }
    },
  },
  getters: {
    [APP_GETTERS.GET_LOCALE]: (state: any) => state.app.locale,
    [APP_GETTERS.GET_LOADED_ROUTES]: (state: any) => {
      return Object.values(state.routes.loaded) || [];
    },
  },
};
