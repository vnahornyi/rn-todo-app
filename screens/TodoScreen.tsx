import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import { RootScreensType } from "../App";

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
    backgroundColor: "#FFFFFF",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height - 150,
    position: "absolute",
    bottom: 0,
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

export default TodoScreen;
