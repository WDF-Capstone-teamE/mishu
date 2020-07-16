/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component,useState ,useRef} from "react";
import { StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, Animated} from "react-native";
import { connect } from "react-redux";
import { ViroARSceneNavigator } from 'react-viro';
import { Container, Header, Button } from "native-base";
import Swiper from "react-native-swiper";

import SplashScreen from "./screens/SplashScreen.js"
import WelcomeScreen from "./screens/WelcomeScreen";
import ChoosePetScreen from "./screens/ChoosePetScreen"
import { DebugButtonsFrameworkComponent } from "./AR/DebugButtonsFramework";
import { ActionListComp } from "./AR/res/Components"
import colors from "./config/colors";

var InitialARScene = require('./AR/HelloWorldSceneAR');

class Mishu extends Component {
  constructor() {
    super();
    this.state = { isLoading: true }
  }

  async componentDidMount() {
    const data = await this.loadContent();
  
    if (data !== null) {
      this.setState({ isLoading: false });
    }
  }
  
  render() {
    const {show, chosen} = this.props

    if (this.state.isLoading) return (<SplashScreen />);

    if (show){
      if (chosen){
        return (
          // <SafeAreaView style={localStyles.outer}>
    
          //   {/* render the debug menu if any debug buttons exist */}
          //   <DebugButtonsFrameworkComponent />
            
          //   <ViroARSceneNavigator
          //     style={localStyles.arView}
          //     initialScene={{ scene: InitialARScene }}
          //   />
    
          //   <SafeAreaView style={localStyles.actionList}>
          //     <ActionListComp />
          //   </SafeAreaView>
          // </SafeAreaView>
          <Swipper />
        )
      }  
      else return <ChoosePetScreen />
    }
    else return <WelcomeScreen />
  }
  // for splash screen, create artificial load time of 2 seconds 
  loadContent = async() => {
    return new Promise((resolve) =>
      setTimeout(() => { resolve('result') }, 3000)
    );
  }
}
const Swipper = () => {
  const [actionList, setActionList] = useState(false)
  const swiperRef = useRef(null);
  const next = () => {
    if (!!swiperRef) {
      swiperRef.current.scrollBy(1);
    }
  };
  const prev = () => {
    if (!!swiperRef) {
      swiperRef.current.scrollBy(-1);
    }
  };
  return (
    <Container>
      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination={true}
        index={1}
        showsButtons={false}
      >
        <View
          style={{
            ...localStyles.slideDefault,
            backgroundColor: colors.secondary,
          }}
        >
          <Text style={localStyles.text}>Pet Profile</Text>
          <TouchableOpacity
            style={{ ...localStyles.buttonWrapper, bottom: 18, right: 5 }}
            onPress={next}
          >
            <Text style={{ fontSize: 55, color: colors.last }}>{">"}</Text>
            <Text style={localStyles.navButton}>GAMES</Text>
          </TouchableOpacity>
        </View>

        <View style={localStyles.arView}>
          <DebugButtonsFrameworkComponent/>
          <ViroARSceneNavigator
            style={localStyles.arView}
            initialScene={{ scene: InitialARScene }}
          />
          <TouchableOpacity
            style={{ ...localStyles.buttonWrapper, bottom: 18, left: 5 }}
            onPress={prev}
          >
            <Text style={{ fontSize: 55, color: colors.last }}>{"<"}</Text>
            <Text style={localStyles.navButton}>PROFILE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...localStyles.buttonWrapper, bottom: 25, right: "44%" }}
            onPress={() => setActionList(!actionList)}
          >
            <Text style={{ fontSize: 70, color: colors.last }}>{"^"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...localStyles.buttonWrapper, bottom: 18, right: 5 }}
            onPress={next}
          >
            <Text style={{ fontSize: 55, color: colors.last }}>{">"}</Text>
            <Text style={localStyles.navButton}>GAMES</Text>
          </TouchableOpacity>
          {actionList && (
            <SafeAreaView style={localStyles.actionList}>
              <ActionListComp />
            </SafeAreaView>
          )}
        </View>

        <View style={localStyles.slideDefault}>
          <Text style={localStyles.text}>Games</Text>
        </View>
      </Swiper>
    </Container>
  );
}



const mapState = state => {
  console.log(state.pet)
  return {
    show: state.pet.show,
    chosen: state.pet.chosen
  }
}

export default connect(mapState)(Mishu)

var localStyles = StyleSheet.create({
  outer: {
    flex: 1,
  },

  arView: {
    flex: 1,
  },

  actionList: {
    flex: 1,
    height: 50,
    width: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 110,
    backgroundColor: "#000000aa",
  },
  button: {
    height: 70,
    width: 70,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
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
