import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";
import { RootScreensType } from "../App";

import COLORS from "../constants/colors";
import SIZES from "../constants/sizes";

type PropsType = NativeStackScreenProps<
  RootScreensType,
  "Todo" | "TransparentTodo"
>;

const TodoScreen: React.FC<PropsType> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Todo transparent modal</Text>
      <Button title="Close" onPress={navigation.goBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.modalBackground,
    width: SIZES.screenWidth,
    height: SIZES.screenHeight - 150,
    position: "absolute",
    bottom: 0,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 2, height: 2 },
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

export default TodoScreen;
