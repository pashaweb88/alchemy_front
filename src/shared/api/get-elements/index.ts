import request from '@shared/utils/request';

export const getElements = () =>
  request<any[]>('/api/elements', {
    method: 'get'
  });

export default getElements;
