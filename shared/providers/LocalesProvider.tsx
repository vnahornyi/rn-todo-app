import { I18n, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { createContext } from "react";

import detectLocale from "../utils/getLocale";
import { messages as enMessages } from "../locales/en/messages";
import { messages as ukMessages } from "../locales/uk/messages";

type PropsType = {
  children: React.ReactNode;
};

type LocalesContextType = {
  i18n: I18n;
};

export const LocalesContext = createContext<LocalesContextType>(
  {} as LocalesContextType
);

const LocalesProvider: React.FC<PropsType> = ({ children }) => {
  const i18n = setupI18n({
    locale: detectLocale(),
    messages: {
      en: enMessages,
      uk: ukMessages,
    },
  });

  return (
    <LocalesContext.Provider value={{ i18n }}>
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    </LocalesContext.Provider>
  );
};

export default LocalesProvider;
