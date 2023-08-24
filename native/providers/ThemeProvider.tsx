import { createContext, useCallback, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { COLORS, ColorsType, DARK_COLORS } from "../constants/colors";

type ThemeType = "light" | "dark";
export type PreferenceType = ThemeType | "system";

type ThemeStateType = {
  preference: PreferenceType;
  currentTheme: ThemeType;
};

type ContextType = ThemeStateType & {
  setPreference: (preference: PreferenceType) => void;
  colors: ColorsType;
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
    console.log(Appearance.getColorScheme());
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
    const currentTheme =
      preference === "system"
        ? Appearance.getColorScheme() ?? "light"
        : preference;

    setTheme({
      currentTheme,
      preference,
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        ...theme,
        colors: theme.currentTheme === "light" ? COLORS : DARK_COLORS,
        setPreference,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;