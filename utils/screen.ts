import SIZES from "../constants/sizes";

export const sp = (px: number) => {
  return px / (SIZES.fontScale * SIZES.pixelDensity);
};

export const dp = (px: number) => {
  return px / SIZES.pixelDensity;
};
