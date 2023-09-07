import { I18n, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import React, {
  createContext,
  useCallback,
  useRef,
  useState,
} from "react";

import detectLocale, { DEFAULT_FALLBACK } from "../utils/getLocale";
import { messages as enMessages } from "../locales/en/messages";
import { messages as ukMessages } from "../locales/uk/messages";
import { setToStorage } from "../utils/storage";
import { WEB_LANGUAGE } from "../constants/storageKeys";

type PropsType = {
  children: React.ReactNode;
};

type LocalesContextType = {
  i18n: I18n;
  currentLocale: string;
  selectLocale: (locale: string) => void;
  prepareLocale: () => Promise<void>;
};

export const LocalesContext = createContext<LocalesContextType>(
  {} as LocalesContextType
);

const LocalesProvider: React.FC<PropsType> = ({ children }) => {
  const detectedLocale = useRef<string>(DEFAULT_FALLBACK).current;
  const i18n = useRef(
    setupI18n({
      locale: detectedLocale,
      messages: {
        en: enMessages,
        uk: ukMessages,
      },
    })
  ).current;

  const [selectedLocale, setSelectedLocale] = useState(detectedLocale);

  const selectLocale = useCallback((locale: string) => {
    i18n.activate(locale);
    setSelectedLocale(locale);
    void setToStorage(WEB_LANGUAGE, locale);
  }, []);

  const prepareLocale = useCallback(async () => {
    const locale = await detectLocale();
    await selectLocale(locale);
  }, [selectLocale]);

  return (
    <LocalesContext.Provider
      value={{
        i18n,
        selectLocale,
        currentLocale: selectedLocale,
        prepareLocale,
      }}
    >
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    </LocalesContext.Provider>
  );
};

export default LocalesProvider;
