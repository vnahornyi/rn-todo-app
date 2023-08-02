import { StyleSheet } from "react-native";

const FONT_FAMILY = "Lato";

const TYPOGRAPHY = StyleSheet.create({
  largeTitle: {
    fontSize: 32,
    fontWeight: "700",
    fontFamily: FONT_FAMILY,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: FONT_FAMILY,
  },
  bigBody: {
    fontSize: 18,
    fontFamily: FONT_FAMILY,
  },
  body: {
    fontSize: 16,
    fontFamily: FONT_FAMILY,
  },
  smallBody: {
    fontSize: 14,
    fontFamily: FONT_FAMILY,
  },
  span: {
    fontSize: 12,
    fontFamily: FONT_FAMILY,
  },
});

export default TYPOGRAPHY;
