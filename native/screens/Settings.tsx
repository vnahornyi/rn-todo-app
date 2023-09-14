import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import createStyles from "../utils/createStyles";
import TYPOGRAPHY from "../constants/typography";
import { pixelSizeHorizontal, pixelSizeVertical } from "../utils/normalize";
import Button from "../UI/Button";
import { Trans, t } from "@lingui/macro";
import useLocale from "../../shared/hooks/useLocale";
import useTheme from "../hooks/useTheme";
import { PreferenceType } from "../providers/ThemeProvider";

const Settings: React.FC = () => {
  const { i18n } = useLocale();
  const { preference, setPreference } = useTheme();
  const styles = useStyles();
  const [rotate, setRotate] = useState(0);
  const pressIn = useRef(false);
  const rotateBlue = useSharedValue("0deg");
  const scaleBlue = useSharedValue(1);
  const colorBlue = useSharedValue("#4F709C");

  useEffect(() => {
    rotateBlue.value = withRepeat(
      withTiming("-360deg", { duration: 3000 }),
      -1
    );
    scaleBlue.value = withRepeat(withTiming(0.5, { duration: 1000 }), -1, true);
    colorBlue.value = withRepeat(
      withTiming("#E5D283", { duration: 300 }),
      -1,
      true
    );

    requestAnimationFrame(function animate() {
      const nextStep = pressIn.current ? 0.3 : 1;

      setRotate((state) => (state > 359 ? 0 : state + nextStep));

      requestAnimationFrame(animate);
    });
  }, []);

  const preferenceHandler = useCallback((preference: PreferenceType) => {
    return () => {
      setPreference(preference);
    };
  }, []);

  const animatedBlockStyle = useMemo(
    () => [
      styles.animatedBlock,
      {
        transform: [
          {
            rotate: `${rotate}deg`,
          },
        ],
      },
    ],
    [rotate]
  );

  const blockBlueStyle = useAnimatedStyle(
    () => ({
      ...styles.blueBlock,
      backgroundColor: colorBlue.value,
      transform: [
        {
          rotate: rotateBlue.value,
        },
        {
          scale: scaleBlue.value,
        },
      ],
    }),
    []
  );

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
      {/* <WebView
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
      /> */}
      <Pressable
        onPressIn={() => (pressIn.current = true)}
        onPressOut={() => (pressIn.current = false)}
      >
        <View style={animatedBlockStyle} />
      </Pressable>
      <Animated.View style={blockBlueStyle} />
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
  animatedBlock: {
    width: 200,
    height: 100,
    backgroundColor: "red",
  },
  blueBlock: {
    width: 200,
    height: 100,
    backgroundColor: "blue",
  },
}));

export default Settings;
