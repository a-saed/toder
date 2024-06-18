import { useEffect } from "react";

type HotkeyAction = {
  hotkey: string;
  action: () => void;
};

const useHotkeys = (hotkeyActions: HotkeyAction[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      for (const { hotkey, action } of hotkeyActions) {
        if (event.shiftKey && event.key === hotkey) {
          // trigger the corresponding action
          action();
          break; // exit the loop after the first matching hotkey
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [hotkeyActions]);
};

export default useHotkeys;
