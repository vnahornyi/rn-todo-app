import { useMemo } from "react";
import { Text, View } from "react-native";
import { SvgProps } from "react-native-svg";

import {
  moderatePixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from "../utils/normalize";
import TYPOGRAPHY from "../constants/typography";
import useTheme from "../hooks/useTheme";
import createStyles from "../utils/createStyles";

type ChipPropsType = {
  color: "blue" | "red" | "yellow";
  iconColor: string;
  Icon: React.FC<SvgProps>;
  name: string;
};

const Chip: React.FC<ChipPropsType> = ({ name, Icon, color, iconColor }) => {
  const styles = useStyles();
  const { colors } = useTheme();
  const chipStyles = useMemo(
    () => ({
      ...styles.chip,
      backgroundColor: colors[color],
    }),
    [color]
  );

  return (
    <View style={chipStyles}>
      <Icon
        color={iconColor}
        width={moderatePixel(15)}
        height={moderatePixel(15)}
      />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default Chip;

const useStyles = createStyles((colors) => ({
  chip: {
    paddingVertical: pixelSizeVertical(8),
    paddingHorizontal: pixelSizeHorizontal(8),
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: pixelSizeHorizontal(5),
  },
  name: {
    ...TYPOGRAPHY.span,
    color: colors.white,
  },
}));
