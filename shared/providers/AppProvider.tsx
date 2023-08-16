import React, { createContext, useCallback, useState } from "react";

import Cats from "../utils/api/Cats";
import { CatType } from "../types/cats";

type LoadingStatusType = "idle" | "pending" | "fullfiled" | "rejected";

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

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
