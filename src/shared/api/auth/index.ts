import { request } from '@shared/utils/request';

type Data = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export const auth = (data: Data) =>
  request<{ accessToken?: string }>('/auth/login', {
    method: 'POST',
    data
  });

export default auth;
