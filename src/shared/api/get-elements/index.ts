import request from '@shared/utils/request';
import { Element } from '@shared/models/elements';

type UserElementsData = {
  [key in string]: {
    totalElements: number;
    openedElements: Element[];
  };
};
export const getElements = () =>
  request<UserElementsData>('/api/elements', {
    method: 'get'
  });

export default getElements;
