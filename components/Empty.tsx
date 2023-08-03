import { StyleSheet, Text, View } from "react-native";

import { moderatePixel, pixelSizeVertical } from "../utils/normalize";
import TYPOGRAPHY from "../constants/typography";

import EmptyImage from "../assets/images/tabs/empty.svg";

type EmptyPropsType = {
  children: React.ReactNode;
  isEmpty: boolean;
};

const Empty: React.FC<EmptyPropsType> = ({ children, isEmpty }) => {
  if (!isEmpty) return children;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <EmptyImage width={moderatePixel(227)} height={moderatePixel(227)} />
        <Text style={TYPOGRAPHY.bigBody}>What do you want to do today?</Text>
        <Text style={TYPOGRAPHY.body}>Tap + to add your tasks</Text>
      </View>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    gap: pixelSizeVertical(10),
    alignItems: "center",
  },
});
