import axios from "axios";
import qs from "qs";

let jsonPlaceholder = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com/`,
  timeout: 20000,
  headers: {
    Accept: `application/json`,
  },
  paramsSerializer: function (params: any) {
    return qs.stringify(params, { arrayFormat: `brackets` });
  },
});

jsonPlaceholder.interceptors.request.use(
  function (config: any) {
    // nProgress.start();

    // const accessToken = store2(configApp.SESSION_ACCESS_TOKEN);

    // if (accessToken != null) {
    //   config.headers.common[
    //     configApp.API_HEADER_AUTHORIZATION
    //   ] = `Bearer ${accessToken}`;
    // }

    // config.headers.common[configApp.API_HEADER_X_ALIF_CLIENT_ID] = `${
    //   import.meta.env.VITE_API_CLIENT_ID
    // }`;
    // config.headers.common[configApp.API_HEADER_X_ALIF_CLIENT_SECRET] = `${
    //   import.meta.env.VITE_API_CLIENT_SECRET
    // }`;
    // config.headers.common[configApp.API_HEADER_X_ALIF_LOCALE] = store2.get(
    //   configApp.APP_LOCALE
    // );
    // config.headers.common[configApp.API_HEADER_X_ALIF_TIMEZONE] =
    //   configApp.APP_DEFAULT_TIMEZONE;
    // config.headers.common[configApp.API_HEADER_X_ALIF_BRANCH] =
    //   configApp.APP_DEFAULT_BRANCH;

    return config;
  },
  function (error) {
    // nProgress.done();
    // errorHandler(error, { toast: false, skipChecking: true });
    return Promise.reject(error);
  }
);

jsonPlaceholder.interceptors.response.use(
  function (response) {
    // nProgress.done();
    return response;
  },
  function (error) {
    // errorProgressColor();

    // nProgress.done();
    // errorHandler(error, { toast: false, logRocket: true, skipChecking: true });
    return Promise.reject(error);
  }
);

export default jsonPlaceholder;
