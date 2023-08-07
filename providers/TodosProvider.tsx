import { createContext, useState } from "react";
import { ProviderPropsType } from ".";
import Todos from "../utils/api/Todos";

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
  prepareTodos: () => Promise<void>;
  addTodo: (title: string, description: string) => Promise<void>;
  deleteTodo: (todoId: number) => Promise<void>;
  editTodo: (todoId: number, payload: Omit<TodoType, "id">) => Promise<void>;
  completeTodo: (todoId: number, completed: boolean) => Promise<void>;
};

export const TodosContext = createContext<ContextType>({
  todos: [],
  prepareTodos: async () => {},
  addTodo: async () => {},
  deleteTodo: async () => {},
  editTodo: async () => {},
  completeTodo: async () => {},
});

const TodosProvider: React.FC<ProviderPropsType> = ({ children }) => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const fetchTodo = async () => {
    const todos = await Todos.loadAll();

    setTodos(todos);
  };

  const addTodo = async (title: string, description: string) => {
    const created = await Todos.create({
      id: Date.now(),
      title,
      description,
      isCompleted: false,
    });

    if (!created) return;

    setTodos((todos) => [...todos, created]);
  };

  const deleteTodo = async (todoId: number) => {
    const deleted = await Todos.delete(todoId);

    if (!deleted) return;

    setTodos((todos) => todos.filter((todo) => todoId !== todo.id));
  };

  const editTodo = async (todoId: number, payload: Omit<TodoType, "id">) => {
    const edited = await Todos.update(todoId, payload);

    if (!edited?.id) return;

    setTodos((todos) => [
      ...todos.filter((todo) => todo.id !== todoId),
      edited,
    ]);
  };

  const completeTodo = async (todoId: number, isCompleted: boolean) => {
    const todo = todos.find((todo) => todo.id === todoId);

    if (!todo) return;

    await editTodo(todoId, { ...todo, isCompleted });
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        editTodo,
        completeTodo,
        prepareTodos: fetchTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;
