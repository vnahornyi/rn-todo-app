import { I18n, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import React, { createContext, useCallback, useRef, useState } from "react";

import detectLocale from "../utils/getLocale";
import { messages as enMessages } from "../locales/en/messages";
import { messages as ukMessages } from "../locales/uk/messages";

type PropsType = {
  children: React.ReactNode;
};

type LocalesContextType = {
  i18n: I18n;
  currentLocale: string;
  selectLocale: (locale: string) => void;
};

export const LocalesContext = createContext<LocalesContextType>(
  {} as LocalesContextType
);

const LocalesProvider: React.FC<PropsType> = ({ children }) => {
  const detectedLocale = useRef<string>(detectLocale()).current;
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
  }, []);

  return (
    <LocalesContext.Provider
      value={{ i18n, selectLocale, currentLocale: selectedLocale }}
    >
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    </LocalesContext.Provider>
  );
};

export default LocalesProvider;
