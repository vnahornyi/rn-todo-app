import { z } from "zod";

import { TodoType, TodoSchema } from "../../types/todos";
import errorAlert from "../errorAlert";

class Todos {
  async loadAll(): Promise<TodoType[]> {
    try {
      const response = await fetch(
        "https://my-json-server.typicode.com/vnahornyi/rn-todo-app-json-placeholder/todos"
      );
      const unparsedTodos = await response.json();
      const todos = TodoSchema.array().parse(unparsedTodos);

      return todos;
    } catch (error) {
      if (error instanceof z.ZodError) {
        errorAlert(error.message);
      }

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
      const unparsedTodo = await response.json();
      const updated = TodoSchema.parse(unparsedTodo);

      return updated;
    } catch (error) {
      if (error instanceof z.ZodError) {
        errorAlert(error.message);
      }

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
      const unparsedTodo = await response.json();
      const created = TodoSchema.parse(unparsedTodo);

      return created;
    } catch (error) {
      if (error instanceof z.ZodError) {
        errorAlert(error.message);
      }

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
    } catch (error) {
      if (error instanceof Error) {
        errorAlert(error.message);
      }

      return false;
    }
  }
}

export default new Todos();
