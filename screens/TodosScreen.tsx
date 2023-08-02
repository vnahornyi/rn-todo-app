import { useCallback, useState } from "react";
import { StyleSheet, FlatList, ListRenderItemInfo, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
        <View style={styles.listContainer}>
          <FlatList
            data={todos}
            keyExtractor={(todo) => todo.id.toString()}
            renderItem={renderItem}
          />
        </View>
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
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});
