import { Animated, StyleSheet, TextInput, View } from "react-native";

import useBoolean from "@todoapp/shared/src/hooks/useBoolean";
import { useEffect, useMemo, useRef } from "react";
import { pixelSizeHorizontal, pixelSizeVertical } from "../utils/normalize";
import COLORS from "../constants/colors";
import TYPOGRAPHY from "../constants/typography";

type PropsType = React.ComponentProps<typeof TextInput> & {
  label: string;
  error?: string;
};

const Input: React.FC<PropsType> = ({ label, error, ...inputProps }) => {
  const animation = useRef(
    new Animated.Value(inputProps.value ? 1 : 0)
  ).current;
  const errorAnimation = useRef(new Animated.Value(error ? 1 : 0)).current;
  const [isFocused, setFocused] = useBoolean(false);

  useEffect(() => {
    if (inputProps.value) return;

    Animated.timing(animation, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isFocused, animation, inputProps.value]);

  useEffect(() => {
    Animated.timing(errorAnimation, {
      toValue: error ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [error]);

  const labelStyles = useMemo(
    () => [
      styles.label,
      {
        transform: [
          {
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 0],
            }),
          },
          {
            scale: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.6],
            }),
          },
        ],
        opacity: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
    ],
    [animation]
  );

  const errorStyles = useMemo(
    () => [
      styles.error,
      {
        opacity: errorAnimation,
      },
    ],
    [errorAnimation]
  );

  return (
    <View>
      <Animated.Text style={labelStyles}>{label}</Animated.Text>
      <TextInput
        {...inputProps}
        onFocus={setFocused.on}
        onBlur={setFocused.off}
        style={styles.input}
      />
      {error && <Animated.Text style={errorStyles}>{error}</Animated.Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  label: {
    position: "absolute",
    left: pixelSizeHorizontal(12),
    ...TYPOGRAPHY.bigBody,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: COLORS.borderColor,
    paddingVertical: pixelSizeVertical(16),
    paddingHorizontal: pixelSizeHorizontal(16),
    ...TYPOGRAPHY.bigBody,
  },
  error: {
    ...TYPOGRAPHY.span,
    position: "absolute",
    top: pixelSizeVertical(65),
    color: COLORS.error,
  },
});
