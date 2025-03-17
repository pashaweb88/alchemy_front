import request from '@shared/utils/request';

type Result = {
  success: boolean;
};
type Data = {
  id: number;
};
export const claim = (data: Data) =>
  request<Result>('/api/claim', {
    method: 'POST',
    data
  });

export default claim;
