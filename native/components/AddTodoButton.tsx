import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";

import { moderatePixel, pixelSizeHorizontal } from "../utils/normalize";
import createStyles from "../utils/createStyles";
import useTheme from "../hooks/useTheme";

import PlusIcon from "../assets/images/icons/plus.svg";
import { RootScreensType } from "../App";

type NavigationType = NativeStackNavigationProp<RootScreensType, "TabsRoot">;

const AddTodoButton: React.FC = () => {
  const { colors } = useTheme();
  const styles = useStyles();
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
        color={colors.white}
      />
    </TouchableOpacity>
  );
};

export default AddTodoButton;

const useStyles = createStyles((colors) => ({
  container: {
    width: moderatePixel(64),
    height: moderatePixel(64),
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
    position: "relative",
    bottom: pixelSizeHorizontal(32),
  },
}));
