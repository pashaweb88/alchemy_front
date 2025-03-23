import { create } from 'zustand/index';
import { getElements as getElementsList } from '@shared/api/get-elements';

export type Element = {
  level: string;
  name_rus: string;
  name_eng: string;
  combination: string;
  total_combination: string;
  description: string;
  category: string;
  price: string;
  payback: string;
  income_hour: string;
  income_minute: string;
  count: number;
};

type UserElementsData = {
  [key in string]: {
    totalElements: number;
    openedElements: (Element | undefined)[];
  };
};

type Store = {
  loading: boolean;
  elements: UserElementsData;
  currentElementModal?: Element;
};

export const useElementsStore = create<Store>(() => ({
  loading: false,
  elements: {}
}));

export const setElementModal = (currentElementModal: Element | undefined = undefined) =>
  useElementsStore.setState(() => ({ currentElementModal }));

export const getElements = async () => {
  try {
    useElementsStore.setState(() => ({ loading: true }));
    const response = await getElementsList();
    const data: UserElementsData = response.result || [];
    console.log('data', data);
    useElementsStore.setState(() => ({ loading: false, elements: data }));
  } catch (e) {
    console.error('ELEMENTS REQUEST ERROR: ', e);
    useElementsStore.setState(() => ({ loading: false }));
  }
};
