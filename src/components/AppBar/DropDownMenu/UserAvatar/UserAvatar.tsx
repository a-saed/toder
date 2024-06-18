import { memo } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import styles from "@/styles/DropDownMenu.module.css";

export const UserAvatar = memo(() => {
  return (
    <div>
      <img
        className={styles.avatar}
        src={`https://robohash.org/${Math.floor(Math.random() * 100000)}`}
      ></img>
      <ArrowDropDownIcon sx={{ color: "#777", ml: -0.7 }} />
    </div>
  );
});
