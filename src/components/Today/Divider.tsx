import { useState } from "react";

const Divider = ({ onResize, minLeftWidth, minRightWidth }: any) => {
  const [dragging, setDragging] = useState(false);

  const onMouseDown = () => {
    setDragging(true);
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  const onMouseMove = (event: any) => {
    if (!dragging) {
      return;
    }

    const leftWidth = event.clientX - event.target.getBoundingClientRect().left;
    const rightWidth = event.target.parentElement.offsetWidth - leftWidth;

    if (leftWidth >= minLeftWidth && rightWidth >= minRightWidth) {
      onResize(leftWidth, rightWidth);
    }
  };

  return (
    <div
      className="divider"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    />
  );
};

export default Divider;
