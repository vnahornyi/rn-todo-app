import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { RootScreensType } from "../App";
import COLORS from "../constants/colors";
import TYPOGRAPHY from "../constants/typography";
import {
  moderatePixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from "../utils/normalize";

import CloseIcon from "../assets/images/icons/close.svg";
import CheckBox from "../UI/CheckBox";

type PropsType = NativeStackScreenProps<RootScreensType, "TodoScreen">;

const TodoScreen: React.FC<PropsType> = ({ navigation, route }) => {
  const { title, description, isCompleted } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={navigation.goBack}
        style={styles.backButton}
        activeOpacity={0.8}
      >
        <CloseIcon color={COLORS.white} />
      </TouchableOpacity>
      <View style={styles.head}>
        <CheckBox initialValue={isCompleted} />
        <View style={styles.content}>
          <Text style={TYPOGRAPHY.bigBody}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: pixelSizeHorizontal(24),
    paddingVertical: pixelSizeVertical(12),
  },
  backButton: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 4,
    width: moderatePixel(32),
    height: moderatePixel(32),
    justifyContent: "center",
    alignItems: "center",
  },
  head: {
    paddingVertical: pixelSizeVertical(27),
    flexDirection: "row",
    gap: pixelSizeHorizontal(21),
  },
  content: {
    gap: pixelSizeVertical(15),
  },
  description: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray,
  },
});

export default TodoScreen;
