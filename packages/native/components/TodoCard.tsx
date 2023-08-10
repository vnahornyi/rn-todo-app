import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { RootScreensType } from "../App";

import COLORS from "../constants/colors";
import TYPOGRAPHY from "../constants/typography";
import { TodoType } from "@todoapp/shared/src/providers/todosProvider";
import { pixelSizeHorizontal, pixelSizeVertical } from "../utils/normalize";

import EducationIcon from "../assets/images/icons/education.svg";
import CheckBox from "../UI/CheckBox";
import Chip from "../UI/Chip";

type TodoCardPropsType = TodoType & {
  setCompleted: React.ComponentProps<typeof CheckBox>["onChange"];
};

type TodosScreenNavigationProp = NativeStackNavigationProp<
  RootScreensType,
  "TodosScreen"
>;

const TodoCard: React.FC<TodoCardPropsType> = ({
  setCompleted,
  isCompleted,
  title,
  id,
}) => {
  const navigation = useNavigation<TodosScreenNavigationProp>();

  const handleOpenTodo = () => {
    navigation.navigate("TodoScreen", { todoId: id });
  };

  return (
    <TouchableOpacity
      onPress={handleOpenTodo}
      activeOpacity={0.8}
      style={styles.card}
    >
      <CheckBox value={isCompleted} onChange={setCompleted} />
      <View style={styles.content}>
        <Text style={TYPOGRAPHY.body}>{title}</Text>
        <View style={styles.bottomPart}>
          <Text style={styles.when}>Today At 16:45</Text>
          <Chip
            iconColor={COLORS.primary}
            color="blue"
            Icon={EducationIcon}
            name="University"
          />
        </View>
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
    paddingVertical: pixelSizeVertical(12),
    paddingHorizontal: pixelSizeHorizontal(10),
    alignItems: "center",
    gap: pixelSizeHorizontal(12),
    shadowColor: COLORS.cardBackground,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 4,
  },
  bottomPart: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flexGrow: 1,
  },
  when: {
    ...TYPOGRAPHY.smallBody,
    color: COLORS.gray,
  },
});
