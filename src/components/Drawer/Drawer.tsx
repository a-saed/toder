import { ReactNode } from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

import { SideNav } from "./SideNav";
import { useHotkeysStore } from "@/store/hotkeys.store";

const drawerWidth = 180;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#282828",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
  backgroundColor: "#282828",
});

const DrawerHeader = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export function MiniDrawer({ children }: { children: ReactNode }) {
  // const [open, setOpen] = React.useState(false);
  const { isMainDrawerOpen: open, toggleMainDrawer: setOpen } =
    useHotkeysStore();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton
            sx={{
              color: "#777",
              mt: 2,
              p: 0,
              border: "1px solid #555",
            }}
            onClick={open ? handleDrawerClose : handleDrawerOpen}
          >
            {open ? (
              <KeyboardDoubleArrowLeftIcon sx={{ fontSize: "20px" }} />
            ) : (
              <KeyboardDoubleArrowRightIcon sx={{ fontSize: "20px" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <SideNav open={open} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 1, pt: 0, width: "90%" }}>
        {children}
      </Box>
    </Box>
  );
}
