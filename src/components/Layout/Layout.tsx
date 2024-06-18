import { ReactNode } from "react";
import {
  PaletteColorOptions,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { Outlet } from "react-router-dom";
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } });

import { MiniDrawer } from "@/components/Drawer";
import { MainBar } from "@/components/AppBar";
import { FabBtn } from "@/components/FabBtn";
import { useHotkeysStore } from "@/store/hotkeys.store";
import useHotkeys from "@/hooks/useHotkeys";

declare module "@mui/material/styles" {
  interface CustomPalette {
    reddy?: PaletteColorOptions;
    greeyBtn?: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    reddy: true;
    greeyBtn: true;
  }
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1F1F1F",
      paper: "#1F1F1F",
    },
    reddy: createColor("#de4c4a"),
    greeyBtn: createColor("#888"),
  },
  components: {
    MuiSpeedDial: {
      styleOverrides: {
        fab: {
          backgroundColor: "#2979ff",
        },
      },
    },
  },
});

type LayoutProps = {
  children: ReactNode;
};

export const Layout = () => {
  /**
   * register hotkeys below
   * current supported hotkeys
   * - shift+E => toggle the main side drawer
   * -
   */
  const { toggleMainDrawer } = useHotkeysStore();
  const hotkeyActions = [{ hotkey: "E", action: toggleMainDrawer }];
  useHotkeys(hotkeyActions);

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <MiniDrawer>
            <MainBar />
            <Outlet />
            <FabBtn />
          </MiniDrawer>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
};
