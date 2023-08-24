import { StyleSheet } from "react-native";

import { fontPixel } from "../utils/normalize";

const FONT_FAMILY = "Lato";

const TYPOGRAPHY = StyleSheet.create({
  largeTitle: {
    fontSize: fontPixel(32),
    fontWeight: "700",
    fontFamily: FONT_FAMILY,
  },
  title: {
    fontSize: fontPixel(20),
    fontWeight: "700",
    fontFamily: FONT_FAMILY,
  },
  bigBody: {
    fontSize: fontPixel(18),
    fontFamily: FONT_FAMILY,
  },
  body: {
    fontSize: fontPixel(16),
    fontFamily: FONT_FAMILY,
  },
  smallBody: {
    fontSize: fontPixel(14),
    fontFamily: FONT_FAMILY,
  },
  span: {
    fontSize: fontPixel(12),
    fontFamily: FONT_FAMILY,
  },
});

export default TYPOGRAPHY;
