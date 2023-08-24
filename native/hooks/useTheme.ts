import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const useTheme = () => {
  const context = useContext(ThemeContext);

  return context;
}

export default useTheme;
