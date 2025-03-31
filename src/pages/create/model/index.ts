import { create } from 'zustand';
import { Element } from '@shared/models/elements';

type State = {
  isInventoryOpen: boolean;
  isTutorOpen: boolean;
  newElement: Element | null;
  openInventoryHandle: () => void;
  closeInventoryHandle: () => void;
  openTutorHandle: () => void;
  closeTutorHandle: () => void;
  setNewElement: (e: Element | null) => void;
};

export const useGameStore = create<State>(set => ({
  isInventoryOpen: false,
  newElement: null,
  isTutorOpen: false,

  setNewElement: (newElement: Element | null) => set(() => ({ newElement })),
  openInventoryHandle: () => set(() => ({ isInventoryOpen: true })),
  closeInventoryHandle: () => set(() => ({ isInventoryOpen: false })),
  openTutorHandle: () => set(() => ({ isTutorOpen: true })),
  closeTutorHandle: () => set(() => ({ isTutorOpen: false }))
}));
