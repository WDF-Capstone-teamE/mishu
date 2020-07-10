import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Platform,
  StatusBar,
  View,
  Text,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";

import colors from "../config/colors";
import AboutModal from "./About";

const AppButton = ({ onPress, title, backgroundColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      elevation: 8,
      backgroundColor: backgroundColor,
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: "100%",
      height: 70,
    }}
  >
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);
// const AboutModal = ({ onPress, modalVisible }) => (
//   <View style={styles.centeredView}>
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={modalVisible}
//       onRequestClose={() => {
//         Alert.alert("Modal has been closed.");
//       }}
//     >
//       <View style={styles.centeredView}>
//         <View style={styles.modalView}>
//           <Text style={styles.modalText}>
//             A cross-platform augmented-reality virtual pet app.
//           </Text>
//           <TouchableOpacity
//             onPress={onPress}
//             style={{
//               elevation: 8,
//               backgroundColor: colors.third,
//               paddingVertical: 10,
//               paddingHorizontal: 12,
//               width: "100%",
//               height: 70,
//             }}
//           >
//             <Text style={styles.appButtonText}>Close Modal</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   </View>
// );

const WelcomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ImageBackground
      style={styles.background}
      source={require("../Assets/welcomeImage.jpg")}
    >
      <AboutModal
        modalVisible={modalVisible}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      />
      <Image style={styles.logo} source={require("../Assets/icon2.jpeg")} />
      <View style={{ flexDirection: "row" }}>
        <AppButton
          title="Next"
          backgroundColor={colors.secondary}
          nPress={() =>
            Alert.alert("Next Page", "Goes to the next page", [
              { text: "Next" },
            ])
          }
        />
        <AppButton
          title="About"
          backgroundColor={colors.third}
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;
const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: "100%",
    height: 70,
  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    top: 10,
  },
  background: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  logo: {
    width: 150,
    height: 150,
    position: "absolute",
    top: 70,
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
