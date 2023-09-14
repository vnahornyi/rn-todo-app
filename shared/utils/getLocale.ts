import { NativeModules } from "react-native";

import PLATFORM from "../constants/platform";
import { getFromStorage } from "./storage";
import { WEB_LANGUAGE } from "../constants/storageKeys";

export const DEFAULT_FALLBACK = "en";
export const LOCALES = ["en", "uk"];

const detectLocale = async () => {
  let locale: string = DEFAULT_FALLBACK;

  if (PLATFORM.isWeb) {
    locale = (await getFromStorage<string>(WEB_LANGUAGE)) ?? DEFAULT_FALLBACK;
  } else if (PLATFORM.isIOS) {
    locale =
      NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0];
  } else {
    locale = NativeModules.I18nManager.localeIdentifier;
  }

  if (locale && locale.length > 2) {
    locale = locale.slice(0, 2);
  }

  if (!locale || !LOCALES.includes(locale)) return DEFAULT_FALLBACK;

  return locale;
};

export default detectLocale;
