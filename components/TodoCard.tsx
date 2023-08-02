import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TodoType } from "../screens/TodosScreen";

import { RootScreensType } from "../App";

import COLORS from "../constants/colors";
import CheckBox from "../UI/CheckBox";
import TYPOGRAPHY from "../constants/typography";

type TodoCardPropsType = TodoType & {
  setCompleted: React.ComponentProps<typeof CheckBox>["onChange"];
};

type TodosScreenNavigationProp = NativeStackNavigationProp<
  RootScreensType,
  "TodosScreen"
>;

const TodoCard: React.FC<TodoCardPropsType> = ({ setCompleted, ...props }) => {
  const { isCompleted, title, description } = props;
  const navigation = useNavigation<TodosScreenNavigationProp>();

  const handleOpenTodo = () => {
    navigation.navigate("TodoScreen");
  };

  return (
    <TouchableOpacity
      onPress={handleOpenTodo}
      activeOpacity={0.8}
      style={styles.card}
    >
      <CheckBox initialValue={isCompleted} onChange={setCompleted} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 4,
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "center",
    gap: 12,
  },
  content: {
    gap: 6,
  },
  title: {
    ...TYPOGRAPHY.body,
    color: COLORS.white,
  },
  description: {
    ...TYPOGRAPHY.smallBody,
    color: COLORS.white,
  },
});
