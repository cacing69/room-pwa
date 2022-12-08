export interface GenericResponse {
  data: any;
  meta: any;
  extra: any;
  code: string;
  message: string;
}

export interface PaginatedParams {
  page: number;
  limit: number;
}
