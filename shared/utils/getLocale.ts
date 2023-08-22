import {
  detect,
  fromUrl,
  fromStorage,
  fromNavigator,
} from "@lingui/detect-locale";
import { NativeModules } from "react-native";

import PLATFORM from "../constants/platform";

export const DEFAULT_FALLBACK = "en";
export const LOCALES = ["en", "uk"];

const detectLocale = () => {
  let locale: string = DEFAULT_FALLBACK;

  if (PLATFORM.isWeb) {
    locale = detect(
      fromUrl("lang"),
      fromStorage("lang"),
      fromNavigator(),
      DEFAULT_FALLBACK
    ) as string;
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
