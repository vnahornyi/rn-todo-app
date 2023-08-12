import DateTimePicker from "@react-native-community/datetimepicker";
import { View } from "react-native";
import { format } from "date-fns";

import Button from "./Button";
import useBoolean from "@todoapp/shared/src/hooks/useBoolean";
import PLATFORM from "../constants/platform";

type DatePickerPropsType = {
  value: Date;
  onChange: (value: Date) => void;
  minimumDate: Date;
  maximumDate: Date;
};

const DatePicker: React.FC<DatePickerPropsType> = ({
  value,
  onChange,
  minimumDate,
  maximumDate,
}) => {
  const [isShow, setShow] = useBoolean();

  const handleSelect = (_: unknown, value: Date | undefined) => {
    if (typeof value === "undefined") return;

    onChange(value);

    if (PLATFORM.isAndroid) {
      setShow.off();
    }
  };

  return (
    <View>
      <Button
        variant="outline"
        color="secondary"
        title={format(value, "yyyy-MM-dd")}
        onPress={setShow.toggle}
      />
      {isShow && (
        <DateTimePicker
          mode="date"
          display={PLATFORM.isIOS ? "inline" : "calendar"}
          value={value}
          themeVariant="dark"
          onChange={handleSelect}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
};

export default DatePicker;
