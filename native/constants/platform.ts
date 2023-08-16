import { Platform } from "react-native";

const PLATFORM = {
  isIOS: Platform.OS === "ios",
  isAndroid: Platform.OS === "android",
};

export default PLATFORM;
