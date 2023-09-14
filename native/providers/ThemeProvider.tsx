import { createContext, useCallback, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { COLORS, ColorsType, DARK_COLORS } from "../constants/colors";
import { getFromStorage, setToStorage } from "../../shared/utils/storage";
import { MOBILE_PREFERENCE } from "../../shared/constants/storageKeys";

type ThemeType = "light" | "dark";
export type PreferenceType = ThemeType | "system";

type ThemeStateType = {
  preference: PreferenceType;
  currentTheme: ThemeType;
};

type ContextType = Omit<ThemeStateType, "currentTheme"> & {
  setPreference: (preference: PreferenceType) => void;
  preparePreference: () => Promise<void>;
  colors: ColorsType;
  isLight: boolean;
  isDark: boolean;
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
    const currentTheme =
      preference === "system"
        ? Appearance.getColorScheme() ?? "light"
        : preference;

    setTheme({
      currentTheme,
      preference,
    });

    setToStorage(MOBILE_PREFERENCE, preference);
  }, []);

  const preparePreference = useCallback(async () => {
    const preference: PreferenceType =
      (await getFromStorage<PreferenceType | null>(MOBILE_PREFERENCE)) ??
      "system";

    setPreference(preference);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        preference: theme.preference,
        isDark: theme.currentTheme === "dark",
        isLight: theme.currentTheme === "light",
        colors: theme.currentTheme === "light" ? COLORS : DARK_COLORS,
        setPreference,
        preparePreference,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
