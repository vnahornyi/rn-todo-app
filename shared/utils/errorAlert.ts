import PLATFORM from "../constants/platform";

const errorAlert = (message: string) => {
  if (PLATFORM.isWeb) {
    console.error(message);
  } else {
    import("react-native").then((m) => {
      m.Alert.alert(message);
    });
  }
};

export default errorAlert;
