import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";

import useTheme from "../hooks/useTheme";
import { ColorsType } from "../constants/colors";

const createStyles = <
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
>(
  callback: (colors: ColorsType) => T | StyleSheet.NamedStyles<T>
) => {
  return () => {
    const { colors } = useTheme();

    const styles = StyleSheet.create(callback(colors));

    return styles;
  };
};

export default createStyles;
