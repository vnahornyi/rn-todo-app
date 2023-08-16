import SIZES from "../constants/sizes";

const calculateCatCardHeight = (columns: number) => {
  const height = ((SIZES.screenWidth / columns) * 3) / 4 + 45;

  return height;
};

export default calculateCatCardHeight;
