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
};

type Store = {
  loading: boolean;
  elements: { [key in string]: { open: boolean; elements: Element[] } };
  currentElementModal?: Element;
};

export const useElementsStore = create<Store>()(() => ({
  loading: false,
  elements: {}
}));

export const setElementModal = (currentElementModal: Element | undefined = undefined) =>
  useElementsStore.setState(() => ({ currentElementModal }));

export const getElements = async () => {
  try {
    useElementsStore.setState(() => ({ loading: true }));
    const list = await getElementsList();
    const items: Element[] = list.result || [];

    const grouped: { [key in string]: { open: boolean; elements: Element[] } } = {};

    for (const item of items) {
      if (grouped[item.level]) {
        grouped[item.level].elements.push(item);
      } else {
        grouped[item.level] = { open: false, elements: [item] };
      }
    }
    console.log('grouped', grouped);
    useElementsStore.setState(() => ({ loading: false, elements: grouped }));
  } catch (e) {
    console.error('ELEMENTS REQUEST ERROR: ', e);
    useElementsStore.setState(() => ({ loading: false }));
  }
};
