import { useContext } from "react";

import { TodosContext } from "../providers/TodosProvider";

const useTodos = () => {
  const context = useContext(TodosContext);

  return context;
};

export default useTodos;
