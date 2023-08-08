import { useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DeviceInfo from "react-native-device-info";

import { pixelSizeHorizontal, pixelSizeVertical } from "../utils/normalize";
import { TodoType } from "@todoapp/shared/src/providers/todosProvider";
import useTodos from "@todoapp/shared/src/hooks/useTodos";

import Empty from "../components/Empty";
import TodoCard from "../components/TodoCard";
import COLORS from "../constants/colors";

const TodosScreen: React.FC = () => {
  const { todos, completeTodo } = useTodos();

  const renderItem = useCallback(
    (props: ListRenderItemInfo<TodoType>) => (
      <TodoCard
        {...props.item}
        setCompleted={(status: boolean) => completeTodo(props.item.id, status)}
      />
    ),
    []
  );

  const keyExtractor = useCallback((todo: TodoType) => todo.id.toString(), []);

  return (
    <SafeAreaView style={styles.container}>
      <Empty isEmpty={!todos.length}>
        <FlatList
          data={todos}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      </Empty>
    </SafeAreaView>
  );
};

export default TodosScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor:
      DeviceInfo.hasNotch() && Platform.Version < "16"
        ? COLORS.blue
        : undefined,
  },
  listContainer: {
    paddingVertical: pixelSizeVertical(12),
    paddingHorizontal: pixelSizeHorizontal(24),
    gap: pixelSizeVertical(16),
  },
});
