import axios, { ParamsSerializerOptions } from "axios";
import qs from "qs";

let roomApiHttp = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  timeout: 20000,
  headers: {
    Accept: `application/json`,
  },
//   paramsSerializer: (params: any) => qs.stringify(params, { arrayFormat: `brackets` }),
    // `paramsSerializer` is an optional config in charge of serializing `params`
  paramsSerializer: {
    encode: (param: string): string => qs.stringify(param, { arrayFormat: `brackets` }), // custom encoder function; sends Key/Values in an iterative fashion
    indexes: true // array indexes format (null - no brackets, false (default) - empty brackets, true - brackets with indexes)
  },
});

export default roomApiHttp;
