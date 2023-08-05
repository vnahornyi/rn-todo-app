import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

import { useState } from "react";

import { moderatePixel, pixelSizeVertical } from "../utils/normalize";
import TYPOGRAPHY from "../constants/typography";
import COLORS from "../constants/colors";
import { RootScreensType } from "../App";

import Button from "../UI/Button";
import useTodos from "../hooks/useTodos";
import SIZES from "../constants/sizes";

type CreateEditTodoPropsType = NativeStackScreenProps<
  RootScreensType,
  "CreateEditTodo"
>;

const CreateEditTodo: React.FC<CreateEditTodoPropsType> = ({
  navigation,
  route,
}) => {
  const { addTodo, editTodo } = useTodos();
  const [title, setTitle] = useState(route.params?.title ?? "");
  const [description, setDescription] = useState(
    route.params?.description ?? ""
  );

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
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.topPart}>
              <Text style={TYPOGRAPHY.title}>Add Task</Text>
              <Text style={TYPOGRAPHY.body}>Todo:</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Task's name"
                maxLength={50}
                placeholderTextColor={COLORS.gray}
              />
              <Text style={TYPOGRAPHY.body}>Description:</Text>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                maxLength={200}
                placeholder="What do you want to do?"
                placeholderTextColor={COLORS.gray}
              />
            </View>
            <View style={styles.bottomBtns}>
              <Button
                variant="ghost"
                title="Cancel"
                onPress={navigation.goBack}
              />
              <Button
                title={`${route.params?.id ? "Edit" : "Create"} Todo`}
                onPress={handleSubmit}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateEditTodo;

const styles = StyleSheet.create({
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
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    padding: moderatePixel(12),
  },
  bottomBtns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
