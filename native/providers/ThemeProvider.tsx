import { createContext, useCallback, useEffect, useState } from "react";
import { Appearance } from "react-native";

type ThemeType = "light" | "dark";
export type PreferenceType = ThemeType | "system";

type ThemeStateType = {
  preference: PreferenceType;
  currentTheme: ThemeType;
};

type ContextType = ThemeStateType & {
  setPreference: (preference: PreferenceType) => void;
};

export const ThemeContext = createContext<ContextType>({} as ContextType);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeStateType>({
    preference: "system",
    currentTheme: Appearance.getColorScheme() ?? "light",
  });

  useEffect(() => {
    if (theme.preference !== "system") return;

    const listener = Appearance.addChangeListener((event) => {
      setTheme((theme) => ({
        ...theme,
        currentTheme: event.colorScheme ?? "light",
      }));
    });

    return listener.remove;
  }, [theme.preference]);

  const setPreference = useCallback((preference: PreferenceType) => {
    setTheme({
      currentTheme:
        preference === "system"
          ? Appearance.getColorScheme() ?? "light"
          : preference,
      preference,
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        ...theme,
        setPreference,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
