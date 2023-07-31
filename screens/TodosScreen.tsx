import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import RNModal from "react-native-modal";

import { RootScreensType } from "../App";
import COLORS from "../constants/colors";

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
        onPress={() => setOpenNativeModal(true)}
      />
      <Button
        title="Open react-native-modal modal"
        onPress={() => setVisible(true)}
      />
      <Button title="Open Modal" onPress={handleOpenTodo} />
      <Button
        title="Open Transparent Modal"
        onPress={handleOpenTransparentTodo}
      />
      <Modal
        visible={isOpenNativeModal}
        onRequestClose={() => setOpenNativeModal(false)}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.nativeModalWrapper}>
          <View style={styles.nativeModal}>
            <Text>React Native Modal</Text>
            <Button title="Close" onPress={() => setOpenNativeModal(false)} />
          </View>
        </View>
      </Modal>
      <RNModal
        isVisible={isVisible}
        onSwipeComplete={() => setVisible(false)}
        swipeDirection="down"
      >
        <View style={styles.modal}>
          <Text>react-native-modal</Text>
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </RNModal>
    </View>
  );
};

const styles = StyleSheet.create({
  nativeModal: {
    backgroundColor: COLORS.modalBackground,
  },
  nativeModalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: COLORS.modalBackground,
  },
});

export default TodosScreen;
