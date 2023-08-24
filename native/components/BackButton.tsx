import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

import { moderatePixel } from "../utils/normalize";

import CloseIcon from "../assets/images/icons/close.svg";
import createStyles from "../utils/createStyles";
import useTheme from "../hooks/useTheme";

const BackButton: React.FC = () => {
  const styles = useStyles();
  const { colors } = useTheme();
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
      <CloseIcon color={colors.text} />
    </TouchableOpacity>
  );
};

export default BackButton;

const useStyles = createStyles((colors) => ({
  backButton: {
    backgroundColor: colors.cardBackground,
    borderRadius: 4,
    width: moderatePixel(32),
    height: moderatePixel(32),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
  },
}));
