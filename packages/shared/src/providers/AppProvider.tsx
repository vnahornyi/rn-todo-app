import { createContext, useCallback, useState } from "react";

import { ProviderPropsType } from ".";
import Cats from "../utils/api/Cats";

type LoadingStatusType = "idle" | "pending" | "fullfiled" | "rejected";

export type CatImageType = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export type CatType = {
  id: string;
  name: string;
  description: string;
  reference_image_id: string;
};

export type AppStateType = {
  cats: CatType[];
  loading: LoadingStatusType;
};

type ContextStateType = AppStateType & {
  loadCats: () => Promise<void>;
};

export const AppContext = createContext<ContextStateType>({
  cats: [],
  loading: "idle",
  loadCats: async () => {},
});

const AppProvider: React.FC<ProviderPropsType> = ({ children }) => {
  const [appState, setAppState] = useState<AppStateType>({
    cats: [],
    loading: "idle",
  });

  const loadCats = useCallback(async () => {
    try {
      setAppState((state) => ({
        ...state,
        loading: "pending",
      }));

      const cats = await Cats.loadAll();

      setAppState((state) => ({
        ...state,
        loading: "fullfiled",
        cats,
      }));
    } catch {
      setAppState((state) => ({ ...state, loading: "rejected" }));
    }
  }, [setAppState]);

  return (
    <AppContext.Provider
      value={{
        ...appState,
        loadCats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
