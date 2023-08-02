import { StyleSheet, View } from "react-native";
import COLORS from "../constants/colors";

type PropsType = {
  step: 1 | 2 | 3;
};

const Stepper: React.FC<PropsType> = ({ step }) => {
  const getBlockStyle = (currentStep: number) => {
    if (step === currentStep) return [styles.block, styles.active];

    return styles.block;
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 5,
    width: 95,
  },
  block: {
    backgroundColor: COLORS.gray,
    height: 4,
    flexGrow: 1,
    borderRadius: 8,
  },
  active: {
    backgroundColor: COLORS.white,
  },
});
