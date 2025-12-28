import { useEffect } from "react";

// Custom hook that handles closing logic when the Escape key is pressed
function useCloseOnEscape(isActive: boolean, onClose: () => void) {
  useEffect(() => {
    // Function to handle key press events
    const handleEscapeKeyClosing = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Attach the event listener if the condition is active
    if (isActive) {
      document.addEventListener("keydown", handleEscapeKeyClosing);
    }

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("keydown", handleEscapeKeyClosing);
    };
  }, [isActive, onClose]); // Dependencies include both the state and the close function
}

export default useCloseOnEscape;
