import { StyleSheet, Text, View } from "react-native";

import EmptyImage from "../assets/images/tabs/empty.svg";
import TYPOGRAPHY from "../constants/typography";
import COLORS from "../constants/colors";

type EmptyPropsType = {
  children: React.ReactNode;
  isEmpty: boolean;
};

const Empty: React.FC<EmptyPropsType> = ({ children, isEmpty }) => {
  if (!isEmpty) return children;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <EmptyImage width={227} height={227} />
        <Text style={styles.title}>What do you want to do today?</Text>
        <Text style={styles.subtitle}>Tap + to add your tasks</Text>
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
    gap: 10,
    alignItems: "center",
  },
  title: {
    ...TYPOGRAPHY.bigBody,
    color: COLORS.white,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.white,
  },
});
