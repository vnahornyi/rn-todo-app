import { useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import COLORS from "../constants/colors";
import TYPOGRAPHY from "../constants/typography";

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
      },
      textStyles: {
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
    paddingHorizontal: 12,
    paddingVertical: 24,
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "transparent",
  },
});
