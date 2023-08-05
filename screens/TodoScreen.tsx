import { useCallback } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { RootScreensType } from "../App";
import COLORS from "../constants/colors";
import TYPOGRAPHY from "../constants/typography";
import useTodos from "../hooks/useTodos";
import {
  moderatePixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from "../utils/normalize";

import TrashIcon from "../assets/images/icons/trash.svg";
import CheckBox from "../UI/CheckBox";
import Button from "../UI/Button";
import BackButton from "../components/BackButton";

type PropsType = NativeStackScreenProps<RootScreensType, "TodoScreen">;

const TodoScreen: React.FC<PropsType> = ({ navigation, route }) => {
  const { todoId } = route.params;
  const { completeTodo, todos, deleteTodo } = useTodos();
  const todo = todos.find((todo) => todoId === todo.id);

  if (!todo) return null;

  const handleComplete = useCallback(
    (state: boolean) => {
      completeTodo(todoId, state);
    },
    [todoId, completeTodo]
  );

  const handleOpenEdit = () => {
    navigation.navigate("CreateEditTodo", todo);
  };

  const handleDelete = () => {
    navigation.push("TabsRoot");
    deleteTodo(todo.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.back}>
        <BackButton />
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.head}>
          <CheckBox value={todo.isCompleted} onChange={handleComplete} />
          <View style={styles.content}>
            <Text style={TYPOGRAPHY.bigBody}>{todo.title}</Text>
            <Text style={styles.description}>{todo.description}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.deleteBtn}
          activeOpacity={0.8}
          onPress={handleDelete}
        >
          <TrashIcon
            width={moderatePixel(24)}
            height={moderatePixel(24)}
            color={COLORS.error}
          />
          <Text style={styles.deleteText}>Delete Task</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.bottomBtn}>
        <Button title="Edit Task" onPress={handleOpenEdit} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: pixelSizeVertical(12),
  },
  back: {
    paddingHorizontal: pixelSizeHorizontal(24),
    paddingBottom: pixelSizeVertical(12),
  },
  scroll: {
    paddingHorizontal: pixelSizeHorizontal(24),
  },
  bottomBtn: {
    paddingHorizontal: pixelSizeHorizontal(24),
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
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: pixelSizeHorizontal(11),
  },
  deleteText: {
    ...TYPOGRAPHY.body,
    color: COLORS.error,
  },
});

export default TodoScreen;
