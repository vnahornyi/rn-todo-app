import { createContext, useCallback, useState } from "react";
import { getFromStorage, setToStorage } from "../../shared/utils/storage";
import { MOBILE_INTROSKIPPED } from "../../shared/constants/storageKeys";

type ProviderPropsType = {
  children: React.ReactNode;
};

export type AppStateType = {
  shouldSkipIntroScreen: boolean;
};

export type ContextType = AppStateType & {
  setShowIntroSkipped: () => void;
  prepareAppState: () => Promise<void>;
};

export const AppContext = createContext<ContextType>({} as ContextType);

const AppProvider: React.FC<ProviderPropsType> = ({ children }) => {
  const [appState, setAppState] = useState<AppStateType>({
    shouldSkipIntroScreen: false,
  });

  const setShowIntroSkipped = useCallback(() => {
    setAppState((state) => ({
      ...state,
      shouldSkipIntroScreen: true,
    }));
    void setToStorage(MOBILE_INTROSKIPPED, true);
  }, []);

  const prepareAppState = useCallback(async () => {
    const shouldSkipIntroScreen =
      (await getFromStorage<boolean>(MOBILE_INTROSKIPPED)) ?? false;

    setAppState((state) => ({
      ...state,
      shouldSkipIntroScreen,
    }));
  }, []);

  return (
    <AppContext.Provider
      value={{ ...appState, setShowIntroSkipped, prepareAppState }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
