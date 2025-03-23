import { create } from 'zustand';
import { Element } from '@shared/models/elements';

type State = {
  isInventoryOpen: boolean;
  newElement: Element | null;
  openInventoryHandle: () => void;
  closeInventoryHandle: () => void;
  setNewElement: (e: Element | null) => void;
  boardElements: { [key in string]: number };
  addBoardElement: (n: string) => void;
};
export const useGameStore = create<State>(set => ({
  isInventoryOpen: false,
  newElement: null,
  boardElements: {},
  setNewElement: (newElement: Element | null) => set(() => ({ newElement })),
  openInventoryHandle: () => set(() => ({ isInventoryOpen: true })),
  closeInventoryHandle: () => set(() => ({ isInventoryOpen: false })),
  addBoardElement: (name: string) =>
    set(prev => ({
      boardElements: {
        ...prev.boardElements,
        [name]: (prev.boardElements[name] ?? 0) + 1
      }
    }))
}));
