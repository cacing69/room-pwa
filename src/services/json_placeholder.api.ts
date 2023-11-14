import jsonPlaceholder from "../http/json_placeholder.http";
import { GenericResponse } from "./api/types";

export const getPosts = async () => {
  const { data } = await jsonPlaceholder.get<GenericResponse>("posts");

  return data;
};

export const getPost = async (id: string) => {
  const { data } = await jsonPlaceholder.get<GenericResponse>(`posts/${id}`);
  return data;
};
