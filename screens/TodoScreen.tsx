import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { RootScreensType } from "../App";
import COLORS from "../constants/colors";

import CloseIcon from "../assets/images/icons/close.svg";
import CheckBox from "../UI/CheckBox";
import TYPOGRAPHY from "../constants/typography";

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
  head: {
    paddingVertical: 27,
    flexDirection: "row",
    gap: 21,
  },
  content: {
    gap: 15,
  },
  description: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray,
  },
});

export default TodoScreen;
