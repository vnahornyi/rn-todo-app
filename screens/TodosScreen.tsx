import { useCallback, useState } from "react";
import { StyleSheet, FlatList, ListRenderItemInfo } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { pixelSizeHorizontal, pixelSizeVertical } from "../utils/normalize";

import Empty from "../components/Empty";
import TodoCard from "../components/TodoCard";

export type TodoType = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
};

const TodosScreen: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([
    {
      id: 1,
      title: "todo",
      description: "desc",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Todo 2",
      description: "description 2",
      isCompleted: false,
    },
  ]);

  const renderItem = useCallback(
    (props: ListRenderItemInfo<TodoType>) => (
      <TodoCard {...props.item} setCompleted={() => {}} />
    ),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <Empty isEmpty={!todos.length}>
        <FlatList
          data={todos}
          keyExtractor={(todo) => todo.id.toString()}
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
  },
  listContainer: {
    paddingVertical: pixelSizeVertical(12),
    paddingHorizontal: pixelSizeHorizontal(24),
    gap: pixelSizeVertical(16),
  },
});
