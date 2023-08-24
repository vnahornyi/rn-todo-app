import { View } from "react-native";

import {
  heightPixel,
  pixelSizeHorizontal,
  widthPixel,
} from "../utils/normalize";
import createStyles from "../utils/createStyles";

type PropsType = {
  step: 1 | 2 | 3;
};

const Stepper: React.FC<PropsType> = ({ step }) => {
  const styles = useStyles();

  const getBlockStyle = (currentStep: number) => {
    return [styles.block, step === currentStep && styles.active];
  };

  return (
    <View style={styles.container}>
      <View style={getBlockStyle(1)} />
      <View style={getBlockStyle(2)} />
      <View style={getBlockStyle(3)} />
    </View>
  );
};

export default Stepper;

const useStyles = createStyles((colors) => ({
  container: {
    flexDirection: "row",
    gap: pixelSizeHorizontal(5),
    width: widthPixel(95),
  },
  block: {
    backgroundColor: colors.gray,
    height: heightPixel(4),
    flexGrow: 1,
    borderRadius: 8,
  },
  active: {
    backgroundColor: colors.text,
  },
}));
