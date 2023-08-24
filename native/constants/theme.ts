import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";
import { COLORS, DARK_COLORS } from "./colors";

export const lightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    background: COLORS.background,
  },
};

export const darkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: DARK_COLORS.primary,
    background: DARK_COLORS.background,
  },
};
