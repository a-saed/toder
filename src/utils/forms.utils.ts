import { KeyboardEvent } from "react";

export const handleKeyDown = (
  event: KeyboardEvent<HTMLFormElement>,
  cb: () => void
) => {
  if (event.key === "Enter") {
    event.preventDefault();
    cb();
  }
};
