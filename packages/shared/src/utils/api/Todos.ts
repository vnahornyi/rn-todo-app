import { Alert } from "react-native";

import { TodoType } from "../../providers/TodosProvider";

class Todos {
  async loadAll(): Promise<TodoType[]> {
    try {
      const response = await fetch(
        "https://my-json-server.typicode.com/vnahornyi/rn-todo-app-json-placeholder/todos"
      );
      const todos = await response.json();

      return todos;
    } catch (error: any) {
      Alert.alert(error.message);
      return [];
    }
  }

  async update(
    todoId: number,
    payload: Omit<TodoType, "id">
  ): Promise<TodoType | null> {
    try {
      const response = await fetch(
        `https://my-json-server.typicode.com/vnahornyi/rn-todo-app-json-placeholder/todos/${todoId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            id: todoId,
            ...payload,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const updated = await response.json();

      return updated;
    } catch (error: any) {
      Alert.alert(error.message);
      return null;
    }
  }

  async create(todo: TodoType): Promise<TodoType | null> {
    try {
      const response = await fetch(
        `https://my-json-server.typicode.com/vnahornyi/rn-todo-app-json-placeholder/todos`,
        {
          method: "POST",
          body: JSON.stringify(todo),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const created = await response.json();

      return created;
    } catch (error: any) {
      Alert.alert(error.message);
      return null;
    }
  }

  async delete(todoId: number): Promise<boolean> {
    try {
      const response = await fetch(
        `https://my-json-server.typicode.com/vnahornyi/rn-todo-app-json-placeholder/todos/${todoId}`,
        {
          method: "DELETE",
        }
      );
      await response.json();

      return true;
    } catch (error: any) {
      Alert.alert(error.message);
      return false;
    }
  }
}

export default new Todos();
