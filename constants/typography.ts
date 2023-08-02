import { StyleSheet } from "react-native";
import COLORS from "./colors";

const FONT_FAMILY = "Lato";

const TYPOGRAPHY = StyleSheet.create({
  largeTitle: {
    fontSize: 32,
    fontWeight: "700",
    fontFamily: FONT_FAMILY,
    color: COLORS.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: FONT_FAMILY,
    color: COLORS.white,
  },
  bigBody: {
    fontSize: 18,
    fontFamily: FONT_FAMILY,
    color: COLORS.white,
  },
  body: {
    fontSize: 16,
    fontFamily: FONT_FAMILY,
    color: COLORS.white,
  },
  smallBody: {
    fontSize: 14,
    fontFamily: FONT_FAMILY,
    color: COLORS.white,
  },
  span: {
    fontSize: 12,
    fontFamily: FONT_FAMILY,
    color: COLORS.white,
  },
});

export default TYPOGRAPHY;
