import React from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";

import colors from "../config/colors";

const AboutModal = ({ onPress, modalVisible }) => (
  <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            A cross-platform augmented-reality virtual pet app.
          </Text>
          <Button
            onPress={onPress}
            title="Close Modal"
            color={colors.third}
          />
        </View>
      </View>
    </Modal>
  </View>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default AboutModal;
