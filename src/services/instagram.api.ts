import axios from 'axios';
import roomApiHttp from "./api/room.api.http";
import { GenericResponse } from "./api/types";

export const getInstagram = async ({ pageParam = 1 }, extra?: any) => {
  const { data } = await roomApiHttp.get<GenericResponse>("instagram", {
    params: {
      page: pageParam,
      ...extra,
    },
  });

  return data;
};

export const getInstagramDetail = async (id: string) => {
  const { data } = await roomApiHttp.get<GenericResponse>(`instagram/${id}`);
  return data;
};

export const postInstagramUrls = async (payload: any) => {
  return await axios.post(`${payload.forwarder}instagram`, { urls: payload.urls });
};
