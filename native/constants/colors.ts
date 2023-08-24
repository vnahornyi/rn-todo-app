import { Theme, DarkTheme } from "@react-navigation/native";

const white = "#ffffff";
const black = "#000000";
const purple = "#8875FF";
const whiteHalf = "rgba(255, 255, 255, 0.44)";
const blackHalf = "rgba(0, 0, 0, 0.8)";
const gray = "#AFAFAF";
const blue = "#809CFF";
const red = "#FF8080";
const yellow = "#FFCC80";

const backgroundUnderModal = "rgba(0, 0, 0, 0.74)";
const background = "#FFFFFF";
const darkBackground = "#121212";
const cardBackground = "#FAFAFA";
const darkCardBackground = "#363636";
const borderColor = "#979797";
const error = "#FF4949";

const COLORS = {
  blue,
  red,
  yellow,
  white,
  black,
  background,
  error,
  borderColor,
  backgroundUnderModal,
  gray,
  cardBackground,
  shadowColor: black,
  modalBackground: black,
  primary: purple,
  secondary: blackHalf,
  text: black,
};

export const DARK_COLORS = {
  ...COLORS,
  background: darkBackground,
  cardBackground: darkCardBackground,
  secondary: whiteHalf,
  text: white,
};

export default COLORS;
