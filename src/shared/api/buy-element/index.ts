import request from '@shared/utils/request';

type Data = {
  name: string;
  count: number;
  name_rus: string;
};
export const buyElement = (data: Data) =>
  request<any>('/api/buy-element', {
    method: 'POST',
    data
  });

export default buyElement;
