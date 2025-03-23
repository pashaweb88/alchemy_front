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
  // request.headers.set(
  //   'Authorization',
  //   `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGVsZWdyYW1Vc2VySWQiOiI1Mzk1NDU5MjUiLCJpYXQiOjE3NDI3MjMxMjUsImV4cCI6MTc0MjcyNjcyNX0.ZS5aNgEkHfwyMIqtmqlC7LG2nKonIVqlaG0izjvG_BI`
  // );

  return request;
});
