import { api } from '@shared/utils/request';

type Result = boolean;

type Data = {
  name: string;
  count: number;
};
export const sellElementApi = (data: Data) =>
  api<Result>('/api/sell-element', {
    method: 'POST',
    data
  });

export default sellElementApi;
