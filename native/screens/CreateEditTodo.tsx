import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Trans, t } from "@lingui/macro";
import { useState } from "react";

import useLocale from "../../shared/hooks/useLocale";
import { moderatePixel, pixelSizeVertical } from "../utils/normalize";
import TYPOGRAPHY from "../constants/typography";
import { RootScreensType } from "../App";
import useTodos from "../../shared/hooks/useTodos";
import PLATFORM from "../constants/platform";

import Button from "../UI/Button";
import useTheme from "../hooks/useTheme";
import createStyles from "../utils/createStyles";

type CreateEditTodoPropsType = NativeStackScreenProps<
  RootScreensType,
  "CreateEditTodo"
>;

const CreateEditTodo: React.FC<CreateEditTodoPropsType> = ({
  navigation,
  route,
}) => {
  const styles = useStyles();
  const { colors } = useTheme();
  const { i18n } = useLocale();
  const { addTodo, editTodo } = useTodos();
  const [title, setTitle] = useState(route.params?.title ?? "");
  const [description, setDescription] = useState(
    route.params?.description ?? ""
  );

  const submitLabel = route.params?.id
    ? t(i18n)`Edit Todo`
    : t(i18n)`Create Todo`;

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) return;

    if (route.params?.id) {
      editTodo(route.params.id, {
        title,
        description,
        isCompleted: route.params.isCompleted,
      });
    } else {
      addTodo(title.trim(), description.trim());
    }
    setTitle("");
    setDescription("");

    if (route.params?.id && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("TodosScreen");
    }
  };

  return (
    <SafeAreaView style={styles.fill}>
      <KeyboardAvoidingView
        style={styles.fill}
        keyboardVerticalOffset={moderatePixel(50)}
        behavior={PLATFORM.isIOS ? "padding" : undefined}
        enabled
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.topPart}>
              <Text style={styles.title}>
                <Trans>Add Task</Trans>
              </Text>
              <Text style={styles.label}>
                <Trans>Todo:</Trans>
              </Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder={t(i18n)`Task's name`}
                maxLength={50}
                placeholderTextColor={colors.gray}
              />
              <Text style={styles.label}>
                <Trans>Description:</Trans>
              </Text>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                maxLength={200}
                placeholder={t(i18n)`What do you want to do?`}
                placeholderTextColor={colors.gray}
              />
            </View>
            <View style={styles.bottomBtns}>
              <Button
                variant="ghost"
                title={t(i18n)`Cancel`}
                onPress={navigation.goBack}
              />
              <Button title={submitLabel} onPress={handleSubmit} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateEditTodo;

const useStyles = createStyles((colors) => ({
  fill: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: moderatePixel(24),
    justifyContent: "space-between",
  },
  topPart: {
    gap: pixelSizeVertical(16),
  },
  input: {
    ...TYPOGRAPHY.body,
    borderRadius: 4,
    borderColor: colors.borderColor,
    color: colors.text,
    borderWidth: 1,
    padding: moderatePixel(12),
  },
  bottomBtns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    ...TYPOGRAPHY.title,
    color: colors.text,
  },
  label: {
    ...TYPOGRAPHY.body,
    color: colors.text,
  },
}));
