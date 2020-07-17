import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import * as Progress from "react-native-progress";

import { getHealth, setHappiness,setHunger,setCleanliness } from "../store/progressBars";

const Profile = (props) => {
  const { progressBar } = props
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={require("../Assets/icecream.jpg")}
              style={styles.image}
              resizeMode="center"
            ></Image>
          </View>
          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
              Mishu
            </Text>
            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
              Virtual Pet
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text
              style={[
                styles.text,
                { fontWeight: "300", fontSize: 20, marginBottom: 10 },
              ]}
            >
              Health
            </Text>
            <Progress.Bar
              progress={progressBar.healthBar * 0.01}
              width={350}
              height={18}
              color="green"
            />
          </View>
          <View style={styles.infoContainer}>
            <Text
              style={[
                styles.text,
                { fontWeight: "300", fontSize: 20, marginBottom: 10 },
              ]}
            >
              Happiness
            </Text>
            <Progress.Bar
              progress={progressBar.happinessBar * 0.01}
              width={350}
              height={18}
              color="orange"
            />
          </View>

          <View style={styles.infoContainer}>
            <Text
              style={[
                styles.text,
                { fontWeight: "300", fontSize: 20, marginBottom: 10 },
              ]}
            >
              Hunger
            </Text>
            <Progress.Bar
              progress={progressBar.hungerBar * 0.01}
              width={350}
              height={18}
              color="red"
            />
          </View>

          <View style={styles.infoContainer}>
            <Text
              style={[
                styles.text,
                { fontWeight: "300", fontSize: 20, marginBottom: 10 },
              ]}
            >
              Cleanliness
            </Text>
            <Progress.Bar
              progress={progressBar.cleanlinessBar * 0.01}
              width={350}
              height={18}
              color="blue"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const mapState = (state) => {
  return {
    progressBar: state.progressBars
  };
};
const mapDispatch = (dispatch) => {
  return {
    getHealth: () => dispatch(getHealth()),
    setHappiness: (option, amount) => dispatch(setHappiness((option, amount))),
    setHunger: (option, amount) => dispatch(setHunger(option, amount)),
    setCleanliness: (option, amount) => dispatch(setCleanliness(option, amount)),
  };
};

export default connect(mapState, mapDispatch)(Profile);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    borderRadius: 100,
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

