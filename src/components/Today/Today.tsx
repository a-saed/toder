import { useState, useEffect } from "react";
import Split from "react-split";

import { LeftPane } from "./LeftPane";
import { RightPane } from "./RightPane";
import styles from "@/styles/Today.module.css";

export const Today = () => {
  const [appWidth, setAppWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setAppWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Split
      className={styles.split}
      sizes={[45, 55]}
      minSize={[Math.round(appWidth * 0.3), Math.round(appWidth * 0.5)]}
      gutterSize={2}
    >
      <div>
        <LeftPane />
      </div>
      <div>
        <RightPane />
      </div>
    </Split>
  );
};
