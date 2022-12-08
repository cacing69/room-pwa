import axios, { ParamsSerializerOptions } from "axios";
import qs from "qs";

let roomApiHttp = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  timeout: 20000,
  headers: {
    Accept: `application/json`,
  },
});

export default roomApiHttp;
