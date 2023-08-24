import { StyleSheet, StyleProp } from "react-native";

import COLORS, { DARK_COLORS } from "../constants/colors";
import useTheme from "../hooks/useTheme";

const createStyles = (callback: (colors: typeof COLORS) => StyleProp<any>) => {
  return () => {
    const { currentTheme } = useTheme();

    const styles = StyleSheet.create(
      callback(currentTheme === "light" ? COLORS : DARK_COLORS)
    );

    return styles;
  };
};

export default createStyles;
