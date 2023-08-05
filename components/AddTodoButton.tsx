import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, TouchableOpacity } from "react-native";

import COLORS from "../constants/colors";
import { moderatePixel, pixelSizeHorizontal } from "../utils/normalize";

import PlusIcon from "../assets/images/icons/plus.svg";
import { RootScreensType } from "../App";

type NavigationType = NativeStackNavigationProp<RootScreensType, "TabsRoot">;

const AddTodoButton: React.FC = () => {
  const navigation = useNavigation<NavigationType>();

  const handleCreateTodo = () => {
    navigation.navigate("CreateEditTodo");
  };

  return (
    <TouchableOpacity
      onPress={handleCreateTodo}
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
