import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { TodoType } from "../screens/TodosScreen";
import { RootScreensType } from "../App";

import COLORS from "../constants/colors";
import TYPOGRAPHY from "../constants/typography";

import EducationIcon from "../assets/images/icons/education.svg";
import CheckBox from "../UI/CheckBox";
import Chip from "../UI/Chip";
import { pixelSizeHorizontal, pixelSizeVertical } from "../utils/normalize";

type TodoCardPropsType = TodoType & {
  setCompleted: React.ComponentProps<typeof CheckBox>["onChange"];
};

type TodosScreenNavigationProp = NativeStackNavigationProp<
  RootScreensType,
  "TodosScreen"
>;

const TodoCard: React.FC<TodoCardPropsType> = ({ setCompleted, ...props }) => {
  const { isCompleted, title } = props;
  const navigation = useNavigation<TodosScreenNavigationProp>();

  const handleOpenTodo = () => {
    navigation.navigate("TodoScreen", props);
  };

  return (
    <TouchableOpacity
      onPress={handleOpenTodo}
      activeOpacity={0.8}
      style={styles.card}
    >
      <CheckBox initialValue={isCompleted} onChange={setCompleted} />
      <View style={styles.content}>
        <Text style={TYPOGRAPHY.body}>{title}</Text>
        <View style={styles.bottomPart}>
          <Text style={styles.when}>Today At 16:45</Text>
          <Chip color="blue" Icon={EducationIcon} name="University" />
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
