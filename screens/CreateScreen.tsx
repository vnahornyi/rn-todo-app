import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";
import { RootScreensType } from "../App";

type PropsType = NativeStackScreenProps<RootScreensType, "Create">;

const CreateScreen: React.FC<PropsType> = ({ navigation, route }) => {
  const handleNext = () => {
    navigation.push("TabRoot");
  };

  return (
    <View style={styles.container}>
      <Text>Create Page</Text>
      {route.params.isFirstOpen && <Button title="Skip" onPress={handleNext} />}
      <Button title="Continue" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreateScreen;
