/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView} from "react-native";
import { connect } from "react-redux";
import { ViroARSceneNavigator } from 'react-viro';

import WelcomeScreen from "./screens/WelcomeScreen";
import ChoosePetScreen from "./screens/ChoosePetScreen"
import { DebugButtonsFrameworkComponent } from "./AR/DebugButtonsFramework";
import { ActionListComp } from "./AR/res/Components"

var InitialARScene = require('./AR/HelloWorldSceneAR');

class Mishu extends Component {
  constructor() {
    super();
    this.state = {}
  }
  
  render() {
    const {show, chosen} = this.props
    if (show){
      if (chosen){
        return (
          <SafeAreaView style={localStyles.outer}>
    
            {/* render the debug menu if any debug buttons exist */}
            <DebugButtonsFrameworkComponent />
            
            <ViroARSceneNavigator
              style={localStyles.arView}
              initialScene={{ scene: InitialARScene }}
            />
    
            <SafeAreaView style={localStyles.actionList}>
              <ActionListComp />
            </SafeAreaView>
          </SafeAreaView>
        )
      }  
      else return <ChoosePetScreen />
    }
    else return <WelcomeScreen />
  }
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
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    backgroundColor: '#000000aa'
  },
});
