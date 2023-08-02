import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity } from "react-native";

import { RootScreensType } from "../App";
import COLORS from "../constants/colors";

import CloseIcon from "../assets/images/icons/close.svg";

type PropsType = NativeStackScreenProps<RootScreensType, "TodoScreen">;

const TodoScreen: React.FC<PropsType> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} activeOpacity={0.8}>
        <CloseIcon color={COLORS.white} onPress={navigation.goBack} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  backButton: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 4,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TodoScreen;
