import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import COLORS from "../constants/colors";
import TYPOGRAPHY from "../constants/typography";
import { pixelSizeHorizontal, pixelSizeVertical } from "../utils/normalize";

type PropsType = {
  onPress: () => void;
  title: string;
  variant?: "contained" | "outline" | "ghost";
  color?: "primary" | "secondary";
  disabled?: boolean;
};

const Button: React.FC<PropsType> = ({
  onPress,
  title,
  variant = "contained",
  color = "primary",
  disabled,
}) => {
  const { buttonStyles, textStyles } = useMemo(() => {
    const bgColor = variant === "contained" ? COLORS[color] : "transparent";
    const borderColor = variant === "outline" ? COLORS[color] : "transparent";
    const textColor = variant === "ghost" ? COLORS[color] : COLORS.white;

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
  }, [variant, color]);

  return (
    <TouchableOpacity
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
