import { createContext, useState } from "react";
import { ProviderPropsType } from ".";

export type TodoType = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
};

type TodosStateType = {
  todos: Array<TodoType>;
};

type ContextType = TodosStateType & {
  addTodo: (title: string, description: string) => void;
  deleteTodo: (todoId: number) => void;
  editTodo: (todoId: number, payload: Omit<TodoType, "id">) => void;
  completeTodo: (todoId: number, completed: boolean) => void;
};

export const TodosContext = createContext<ContextType>({
  todos: [],
  addTodo: () => {},
  deleteTodo: () => {},
  editTodo: () => {},
  completeTodo: () => {},
});

const TodosProvider: React.FC<ProviderPropsType> = ({ children }) => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const addTodo = (title: string, description: string) => {
    setTodos((todos) => [
      ...todos,
      { id: Date.now(), title, description, isCompleted: false },
    ]);
  };

  const deleteTodo = (todoId: number) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== todoId));
  };

  const editTodo = (todoId: number, payload: Omit<TodoType, "id">) => {
    setTodos((todos) => {
      const todoIndex = todos.findIndex((todo) => todo.id !== todoId);
      todos[todoIndex] = { id: todoId, ...payload };

      return [...todos];
    });
  };

  const completeTodo = (todoId: number, completed: boolean) => {
    setTodos((todos) => {
      const todoIndex = todos.findIndex((todo) => todo.id === todoId);
      todos[todoIndex].isCompleted = completed;

      return [...todos];
    });
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        editTodo,
        completeTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;
