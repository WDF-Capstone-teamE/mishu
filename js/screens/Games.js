import React, {useState} from 'react'
import { StyleSheet, Text, View,SafeAreaView,StatusBar, TouchableOpacity,Platform } from 'react-native'
import { connect } from "react-redux";

import RPS from '../minigames/RPS'
import FeedingGame from "../minigames/FeedingGame/FeedingGame"
import CleaningGame from "../minigames/CleaningGame/CleaningGame";

import {setHappiness, getHealth} from '../store/progressBars'

import colors from '../config/colors'

const Games = (props) => {
  const [currentGame,setCurrentGame] = useState(0)
  const {getHealthBar, setHappiness} = props

  const AppButton = () => (
    <TouchableOpacity
      style={{ ...styles.buttonWrapper, bottom: 18, right: 5 }}
      onPress={() => setCurrentGame(0)}
    >
      <Text style={{ fontSize: 55, color: colors.last }}>{"X"}</Text>
      <Text style={styles.navButton}>GAMES</Text>
    </TouchableOpacity>
  );

  const rpsCloseFunction = () => {
    setHappiness("increase", 15);
    getHealthBar();
    return setCurrentGame(0);
  }

  if (currentGame === 1) {
    return (
      <View style={{ flex: 1 }}>
        <RPS />
        <TouchableOpacity
          style={{ ...styles.buttonWrapper, bottom: 18, right: 5 }}
          onPress={() => rpsCloseFunction()}
        >
          <Text style={{ fontSize: 55, color: colors.last }}>{"X"}</Text>
          <Text style={styles.navButton}>GAMES</Text>
        </TouchableOpacity>
      </View>
    );
  }
  else if (currentGame === 2) {
    return (
      <View style={{ flex: 1 }}>
        <CleaningGame />
        <AppButton />
      </View>
    );
    
  }
  else if (currentGame === 3) {
    return (
      <View style={{ flex: 1 }}>
        <FeedingGame />
        <AppButton />
      </View>
    ); 
    
  } else {
  return (
    <SafeAreaView>
      <View style={{ alignItems: "center" }}>
        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 35 }]}>
            Games
          </Text>
        </View>
        <TouchableOpacity onPress={() => setCurrentGame(1)}>
          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "300", fontSize: 25 }]}>
              Rock Paper Scissors
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCurrentGame(2)}>
          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "300", fontSize: 25 }]}>
              Cleaning Game
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCurrentGame(3)}>
          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "300", fontSize: 25 }]}>
              Feeding Game
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
  }
}


const mapDispatch = (dispatch) => {
  return {
    setHappiness: (action, score) => dispatch(setHappiness(action, score)),
    getHealthBar: () => dispatch(getHealth()),
  };
};

export default connect(null, mapDispatch)(Games);


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
  buttonWrapper: {
    backgroundColor: "transparent",
    position: "absolute",
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  navButton: {
    color: colors.last,
    fontSize: 10,
    fontWeight: "bold",
  },
});

