import { Box, Toolbar } from "@mui/material";

import { DropDownMenu } from "./DropDownMenu";
import styles from "@/styles/AppBar.module.css";

export const MainBar = () => {
  return (
    <Box className={styles.root}>
      <Toolbar>
        <div style={{ flexGrow: 1 }}></div>
        <DropDownMenu />
      </Toolbar>
    </Box>
  );
};
