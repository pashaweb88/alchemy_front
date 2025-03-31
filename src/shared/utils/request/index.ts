import { axios } from '../axios';
import type { AxiosRequestConfig } from 'axios';

export type Response<T> = {
  error: null | string;
  errorCode: number;
  success: boolean;
  result: null | T;
};
export const request = async <T>(url: string, r: AxiosRequestConfig = {}): Promise<Response<T>> => {
  console.log('ddd');
  const response = await axios<Response<T>>({ url, ...r });

  return response.data;
};

export const api = async <T>(url: string, r: AxiosRequestConfig = {}): Promise<Response<T>> => {
  console.log('ddd');
  try {
    const response = await axios<Response<T>>({ url, ...r });

    return response.data;
  } catch (e) {
    console.log(e);
    return { error: 'error', errorCode: 0, result: null, success: false };
  }
};

export default request;
