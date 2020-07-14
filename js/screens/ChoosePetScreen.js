import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import colors from "../config/colors";
import {selectPet, chosePet} from '../store/petSelection'

const ModelButton = ({ onPress, title }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      elevation: 8,
      backgroundColor: colors.secondary,
      margin: 20,
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

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        elevation: 8,
        backgroundColor: colors.last,
        margin: 20,
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


const ChoosePetScreen = (props) => {
  const { chosePet, selectPet } = props
  return (
    <ImageBackground
    style={styles.background}
    source={require("../Assets/welcomeImage.jpg")}
    >
    <View 
    style={{ flexDirection: "column", alignItems:"center", margin:30 }} 
    backgroundColor={colors.background}>
        <View style={styles.imgContainer}>
            <Image style={styles.img} source={require("../Assets/icon2.jpeg")} />
        </View>
        <View style={{ flexDirection: "row", alignItems:"center"}}>
            <ModelButton
            title="IceCream"
            onPress={() => selectPet()}
            />
        </View> 
        <View style={styles.imgContainer}>
            <Image style={styles.img} source={require("../Assets/icon2.jpeg")} />
        </View>
        <View style={{ flexDirection: "row", alignItems:"center"}}>
            <ModelButton
            title="Turkey"
            onPress={() => selectPet()}
            />
        </View>
        <View style={{ flexDirection: "row"}}>
            <AppButton
            title="Next"
            onPress={() => chosePet()}
            />
        </View>
    </View>
    </ImageBackground>
  );
};

const mapState = (state) => {
  return {
    selectedPet: state.pet.selectedPet,
    chosen: state.pet.chosen
  };
};
const mapDispatch = dispatch => {
 return {
   selectPet: (pet = {}) => dispatch(selectPet(pet)),
   chosePet: () => dispatch(chosePet())
 };
}

export default connect(mapState,mapDispatch)(ChoosePetScreen);

const styles = StyleSheet.create({
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
    img: {
        width: 200,
        height: 200,
        margin: 20
    },
    imgContainer: {
        alignItems: "center",
    }
  });