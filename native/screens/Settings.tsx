import { Alert, Text, View } from "react-native";
import WebView from "../components/WebView";
import createStyles from "../utils/createStyles";
import TYPOGRAPHY from "../constants/typography";
import { pixelSizeHorizontal, pixelSizeVertical } from "../utils/normalize";
import Button from "../UI/Button";
import { Trans, t } from "@lingui/macro";
import useLocale from "../../shared/hooks/useLocale";
import useTheme from "../hooks/useTheme";
import { useCallback } from "react";
import { PreferenceType } from "../providers/ThemeProvider";

const Settings: React.FC = () => {
  const { i18n } = useLocale();
  const { preference, setPreference } = useTheme();
  const styles = useStyles();

  const preferenceHandler = useCallback((preference: PreferenceType) => {
    return () => {
      setPreference(preference);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Trans>Choose theme</Trans>
      </Text>
      <View style={styles.buttons}>
        <Button
          title={t(i18n)`Light`}
          variant={preference === "light" ? "contained" : "outline"}
          onPress={preferenceHandler("light")}
        />
        <Button
          title={t(i18n)`Dark`}
          variant={preference === "dark" ? "contained" : "outline"}
          onPress={preferenceHandler("dark")}
        />
        <Button
          title={t(i18n)`System`}
          variant={preference === "system" ? "contained" : "outline"}
          onPress={preferenceHandler("system")}
        />
      </View>
      <WebView
        uri="https://memcrab.com/"
        CSSString="h1 { color: red !important; }"
        injectedJSString={`
        const h1 = document.querySelector("h1");
        h1.innerText = "CLICK ME!";
        h1.onclick = () => {
          window.ReactNativeWebView.postMessage('Hi from WEB!');
        };
      `}
        onPostMesage={(event) => {
          Alert.alert("RN Alert", event.nativeEvent.data);
        }}
      />
    </View>
  );
};

const useStyles = createStyles((colors) => ({
  container: {
    flex: 1,
    paddingTop: pixelSizeVertical(20),
  },
  title: {
    ...TYPOGRAPHY.largeTitle,
    textAlign: "center",
    marginBottom: pixelSizeVertical(20),
    color: colors.text,
  },
  buttons: {
    gap: 10,
    paddingBottom: pixelSizeVertical(20),
    paddingHorizontal: pixelSizeHorizontal(20),
  },
}));

export default Settings;
