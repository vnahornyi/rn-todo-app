import { StyleSheet } from "react-native";

import COLORS from "./colors";
import { fontPixel } from "../utils/normalize";

const FONT_FAMILY = "Lato";

const TYPOGRAPHY = StyleSheet.create({
  largeTitle: {
    fontSize: fontPixel(32),
    fontWeight: "700",
    fontFamily: FONT_FAMILY,
    color: COLORS.white,
  },
  title: {
    fontSize: fontPixel(20),
    fontWeight: "700",
    fontFamily: FONT_FAMILY,
    color: COLORS.white,
  },
  bigBody: {
    fontSize: fontPixel(18),
    fontFamily: FONT_FAMILY,
    color: COLORS.white,
  },
  body: {
    fontSize: fontPixel(16),
    fontFamily: FONT_FAMILY,
    color: COLORS.white,
  },
  smallBody: {
    fontSize: fontPixel(14),
    fontFamily: FONT_FAMILY,
    color: COLORS.white,
  },
  span: {
    fontSize: fontPixel(12),
    fontFamily: FONT_FAMILY,
    color: COLORS.white,
  },
});

export default TYPOGRAPHY;
