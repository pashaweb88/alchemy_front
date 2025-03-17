import request from '@shared/utils/request';

type Result = {
  id: number;
  telegramUserId: string;
  data: string;
  username: string;
  energy: number;
  balance: number;
  first_name: string;
  last_name: string;
};

type Params = { id: string };

export const getUserInfo = (params: Params) =>
  request<Result>('/api/info', {
    method: 'get',
    params
  });

export default getUserInfo;
