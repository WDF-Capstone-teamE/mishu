import React, {useState} from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from "react-native";

import colors from "../config/colors";
import {chosePet} from '../store/petSelection'
import { getPet } from "../store/petAnimation";

const AppButton = ({ onPress, text, backgroundColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      elevation: 8,
      backgroundColor: backgroundColor,
      borderRadius: 40,
      width: "50%",
      height: 60,
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
    }}
  >
    <Text style={styles.appButtonText}>{text}</Text>
  </TouchableOpacity>
);


const ChoosePetScreen = (props) => {
  const [model, setModel] = useState(0)
  const { chosePet } = props;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 25 }]}>
            SELECTED MODEL
          </Text>
          <Text style={[styles.text, { fontWeight: "400", fontSize: 30 }]}>
            {model ? "Turkey" : "IceCream"}
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => setModel(0)}>
            <View style={styles.profileImage}>
              <Image
                source={require("../Assets/icecream.jpg")}
                style={styles.image}
                resizeMode="center"
              ></Image>
            </View>
            <View style={styles.infoContainer}>
              <Text style={[styles.text, { fontWeight: "300", fontSize: 25 }]}>
                IceCream
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => setModel(1)}>
            <View style={styles.profileImage}>
              <Image
                source={require("../Assets/icecream.jpg")}
                style={styles.image}
                resizeMode="center"
              ></Image>
            </View>
            <View style={styles.infoContainer}>
              <Text style={[styles.text, { fontWeight: "300", fontSize: 25 }]}>
                Turkey
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center", margin: 15 }}>
          <AppButton
            text="Continue"
            backgroundColor={colors.secondary}
            onPress={() => {
              getPet(model)
             return chosePet()}
          }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapState = (state) => {
  return {
    model: state.petAnimation.modelNum,
  };
};
const mapDispatch = dispatch => {
 return {
   getPet: (modelNum) => dispatch(getPet(modelNum)),
   chosePet: () => dispatch(chosePet())
 };
}

export default connect(mapState,mapDispatch)(ChoosePetScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575d",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  profileImage: {
    top: 15,
    width: 200,
    height: 200,
    borderRadius: 50,
    overflow: "hidden",
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 32,
  },
});
