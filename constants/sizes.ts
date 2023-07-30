import { Dimensions } from "react-native";

const SIZES = {
  screenWidth: Dimensions.get("screen").width,
  screenHeight: Dimensions.get("screen").height,
  screenScale: Dimensions.get("screen").scale,
  screenFontScale: Dimensions.get("screen").fontScale,
};

export default SIZES;
