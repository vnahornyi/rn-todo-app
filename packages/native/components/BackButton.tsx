import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";

import COLORS from "../constants/colors";
import { moderatePixel } from "../utils/normalize";

import CloseIcon from "../assets/images/icons/close.svg";

const BackButton: React.FC = () => {
  const navigation = useNavigation();

  if (!navigation.canGoBack()) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={navigation.goBack}
      style={styles.backButton}
      activeOpacity={0.8}
    >
      <CloseIcon color={COLORS.white} />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 4,
    width: moderatePixel(32),
    height: moderatePixel(32),
    justifyContent: "center",
    alignItems: "center",
  },
});
