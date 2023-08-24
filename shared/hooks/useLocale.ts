import { useContext } from "react";

import { LocalesContext } from "../providers/LocalesProvider";

const useLocale = () => {
  const context = useContext(LocalesContext);

  return context;
};

export default useLocale;
