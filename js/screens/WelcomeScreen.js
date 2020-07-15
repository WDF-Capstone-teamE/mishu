import React, { useState } from "react";
import { connect } from "react-redux";
import {
  ImageBackground,
  StyleSheet,
  Platform,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import colors from "../config/colors";
import AboutModal from "./About";
import {showAr} from '../store/petSelection'

const AppButton = ({ onPress, text, backgroundColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      elevation: 8,
      backgroundColor: backgroundColor,
      borderRadius: 40,
      width: "50%",
      height: 60,
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
    }}
  >
    <Text style={styles.appButtonText}>{text}</Text>
  </TouchableOpacity>
);


const WelcomeScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { showArScreen } = props
  return (
    <ImageBackground
      style={styles.background}
      source={require("../Assets/welcomeImage.jpg")}
    >
      <AboutModal
        modalVisible={modalVisible}
        transparent={true}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      />

      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../Assets/icon2.jpeg")} />

        <Image
          style={styles.logoText}
          source={require("../Assets/mishu.png")}
        />

      </View>

      <View style={styles.appButtonContainer}>
        <AppButton
          text="Start"
          backgroundColor={colors.secondary}
          onPress={() => showArScreen()}
        />
        <AppButton
          text="About"
          backgroundColor={colors.third}
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
    </ImageBackground>
  );
};

const mapState = (state) => {
  return {
    selectedPet: state.pet.selectedPet,
  };
};
const mapDispatch = dispatch => {
 return {
   showArScreen: () => dispatch(showAr()),
 };
}

export default connect(mapState,mapDispatch)(WelcomeScreen);

const styles = StyleSheet.create({
  appButtonContainer: {
    flex:1, 
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: 'space-evenly',
  },
  appButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  background: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  backgroundSafeArea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  logoText: {
    top: 15,
    width: 100,
    height: 100,
  },
});
