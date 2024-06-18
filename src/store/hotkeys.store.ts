import { create } from "zustand";

interface HotkeysStore {
  isMainDrawerOpen: boolean;
  toggleMainDrawer: (open?: boolean) => void;
}

export const useHotkeysStore = create<HotkeysStore>()((set, get) => ({
  isMainDrawerOpen: false,
  toggleMainDrawer: (open) => {
    if (typeof open === "boolean") return set({ isMainDrawerOpen: open });
    set((state) => ({ isMainDrawerOpen: !state.isMainDrawerOpen }));
  },
}));
