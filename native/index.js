/**
 * @format
 */

import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-pluralrules/locale-data/en";
import "@formatjs/intl-pluralrules/locale-data/uk";
import "@formatjs/intl-datetimeformat/polyfill";
import "@formatjs/intl-datetimeformat/locale-data/en";
import "@formatjs/intl-datetimeformat/locale-data/uk";
import "@formatjs/intl-datetimeformat/add-all-tz";
import "@formatjs/intl-displaynames/polyfill";
import "@formatjs/intl-displaynames/locale-data/en";
import "@formatjs/intl-displaynames/locale-data/uk";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/locale-data/en";
import "@formatjs/intl-relativetimeformat/locale-data/uk";
import "@formatjs/intl-listformat/polyfill";
import "@formatjs/intl-listformat/locale-data/en";
import "@formatjs/intl-listformat/locale-data/uk";
import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-numberformat/locale-data/en";
import "@formatjs/intl-numberformat/locale-data/uk";
import "@formatjs/intl-getcanonicallocales/polyfill";

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
