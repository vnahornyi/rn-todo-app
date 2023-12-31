import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import TYPOGRAPHY from "../constants/typography";
import { pixelSizeHorizontal, pixelSizeVertical } from "../utils/normalize";
import useTheme from "../hooks/useTheme";

type PropsType = {
  onPress: () => void;
  title: string;
  variant?: "contained" | "outline" | "ghost";
  color?: "primary" | "secondary";
  disabled?: boolean;
};

const ghostHitSlop = {
  top: pixelSizeVertical(12),
  bottom: pixelSizeVertical(12),
  right: pixelSizeHorizontal(24),
  left: pixelSizeHorizontal(24),
};

const Button: React.FC<PropsType> = ({
  onPress,
  title,
  variant = "contained",
  color = "primary",
  disabled,
}) => {
  const { isLight, colors } = useTheme();
  const { buttonStyles, textStyles } = useMemo(() => {
    const textByTheme =
      isLight && variant !== "contained" ? colors.black : colors.white;
    const bgColor = variant === "contained" ? colors[color] : "transparent";
    const borderColor = variant === "outline" ? colors[color] : "transparent";
    const textColor = variant === "ghost" ? colors[color] : textByTheme;

    return {
      buttonStyles: {
        ...styles.default,
        backgroundColor: bgColor,
        borderColor,
        paddingVertical: variant === "ghost" ? 0 : pixelSizeVertical(12),
        paddingHorizontal: variant === "ghost" ? 0 : pixelSizeHorizontal(24),
      },
      textStyles: {
        ...styles.text,
        ...TYPOGRAPHY.body,
        color: textColor,
      },
    };
  }, [variant, color, isLight, colors]);

  return (
    <TouchableOpacity
      hitSlop={variant === "ghost" ? ghostHitSlop : undefined}
      onPress={onPress}
      activeOpacity={0.8}
      style={buttonStyles}
      disabled={disabled}
    >
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  default: {
    width: "auto",
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "transparent",
    borderRadius: 4,
  },
  text: {
    textAlign: "center",
  },
});
