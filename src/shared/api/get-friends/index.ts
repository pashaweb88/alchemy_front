import { request } from '@shared/utils/request';

export type Friend = {
  avatarUrl: string;
  balance: string;
  id: number;
  telegramUserId: string;
  username: string;
};

export const getFriends = () =>
  request<{ friends: Friend[] }>('/api/friends', {
    method: 'get'
  });

export default getFriends;
