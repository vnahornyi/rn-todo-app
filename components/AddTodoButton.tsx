import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import COLORS from "../constants/colors";
import { RootScreensType } from "../App";
import { moderatePixel, pixelSizeHorizontal } from "../utils/normalize";

import PlusIcon from "../assets/images/icons/plus.svg";

type TabsNavigationProp = NativeStackNavigationProp<
  RootScreensType,
  "TabsRoot"
>;

const AddTodoButton: React.FC = () => {
  const navigation = useNavigation<TabsNavigationProp>();

  const handleNavigate = () => {
    navigation.navigate("CreateEditTodo");
  };

  return (
    <TouchableOpacity
      onPress={handleNavigate}
      activeOpacity={0.8}
      style={styles.container}
    >
      <PlusIcon
        width={moderatePixel(32)}
        height={moderatePixel(32)}
        color={COLORS.white}
      />
    </TouchableOpacity>
  );
};

export default AddTodoButton;

const styles = StyleSheet.create({
  container: {
    width: moderatePixel(64),
    height: moderatePixel(64),
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
    position: "relative",
    bottom: pixelSizeHorizontal(32),
  },
});
