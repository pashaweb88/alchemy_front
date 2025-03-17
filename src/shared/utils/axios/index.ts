import axiosModule from 'axios';
import { LOCAL_STORAGE_KEY_AUTH } from '@shared/constants/storage';

const SERVER_URL = import.meta.env.VITE_APP_HOST;

export const axios = axiosModule.create({
  baseURL: SERVER_URL
});

axios.interceptors.request.use(request => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY_AUTH);
  console.log('interceptors', token);

  request.headers.set('Content-Type', 'application/json');
  request.headers.set('Authorization', `Bearer ${token}`);

  return request;
});
