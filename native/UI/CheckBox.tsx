import { TouchableOpacity } from "react-native";

import CheckIcon from "../assets/images/icons/check.svg";
import COLORS from "../constants/colors";
import { moderatePixel } from "../utils/normalize";
import createStyles from "../utils/createStyles";

type CheckBoxPropsType = {
  value: boolean;
  onChange: (status: boolean) => void;
};

const CheckBox: React.FC<CheckBoxPropsType> = ({ value, onChange }) => {
  const styles = useStyles();

  const handleCheck = () => {
    onChange(!value);
  };

  return (
    <TouchableOpacity
      style={[styles.checkbox, value && styles.checked]}
      activeOpacity={0.8}
      onPress={handleCheck}
    >
      {value && <CheckIcon color={COLORS.primary} />}
    </TouchableOpacity>
  );
};

export default CheckBox;

const useStyles = createStyles((colors) => ({
  checkbox: {
    width: moderatePixel(24),
    height: moderatePixel(24),
    borderWidth: 1.5,
    borderRadius: 9999,
    borderColor: colors.text,
  },
  checked: {
    borderColor: colors.primary,
  },
}));
