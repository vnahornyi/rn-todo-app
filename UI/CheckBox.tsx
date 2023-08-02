import { StyleSheet, TouchableOpacity } from "react-native";

import CheckIcon from "../assets/images/icons/check.svg";
import useBoolean from "../hooks/useBoolean";
import COLORS from "../constants/colors";

type CheckBoxPropsType = {
  initialValue?: boolean;
  onChange?: (status: boolean) => void;
};

const CheckBox: React.FC<CheckBoxPropsType> = ({ initialValue, onChange }) => {
  const [isChecked, setChecked] = useBoolean(initialValue);

  const handleCheck = () => {
    setChecked.toggle();
    onChange && onChange(!isChecked);
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.checkbox,
        borderColor: isChecked ? COLORS.primary : COLORS.white,
      }}
      activeOpacity={0.8}
      onPress={handleCheck}
    >
      {isChecked && <CheckIcon color={COLORS.primary} />}
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1.5,
    borderRadius: 9999,
  },
});
