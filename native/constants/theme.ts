import { DarkTheme, Theme } from "@react-navigation/native";
import COLORS from "./colors";

const theme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: COLORS.primary,
    background: COLORS.background,
  },
};

export default theme;
