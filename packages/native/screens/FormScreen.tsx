import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { pixelSizeHorizontal, pixelSizeVertical } from "../utils/normalize";
import PLATFORM from "../constants/platform";
import COLORS from "../constants/colors";

import Button from "../UI/Button";
import Input from "../UI/Input";
import DatePicker from "../UI/DatePicker";

type FormType = {
  name: string;
  password: string;
  age: Date;
};

const FormScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      name: "",
      password: "",
      age: new Date(),
    },
  });

  const onSubmit = (data: FormType) => {
    const jsonDate = data.age.toJSON();
    Alert.alert(JSON.stringify({ ...data, age: jsonDate }));
    Keyboard.dismiss();
    reset();
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={pixelSizeVertical(70)}
      behavior={PLATFORM.isIOS ? "padding" : undefined}
      style={styles.fill}
      enabled
    >
      <ScrollView style={styles.inputs}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <Controller
              control={control}
              name="name"
              rules={{
                required: { value: true, message: "This field is required" },
                maxLength: { value: 50, message: "Should be not more than 50" },
              }}
              render={({ field }) => (
                <Input
                  label="User Name"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{
                required: { value: true, message: "This field is required" },
                minLength: { value: 3, message: "Should be more than 2" },
                maxLength: { value: 10, message: "Should be less than 10" },
              }}
              render={({ field }) => (
                <Input
                  label="Password"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.password?.message}
                  secureTextEntry
                />
              )}
            />
            <Controller
              control={control}
              name="age"
              render={({ field }) => (
                <DatePicker
                  minimumDate={new Date(1950, 1, 1)}
                  maximumDate={new Date()}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View style={styles.footer}>
        <Button title="Send" onPress={handleSubmit(onSubmit)} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default FormScreen;

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  inputs: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: pixelSizeHorizontal(24),
    paddingVertical: pixelSizeVertical(16),
    gap: pixelSizeVertical(32),
  },
  footer: {
    backgroundColor: COLORS.background,
    paddingHorizontal: pixelSizeHorizontal(24),
    paddingBottom: pixelSizeVertical(44),
    paddingTop: pixelSizeVertical(12),
  },
  datepicker: {
    width: "100%",
  },
});