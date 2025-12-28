import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AppStore {
  bottomDrawerOpen: boolean;
  currPomodoro: Pomodoro;
  toggleBottomDrawer: (v?: boolean) => void;
  toggleCurrPomodoro: (v?: boolean) => void;
  setCurrPomodoro: (v: Pomodoro) => void;
  unSetCurrPomodoro: () => void;
}

export const useAppStore = create<AppStore>()(
  devtools((set, get) => ({
    bottomDrawerOpen: false,
    toggleBottomDrawer(v) {
      set({ bottomDrawerOpen: v ?? !get().bottomDrawerOpen });
    },
    currPomodoro: {
      isActive: false,
      ongoingSession: false,
    },
    toggleCurrPomodoro(v) {
      set({
        currPomodoro: {
          ...get().currPomodoro,
          isActive: v ?? !get().currPomodoro.isActive,
        },
      });
    },
    setCurrPomodoro(v) {
      set({ currPomodoro: v });
    },
    unSetCurrPomodoro() {
      set({ currPomodoro: {} as Pomodoro });
    },
  }))
);
