import { Platform } from "react-native";

const PLATFORM = {
  isWeb: Platform.OS === "web",
  isAndroid: Platform.OS === "android",
  isIOS: Platform.OS === "ios",
};

export default PLATFORM;
