import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { RootScreensType } from "../App";

import COLORS from "../constants/colors";
import TYPOGRAPHY from "../constants/typography";
import { TodoType } from "../../shared/types/todos";
import { pixelSizeHorizontal, pixelSizeVertical } from "../utils/normalize";

import EducationIcon from "../assets/images/icons/education.svg";
import CheckBox from "../UI/CheckBox";
import Chip from "../UI/Chip";
import { t } from "@lingui/macro";
import useLocale from "../../shared/hooks/useLocale";
import createStyles from "../utils/createStyles";

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
  const styles = useStyles();
  const { i18n } = useLocale();
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
        <Text style={styles.title}>{title}</Text>
        <View style={styles.bottomPart}>
          <Text style={styles.when}>{t(i18n)`Today At`} 16:45</Text>
          <Chip
            iconColor={COLORS.primary}
            color="blue"
            Icon={EducationIcon}
            name={t(i18n)`University`}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TodoCard;

const useStyles = createStyles((colors) => ({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 4,
    flexDirection: "row",
    paddingVertical: pixelSizeVertical(12),
    paddingHorizontal: pixelSizeHorizontal(10),
    alignItems: "center",
    gap: pixelSizeHorizontal(12),
    shadowColor: colors.black,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
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
    color: colors.secondary,
  },
  title: {
    ...TYPOGRAPHY.body,
    color: colors.text,
  },
}));
