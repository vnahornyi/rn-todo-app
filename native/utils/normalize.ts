import { PixelRatio } from "react-native";

import SIZES from "../constants/sizes";

const widthBaseScale = SIZES.screenWidth / 414;
const heightBaseScale = SIZES.screenHeight / 896;

function normalize(size: number, based = "width") {
  const newSize =
    based === "height" ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

//for width  pixel
const widthPixel = (size: number) => {
  return normalize(size, "width");
};
//for height  pixel
const heightPixel = (size: number) => {
  return normalize(size, "height");
};
//for font  pixel
const fontPixel = (size: number) => {
  return heightPixel(size);
};
//for Margin and Padding vertical pixel
const pixelSizeVertical = (size: number) => {
  return heightPixel(size);
};
//for Margin and Padding horizontal pixel
const pixelSizeHorizontal = (size: number) => {
  return widthPixel(size);
};

const moderatePixel = (size: number) => {
  return (widthPixel(size) + heightPixel(size)) / 2;
};

export {
  widthPixel,
  heightPixel,
  moderatePixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
};
