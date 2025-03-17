import { axios } from '../axios';
import type { AxiosRequestConfig } from 'axios';

type Response<T> = {
  error: null | string;
  errorCode: number;
  success: boolean;
  result: T;
};
export const request = async <T>(url: string, r: AxiosRequestConfig = {}) => {
  const response = await axios<Response<T>>({ url, ...r });
  return response.data;
};

export default request;
