import { useContext } from "react";
import { AppContext } from "../providers/AppProvider";

const useAppState = () => {
  const context = useContext(AppContext);

  return context;
};

export default useAppState;
