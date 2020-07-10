import React, { useState } from "react";
import { connect } from "react-redux";
import {
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Platform,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import colors from "../config/colors";
import AboutModal from "./About";
import {selectPet} from '../store/petSelection'

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


const WelcomeScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { showArScreen } = props
  return (
    <SafeAreaView style={styles.backgroundSafeArea} >
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
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../Assets/icon2.jpeg")} />
          <Image
            style={styles.logoText}
            source={require("../Assets/mishu.png")}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <AppButton
            title="Next"
            backgroundColor={colors.secondary}
            onPress={() => showArScreen({show:true})}
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
    </SafeAreaView>
    // <ImageBackground
    //     style={styles.background}
    //     source={require("../Assets/welcomeImage.jpg")}
    //   >
    //     <AboutModal
    //       modalVisible={modalVisible}
    //       onPress={() => {
    //         setModalVisible(!modalVisible);
    //       }}
    //     />
    //     <View style={styles.logoContainer}>
    //       <Image style={styles.logo} source={require("../Assets/icon2.jpeg")} />
    //       <Image
    //         style={styles.logoText}
    //         source={require("../Assets/mishu.png")}
    //       />
    //     </View>
    //     <View style={{ flexDirection: "row" }}>
    //       <AppButton
    //         title="Next"
    //         backgroundColor={colors.secondary}
    //         nPress={() =>
    //           Alert.alert("Next Page", "Goes to the next page", [
    //             { text: "Next" },
    //           ])
    //         }
    //       />
    //       <AppButton
    //         title="About"
    //         backgroundColor={colors.third}
    //         onPress={() => {
    //           setModalVisible(true);
    //         }}
    //       />
    //     </View>
    //   </ImageBackground>
  );
};

const mapState = (state) => {
  // console.log(state.pet);
  return {
    selectedPet: state.pet.selectedPet,
  };
};
const mapDispatch = dispatch => {
 return {
   showArScreen: (pet) => dispatch(selectPet(pet)),
 };
}

export default connect(mapState,mapDispatch)(WelcomeScreen);
// export default WelcomeScreen;

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
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  backgroundSafeArea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // justifyContent: "flex-end",
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
    width: 100,
    height: 100,
  },
});
