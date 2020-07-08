import React from 'react'
import {ImageBackground ,StyleSheet, Platform, StatusBar, View, Text, Button, Alert } from 'react-native'

import colors from '../config/colors'

const WelcomeScreen = () => {
    return (
      <ImageBackground
        style={styles.background}
        source={require("../Assets/welcomeImage.jpg")}
      >
        <Button
          title="Next"
          color={colors.primary}
          onPress={() =>
            Alert.alert("Next Page", "Goes to the next page", [
              { text: "Next" },
            ])
          }
        />
        <Button
          title="About"
          color={colors.secondary}
          onPress={() =>
            Alert.alert(
              "About Mishu",
              "A cross-platform augmented-reality virtual pet app.",
              [{ text: "About Mishu" }, { text: "Developers on Mishu" }]
            )
          }
        />
      </ImageBackground>
    );
}

export default WelcomeScreen
const styles = StyleSheet.create({
  aboutButton: {
    width: "100%",
    height: 70,
    backgroundColor: colors.secondary,
  },
  background: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "flex-end"
  },
  nextButton: {
    width: "100%",
    height: 70,
    backgroundColor: colors.primary,
  },
});
