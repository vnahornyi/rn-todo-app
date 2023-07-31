import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";

import { RootScreensType } from "../App";

type PropsType = NativeStackScreenProps<RootScreensType, "Welcome">;

const WelcomeScreen: React.FC<PropsType> = ({ navigation }) => {
  const navigateToCreate = () => {
    navigation.push("Create", { isFirstOpen: true });
  };

  return (
    <View style={styles.container}>
      <Text>First Screen</Text>
      <Button title="Next Page" onPress={navigateToCreate} />
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

export default WelcomeScreen;
