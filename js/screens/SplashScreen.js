import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Text,
    Platform,
    ImageBackground
} from "react-native";
import colors from "../config/colors";

export default class SplashScreen extends Component {
    render() {
      return (
        <ImageBackground
        style={styles.background}
        source={require("../Assets/viro_splash_intro_dark.jpg")}>
        </ImageBackground>
      );
    }
}

const styles = StyleSheet.create({

    viewStyles: {
        backgroundColor: 'orange'
    },
    textStyles: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold'
    },
    background: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        justifyContent: "flex-end",
        alignItems: "center",
      },
  });