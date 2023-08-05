import { StyleSheet, TouchableOpacity } from "react-native";

import CheckIcon from "../assets/images/icons/check.svg";
import useBoolean from "../hooks/useBoolean";
import COLORS from "../constants/colors";
import { moderatePixel } from "../utils/normalize";

type CheckBoxPropsType = {
  value: boolean;
  onChange: (status: boolean) => void;
};

const CheckBox: React.FC<CheckBoxPropsType> = ({ value, onChange }) => {
  const handleCheck = () => {
    onChange(!value);
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.checkbox,
        borderColor: value ? COLORS.primary : COLORS.white,
      }}
      activeOpacity={0.8}
      onPress={handleCheck}
    >
      {value && <CheckIcon color={COLORS.primary} />}
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  checkbox: {
    width: moderatePixel(24),
    height: moderatePixel(24),
    borderWidth: 1.5,
    borderRadius: 9999,
  },
});