import { StyleSheet, View, SafeAreaView } from "react-native";

import Button from "../UI/Button";
import Stepper from "./Onboarding/Stepper";

type PropsType = {
  image: JSX.Element;
  step: 1 | 2 | 3;
};

const Onboarding: React.FC<PropsType> = ({ image, step }) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.skip}>
          <Button
            variant="ghost"
            color="secondary"
            title="SKIP"
            onPress={() => {}}
          />
        </View>
        {image}
        <Stepper step={step} />
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  skip: {
    position: "absolute",
    left: 24,
  },
});
