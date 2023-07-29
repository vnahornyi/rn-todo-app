import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import RNModal from "react-native-modal";

import { RootScreensType } from "../App";

type PropsType = BottomTabScreenProps<RootScreensType, "Todos">;

const TodosScreen: React.FC<PropsType> = ({ navigation }) => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [isOpenNativeModal, setOpenNativeModal] = useState<boolean>(false);

  const handleOpenTodo = () => {
    navigation.navigate("Todo");
  };

  const handleOpenTransparentTodo = () => {
    navigation.navigate("TransparentTodo");
  };

  return (
    <View>
      <Text>Todos</Text>
      <Button
        title="Open React Native Modal"
        onPress={setVisible.bind(null, true)}
      />
      <Button
        title="Open react-native-modal modal"
        onPress={setVisible.bind(null, true)}
      />
      <Button title="Open Modal" onPress={handleOpenTodo} />
      <Button
        title="Open Transparent Modal"
        onPress={handleOpenTransparentTodo}
      />
      <Modal
        visible={isOpenNativeModal}
        onRequestClose={setOpenNativeModal.bind(null, false)}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modal}>
          <Text>React Native Modal</Text>
          <Button
            title="Close"
            onPress={setOpenNativeModal.bind(null, false)}
          />
        </View>
      </Modal>
      <RNModal
        isVisible={isVisible}
        onSwipeComplete={setVisible.bind(null, false)}
        swipeDirection="down"
      >
        <View style={styles.modal}>
          <Text>react-native-modal</Text>
          <Button title="Close" onPress={setVisible.bind(null, false)} />
        </View>
      </RNModal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#FFFFFF",
  },
});

export default TodosScreen;
