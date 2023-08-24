import { Dimensions, PixelRatio } from "react-native";

const SIZES = {
  screenWidth: Dimensions.get("screen").width,
  screenHeight: Dimensions.get("screen").height,
  screenScale: Dimensions.get("screen").scale,
  fontScale: PixelRatio.getFontScale(),
  pixelDensity: PixelRatio.get(),
};

export default SIZES;
