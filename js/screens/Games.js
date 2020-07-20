import React, {useState} from 'react'
import { StyleSheet, Text, View,SafeAreaView,StatusBar, TouchableOpacity,Platform } from 'react-native'

import RPS from '../minigames/RPS'
import FeedingGame from "../minigames/FeedingGame/FeedingGame"
import CleaningGame from "../minigames/CleaningGame/CleaningGame";

const Games = () => {
  const [currentGame,setCurrentGame] = useState(0)
  if (currentGame === 1) return <RPS />
  else if (currentGame === 2) return <CleaningGame />
  else if (currentGame === 3) return <FeedingGame />;
  else {
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

export default Games


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

